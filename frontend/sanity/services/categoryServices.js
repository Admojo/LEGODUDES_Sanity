import { client } from "../client";
//Les mer om GROQ (Sanitys spørrespråk): https://www.sanity.io/docs/how-queries-work

//Funksjon som spør etter alt innhold av typen categories fra Sanity
export async function fetchAllCategories() {
    const data = await client.fetch(`*[_type == "categories"]{
        _id,
        categorytitle,
        "catslug":categoryurl.current}`)
    return data
}

//Funksjon som spør Sanity om å hente alle kategorier som matcher en slug
export async function fetchCategoryBySlug(slug) {
    const data = await client.fetch(`*[_type == "categories" && categoryurl.current == $slug]{
        _id,
        categorytitle,
        "catProducts": *[_type == "products" && references(^._id)]{
            _id,
            productname,
            "slug": producturl.current,
            price,
            stock,
            "catname": category->categorytitle,
            "catslug": category->categoryurl.current,
            "image": productimage.asset->url
        }
    }`, {slug})
    return data
    //  "catProducts": *[_type =="products" && references (^._id)]:
    // Vi spør etter alt innhold, basert på produkt OG, med referanse til ^ id'en som er skrevet på linjen ovenfor 

    // []: filter paranteser
    // {}: felter vi ønsker å hente fra spørringen 
}

// *[i_type =="products" && category._ref == _id]


// Utfordring: hvordan finne ut hvilke verdier som skal kobles sammen?
