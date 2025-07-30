// Imports
import { collection } from "/src/js/contentful.js"
const scriptURL = 'https://script.google.com/macros/s/AKfycbyLzmg1UewZquu_DkDBqf-n7rn8nVj5NDpmdv5ZZ6Wh_cPeDs-yKPUtsrTi2KG4wrw6xg/exec'

// Onload
window.onload = function() {
    localStorage.setItem("size", "L");
};

// Get ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const galleryDOM = document.getElementById('gallery_column');
const mobile_galleryDOM = document.getElementById('mobile_gallery_column');
const product_title = document.querySelector('.product_title');
const product_details = document.querySelector('.product_details');
const product_price = document.querySelector('.product_price');

// get collection
    await collection.getCollection().then(collection => {
        collection.forEach(item => {
            if(item.productName==productId){
                // Initially set clothing in the form
                document.getElementById("clothing").value = item.productName;
                document.getElementById("price").value = item.productPrice;
                document.getElementById("mobile_clothing").value = item.productName;
                document.getElementById("mobile_price").value = item.productPrice;
                // Info
                product_title.innerHTML = item.productName;
                product_details.innerHTML = item.productDetails;
                product_price.innerHTML = item.productPrice + "р";
                // Images
                let img_result = '';
                item.productPhotos.forEach(item_img => {
                    img_result += `
                    <div class="image_wrapper">
                        <img src="${item_img.fields.file.url}" alt="${item.productName}">
                    </div>
                    `
                })
                galleryDOM.innerHTML = img_result;
                mobile_galleryDOM.innerHTML = img_result;
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
    localStorage.setItem("size", "S");
});
size_box_m.addEventListener("click", () => {
    size_box_s.classList.remove("size_box_active");
    size_box_m.classList.add("size_box_active");
    size_box_l.classList.remove("size_box_active");
    size_box_xl.classList.remove("size_box_active");
    localStorage.setItem("size", "M");
});
size_box_l.addEventListener("click", () => {
    size_box_s.classList.remove("size_box_active");
    size_box_m.classList.remove("size_box_active");
    size_box_l.classList.add("size_box_active");
    size_box_xl.classList.remove("size_box_active");
    localStorage.setItem("size", "L");
});
size_box_xl.addEventListener("click", () => {
    size_box_s.classList.remove("size_box_active");
    size_box_m.classList.remove("size_box_active");
    size_box_l.classList.remove("size_box_active");
    size_box_xl.classList.add("size_box_active");
    localStorage.setItem("size", "XL");
});

// Form
const form = document.querySelector("#form")
const submitButton = document.querySelector("#submit")
const requiredFields = document.querySelectorAll(".reqField")

// Проверка при любом инпуте
form.addEventListener('input', function() {
    // Проверка заполнения полей
    const allFilled = Array.from(requiredFields).every(field => field.value.trim() !== '');
    if (allFilled) {
        submitButton.classList.remove('disabled');
        submitButton.setAttribute("aria-disabled", "false");
        submitButton.setAttribute("tabindex", "0");
    } else {
        submitButton.classList.add('disabled');
        submitButton.setAttribute("aria-disabled", "true");
        submitButton.setAttribute("tabindex", "-1");
    }
});

// Обработка подтверждения регистрации
submitButton.onclick = function(e) {
    document.getElementById("size").value = localStorage.getItem("size");
    const formData = new FormData(form);
    submitForm(formData);

    // submit to google sheets
    function submitForm(formData) {
        submitButton.classList.add('disabled');
        submitButton.setAttribute("aria-disabled", "true");
        submitButton.setAttribute("tabindex", "-1");
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors'})
        .then(response => {
            form.innerHTML = "<span style=\"font-size: 1.5rem;\" class=\"col-form-label\">Заявка успешно отправлена, с вами скоро свяжутся!</span>";
            form.classList.add("successfull_form");
            submitButton.classList.add("d-none");
        })
        .catch(error => {
            alert('Ошибка! Обратитесь к +7 (928) 691-26-02.', error.message)
            submitButton.classList.remove('disabled');
            submitButton.setAttribute("aria-disabled", "false");
            submitButton.setAttribute("tabindex", "0");
        })
    }
}



// --------------- MOBILE ----------------

// Mobile Size
const mobile_size_box_s = document.getElementById('mobile_size_box_s');
const mobile_size_box_m = document.getElementById('mobile_size_box_m');
const mobile_size_box_l = document.getElementById('mobile_size_box_l');
const mobile_size_box_xl = document.getElementById('mobile_size_box_xl');
mobile_size_box_s.addEventListener("click", () => {
    mobile_size_box_s.classList.add("mobile_size_box_active");
    mobile_size_box_m.classList.remove("mobile_size_box_active");
    mobile_size_box_l.classList.remove("mobile_size_box_active");
    mobile_size_box_xl.classList.remove("mobile_size_box_active");
    localStorage.setItem("size", "S");
});
mobile_size_box_m.addEventListener("click", () => {
    mobile_size_box_s.classList.remove("mobile_size_box_active");
    mobile_size_box_m.classList.add("mobile_size_box_active");
    mobile_size_box_l.classList.remove("mobile_size_box_active");
    mobile_size_box_xl.classList.remove("mobile_size_box_active");
    localStorage.setItem("size", "M");
});
mobile_size_box_l.addEventListener("click", () => {
    mobile_size_box_s.classList.remove("mobile_size_box_active");
    mobile_size_box_m.classList.remove("mobile_size_box_active");
    mobile_size_box_l.classList.add("mobile_size_box_active");
    mobile_size_box_xl.classList.remove("mobile_size_box_active");
    localStorage.setItem("size", "L");
});
mobile_size_box_xl.addEventListener("click", () => {
    mobile_size_box_s.classList.remove("mobile_size_box_active");
    mobile_size_box_m.classList.remove("mobile_size_box_active");
    mobile_size_box_l.classList.remove("mobile_size_box_active");
    mobile_size_box_xl.classList.add("mobile_size_box_active");
    localStorage.setItem("size", "XL");
});

// Form
const mobile_form = document.querySelector("#mobile_form")
const mobile_submitButton = document.querySelector("#mobile_submit")
const mobile_requiredFields = document.querySelectorAll(".mobile_reqField")

// Проверка при любом инпуте
mobile_form.addEventListener('input', function() {
    // Проверка заполнения полей
    const mobile_allFilled = Array.from(mobile_requiredFields).every(field => field.value.trim() !== '');
    if (mobile_allFilled) {
        mobile_submitButton.classList.remove('disabled');
        mobile_submitButton.setAttribute("aria-disabled", "false");
        mobile_submitButton.setAttribute("tabindex", "0");
    } else {
        mobile_submitButton.classList.add('disabled');
        mobile_submitButton.setAttribute("aria-disabled", "true");
        mobile_submitButton.setAttribute("tabindex", "-1");
    }
});

// Обработка подтверждения регистрации
mobile_submitButton.onclick = function(e) {
    document.getElementById("mobile_size").value = localStorage.getItem("size");
    const mobile_formData = new FormData(mobile_form);
    mobile_submitForm(mobile_formData);

    // submit to google sheets
    function mobile_submitForm(mobile_formData) {
        mobile_submitButton.classList.add('disabled');
        mobile_submitButton.setAttribute("aria-disabled", "true");
        mobile_submitButton.setAttribute("tabindex", "-1");
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: mobile_formData, mode: 'no-cors'})
        .then(response => {
            mobile_form.innerHTML = "<span style=\"font-size: 1.5rem;\" class=\"col-form-label\">Заявка успешно отправлена, с вами скоро свяжутся!</span>";
            mobile_form.classList.add("successfull_form");
            mobile_submitButton.classList.add("d-none");
        })
        .catch(error => {
            alert('Ошибка! Обратитесь к +7 (928) 691-26-02.', error.message)
            mobile_submitButton.classList.remove('disabled');
            mobile_submitButton.setAttribute("aria-disabled", "false");
            mobile_submitButton.setAttribute("tabindex", "0");
        })
    }
}