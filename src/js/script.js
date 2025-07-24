

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

// About
document.querySelector(".about_button").addEventListener('click', () => {
    var modal = new bootstrap.Modal(document.getElementById('aboutModal'), {
        keyboard: false
    })
    modal.toggle()
})
document.querySelector(".footer_about").addEventListener('click', () => {
    var modal = new bootstrap.Modal(document.getElementById('aboutModal'), {
        keyboard: false
    })
    modal.toggle()
})
