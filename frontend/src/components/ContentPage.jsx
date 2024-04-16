import Title from './Title'
import ProductCard from './ProductCard'
import { useParams } from 'react-router-dom'
import { fetchCategoryBySlug } from '../../sanity/services/categoryServices'
import { useEffect, useState } from 'react'
export default function ContentPage({amount, setAmount, category, setCart, cart}){
  const {slug} = useParams()
  const [catInfo, setCatInfo] = useState(null)

  const getCategoryBySlug = async (slug) => {
    const data = await fetchCategoryBySlug(slug)
    setCatInfo(data[0])
  }

  useEffect(() => {
    getCategoryBySlug(slug)
  }, [slug])

  console.log(catInfo)

    return(
        <main>
          <Title category={catInfo?.categorytitle} />
          {/* catInfo, objektet vi spør på */}
          {/* For hvert produkt, ta vare på index, slik at vi kan lagre data output på key id */}
          {/* for hvert product.id -> skrive ut et productCard og vi sender inn key{index} og productInfo{product} - dette sendes til 
          productcard-komponenten */}
          {catInfo?.catProducts.map((product, index) => 
          <ProductCard key={index} productInfo={product} setAmount={setAmount} setCart={setCart} cart={cart} />)
          }
        </main>
    )
}