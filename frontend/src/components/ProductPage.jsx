import { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { fetchProductBySlug } from '../../sanity/services/productServices'

export default function ProductPage() {
// States for å lagre sesjoninformasjon 
    const [review, setReview] = useState("")
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)

    //handleChang for felter 
    const handleReviewChange = (e) => {
        e.prevenDefault()
        setReview(e.target.value)
        console.log(e.target.value)
    }

    const handleCommentChange = (e) => {
        e.prevenDefault()
        setComment(e.target.value)
    }

    const handleRatingChange = (e) => {
        e.prevenDefault()
        setRating(e.target.value)
    }


    const {slug} = useParams()
    const [product, setProduct] = useState(null)

    const getProductBySlug = async (slug) => {
        const data = await fetchProductBySlug(slug)
        setProduct(data[0])
    }

    useEffect(() => {
        getProductBySlug(slug)
    }, [slug])

    console.log("Product", product)

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
                    <h3> Anmeldelser </h3>
                    <form>
                        <p>
                            <label for="reviewer">Ditt navn</label><br/>
                            <input name="reviewer" id="reviewer" onChange={handleReviewChange} type="text" />
                        </p>
                        <p>
                            <label htmlFor="comment">Kommentar: </label><br/>
                            <textarea name="comment" id="comment" onChange={handleCommentChange} ></textarea>
                        </p>
                        <p>
                            <label htmlFor="rating"> Vurdering:</label><br/>
                            <select name="rating" id="rating" onChange={handleRatingChange} >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </p>
                        <button>Send anmeldelse</button>
                    </form>
                </article>
            </main>
        )
    } else {
        return (
            <main>
                <p>Laster produktinfo...</p>
            </main>
        )
    }
    
}