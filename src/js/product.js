// Imports
import { collection } from "/src/js/contentful.js"

// Get ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const galleryDOM = document.getElementById('gallery_column');

// get collection
    await collection.getCollection().then(collection => {
        collection.forEach(item => {
            if(item.productName==productId){
                let img_result = '';
                item.productPhotos.forEach(item_img => {
                    img_result += `
                    <div class="image_wrapper">
                        <img src="${item_img.fields.file.url}" alt="${item.productName}">
                    </div>
                    `
                })
                galleryDOM.innerHTML = img_result;
            }
        })
    });

// Size
const size_box_s = document.getElementById('size_box_s');
const size_box_m = document.getElementById('size_box_m');
const size_box_l = document.getElementById('size_box_l');
const size_box_xl = document.getElementById('size_box_xl');
size_box_s.addEventListener("click", () => {
    size_box_s.classList.add("size_box_active");
    size_box_m.classList.remove("size_box_active");
    size_box_l.classList.remove("size_box_active");
    size_box_xl.classList.remove("size_box_active");
    localStorage.setItem("size", "s");
});
size_box_m.addEventListener("click", () => {
    size_box_s.classList.remove("size_box_active");
    size_box_m.classList.add("size_box_active");
    size_box_l.classList.remove("size_box_active");
    size_box_xl.classList.remove("size_box_active");
    localStorage.setItem("size", "m");
});
size_box_l.addEventListener("click", () => {
    size_box_s.classList.remove("size_box_active");
    size_box_m.classList.remove("size_box_active");
    size_box_l.classList.add("size_box_active");
    size_box_xl.classList.remove("size_box_active");
    localStorage.setItem("size", "l");
});
size_box_xl.addEventListener("click", () => {
    size_box_s.classList.remove("size_box_active");
    size_box_m.classList.remove("size_box_active");
    size_box_l.classList.remove("size_box_active");
    size_box_xl.classList.add("size_box_active");
    localStorage.setItem("size", "xl");
});