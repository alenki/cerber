// Imports
import { collection } from "/src/js/contentful.js"

// Navbar animation
let lastScroll = 0;
const defaultOffset = 100;
const header = document.querySelector('.navbar');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', () => {
    if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        //scroll down
        header.classList.add('hide');
    }
    else if(scrollPosition() < lastScroll && containHide()){
        //scroll up
        header.classList.remove('hide');
    }

    lastScroll = scrollPosition();
})


// scroll to collection 
document.querySelector(".hero_button").onclick = function() {
    document.getElementById("collection").scrollIntoView({ behavior: "smooth" });
}

// Onload
window.onload = function() {
    Load();
};
const collectionDOM = document.getElementById('collection_items');
async function Load() {   
    // get collection
    await collection.getCollection().then(collection => {
        let result = '';
        collection.forEach(item => {
            result += `
                <div class="col-4 mb-5">
                    <div class="collection_element">
                        <div class="collection_image">
                            <a href="#">
                                <img src="${item.productImage}" alt="${item.productName}">
                            </a>  
                        </div>
                    </div>
                </div>
            `;
        });
        collectionDOM.innerHTML = result;
    })
}