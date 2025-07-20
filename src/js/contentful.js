// Contentful
import * as contentful from 'contentful'
const client = contentful.createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE,
    environment: 'master', // defaults to 'master' if not set
    accessToken: import.meta.env.VITE_CONTENTFUL_TOKEN
})

// getting the collection
class Collection{
    async getCollection(){
        try{
            let collection_data = await client.getEntries({
                content_type: "cerberProduct"
            });
            let collection = collection_data.items;
            collection = collection.map(item =>{
                const {productName, productDetails, productPrice} = item.fields;
                var productImage;
                try{productImage = item.fields.productImage.fields.file.url;}
                catch(e){console.log("У", productName, "нет основной фотки")}
                var productPhotos;
                try{productPhotos = item.fields.productPhotos;}
                catch(e){console.log("У", productName, "нет фоток")}
                return {productName, productImage, productPhotos, productDetails, productPrice}
            })
            return collection
        } catch(error) {
            console.log(error);
        }
    }
}

export const collection = new Collection();