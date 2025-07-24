// Imports
import { collection } from "/src/js/contentful.js"

// music
const music_button = document.querySelector('.music_icon');
const music_on = document.querySelector('.music_on');
const music_off = document.querySelector('.music_off');
const music = document.getElementById("music")

// Music volume
music.volume = 0.1; 

// Music button
music_button.onclick = function() {
    if(music.muted==true) {
        music_on.style.display = "block";
        music_off.style.display = "none";
        music.muted = false;
    }
    else {
        music_on.style.display = "none";
        music_off.style.display = "block";
        music.muted = true;
    }
}

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
                <div class="col-4 mb-5 mt-5">
                    <div class="collection_element">
                        <div class="collection_image pb-3">
                            <a href="../../product/?id=${item.productName}">
                                <img src="${item.productImage}" alt="${item.productName}">
                            </a>  
                        </div>
                        <div>
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