const slides = document.querySelectorAll(".carouselSlide");

let currentSlide = 0;
let carouselTimer;

function showSlide(index){

    if(!slides.length){
        return;
    }

    slides.forEach((slide,i) => {

        if(i === index){
            slide.classList.add("active");
        }else{
            slide.classList.remove("active");
        }

    });

    currentSlide = index;
}

function nextSlide(){

    let next = currentSlide + 1;

    if(next >= slides.length){
        next = 0;
    }

    showSlide(next);
}

function startCarousel(){

    clearInterval(carouselTimer);

    carouselTimer = setInterval(() => {

        nextSlide();

    },1000);

}

if(slides.length){

    showSlide(0);

    setTimeout(() => {

        startCarousel();

    },1000);

}

const introSection = document.querySelector(".introSection");

if(introSection){

    const introObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                introSection.classList.add("introVisible");

                introObserver.unobserve(introSection);

            }

        });

    },{
        threshold:0.25
    });

    introObserver.observe(introSection);

}

const magneticButtons = document.querySelectorAll(
    ".goldButton, .outlineButton"
);

magneticButtons.forEach(button => {

    button.addEventListener("mousemove",event => {

        const rect = button.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        button.style.transform =
            `translate(${x * 0.08}px, ${y * 0.08}px)`;

    });

    button.addEventListener("mouseleave",() => {

        button.style.transform = "";

    });

});

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",() => {

    if(!navbar){
        return;
    }

    if(window.scrollY > 60){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if(menuToggle && navLinks){

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");

    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");

        });

    });

}
