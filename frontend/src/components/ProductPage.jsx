import { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { fetchProductBySlug, updateReview } from '../../sanity/services/productServices'

//Komponent for å hente et bestemt produkt basert på produktets slug i Sanity
//Her setter vi også ting inn i Sanity, mer info: https://webtricks.blog/oppdatere-et-array-felt-i-en-innholdstype-i-sanity-fra-et-react-grensesnitt/
export default function ProductPage() {
    //States for å lagre skjemainformasjon
    const [reviewer, setReviewer] = useState("")
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    const [formMessage, setFormMessage] = useState("")

    //handeChange-funksjoner for felter
    const handleReviewerChange = (e) => {
        e.preventDefault()
        setReviewer(e.target.value)
    }
    const handleCommentChange = (e) => {
        e.preventDefault()
        setComment(e.target.value)
    }
    const handleRatingChange = (e) => {
        e.preventDefault()
        setRating(Number(e.target.value))
    }

    //Funksjon: knapp når bruker bkerefeter innsending av anmeldelse 
    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     if (rating === 0){
    //         // document.getElementById("formessage").innerHTML
    //         setFormMessage("Du må sette en vurdering")
    //     }
    //     else {
    //         const result = await updateReview(product._id, reviewer, comment, rating) //--> rekkefølgen av parametere må være LIK som i updateReview
    //         if(result == "Success") {
    //             setFormMessage("Din anmeldelse er registrert")
    //             product.reviews.push({product_id, reviewer, comment, rating}) // sette inn et produkt i staten 
    //         } 
    //         else {
    //             setFormMessage(result)
    //         }
    //         console.log(result)
    //     }
    //     console.log("Knapp trykket ", result)
    // }
    //handleSubmit-funksjon for når en bruker sender en anmeldelse
    const handleSubmit = async (e) => {
        e.preventDefault()

        //Vi må kontrollere om rating er 0 (standard verdi i state). Er den det, må brukeren fylle inn en vurdering.
        if(rating === 0) {
            setFormMessage("Du må sette en vurdering.")
        } else {
            //Ellers er en vurdering satt, og vi kan kjøre servicen som forsøker å sette vurderingen inn i Sanity
            const result = await updateReview(product._id, reviewer, comment, rating)
            //Hvis Sanity returnerer et suksessfullt resultat av lagringen:
            if(result == "Success") {
                //Sett en melding som skal vises i skjemaet
                setFormMessage("Din anmeldelse er registrert!")
                //Midlertidig oppdater review-arrayen i product-staten mens vi venter på at 
                //sanity er ferdig med å lagre anmeldelsen og kan sende den tilbake til nettapplikasjonen
                product.reviews.push({reviewer: reviewer, comment: comment, rating: rating})
            } else {
                setFormMessage(result)
            }
            console.log(result)
        }
        
    }


    //Hent slug fra URL
    const {slug} = useParams()
    //Sett en state vi kan lagre produktinformasjon i
    const [product, setProduct] = useState(null)
    //Lag en get-funksjon som løser opp Promise gitt fra sanity/services/productServices/fetchProductBySlug
    const getProductBySlug = async (slug) => {
        const data = await fetchProductBySlug(slug)
        setProduct(data[0])
    }
    //Kjør getProductBySlug når componentet mountes, og hver gang slug endres
    useEffect(() => {
        getProductBySlug(slug)
    }, [slug])

    console.log("Product", product)

    //Hvis product-state er satt, skriv ut HTML med produktinformasjon
    if(product) {
        return (
            <main id="productpage">
                <figure>
                    <img src={product?.image} alt={`Produktbilde av LEGO-figuren ${product?.productname}`} />
                </figure>
                <article>
                    <h2>{product?.productname}</h2>
                    <p className="metainfo">
                        <Link to={"/produkter/" + product?.catslug}>{product?.categoryname}</Link>
                        <span className="stockcount">{product?.stock === 0 ? "Tomt" : product?.stock} på lager</span>
                    </p>
                    <p>{product?.description}</p>
                    <p className="priceview">Kr. {product?.price}</p>
                    <h3>Anmeldelser:</h3>
                    <form>
                        <p>
                            <label htmlFor="reviewer">Ditt navn:</label><br />
                            <input name="reviewer" id="reviewer" onChange={handleReviewerChange} type="text" />
                        </p>
                        <p>
                            <label htmlFor='comment'>Kommentar:</label><br />
                            <textarea name="comment" id="comment" onChange={handleCommentChange}></textarea>
                        </p>
                        <p>
                            <label htmlFor="rating">Vurdering:</label><br />
                            <select name="rating" id="rating" required onChange={handleRatingChange}>
                                <option value="">Velg din vurdering</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </p>
                        <p id="formmessage">{formMessage}</p>
                        <p><button onClick={handleSubmit}>Send anmeldelse</button></p>
                    </form>
                    {
                        product?.reviews?.map((r, i) => <p key={i}>
                            <strong>{r.reviewer}</strong><br />
                            {r.comment}<br />
                            Vurdering: {r.rating}
                        </p>)
                    }
                </article>
            </main>
        )
    } 
    //Hvis ikke product-state er satt, skriv ut en melding om at informasjonen lastes inn
    else {
        return (
            <main>
                <p>Laster produktinfo...</p>
            </main>
        )
    }
    
}