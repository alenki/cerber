// Imports
import { collection } from "/src/js/contentful.js"

// Logo to nav
const nav_logo = document.querySelector(".nav_logo");
const navbar = document.querySelector(".navbar");
const arrow_up = document.querySelector(".arrow_up");
const hero_nav_contacts_button = document.querySelector('.hero_nav_contacts_button');
const hero_nav_about_button = document.querySelector('.hero_nav_about_button');
window.addEventListener('scroll', () => {
    if(window.scrollY >= window.innerHeight/2) {
        nav_logo.style.display = "flex";
        arrow_up.style.display = "block"
        navbar.style.backgroundColor = "rgba(235,252,255,0.85)";
        hero_nav_contacts_button.classList.remove('nav_link_padding');
        hero_nav_about_button.classList.remove('nav_link_padding');
    } else {
        nav_logo.style.display = "none";
        arrow_up.style.display = "none"
        navbar.style.backgroundColor = "rgba(217, 217, 217, 0)";
        hero_nav_contacts_button.classList.add('nav_link_padding');
        hero_nav_about_button.classList.add('nav_link_padding');
    }
    
});

// scroll to collection 
// document.querySelector(".hero_button").onclick = function() {
//     document.getElementById("collection").scrollIntoView({ behavior: "smooth" });
// }

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
                <div class="col-md-4 col-6 custom-item-columns mb-5 mt-5 d-flex justify-content-center align-items-center">
                    <div class="collection_element">
                        <div class="collection_image pb-3">
                            <a href="../../product/?id=${item.productName}">
                                <img src="${item.productImage}" alt="${item.productName}">
                            </a>  
                        </div>
                        <div class="collection_element_text_holder">
                            <span class="collection_element_text">${item.productName}</span><br>
                            <span class="collection_element_text">${item.productPrice}р</span>
                        </div>
                    </div>
                </div>
            `;
        });
        collectionDOM.innerHTML = result;
    })
}