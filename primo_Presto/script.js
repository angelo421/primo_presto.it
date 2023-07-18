// elementi catturati navbar
let navbar = document.querySelector('.navbar')
let navLinks = document.querySelectorAll ('.nav-link')
let iconCustom =document.querySelector ('.icon-custom')


// Evento scroll navbar
window.addEventListener('scroll' , () =>{
    if ( window.scrollY > 0){
        navbar.style.backgroundColor = 'var(--main-green)';
        navLinks.forEach((navlink) => {
            navlink.style.color = 'white'
            iconCustom.style.color = 'white'

        })
    } else {
        navbar.style.backgroundColor = 'white';
        navLinks.forEach((navlink) => {
            navlink.style.color = 'black'
            iconCustom.style.color = 'var(--main-green)';
        })
       
    }
})

fetch('./shop.json')
.then((response) => response.json())
.then((data) => {


//elementi catturati sezione contatori
let since = document.querySelector ('#since')
let reviews = document.querySelector ('#reviews')
let items = document.querySelector ('#items')
let products = document.querySelector ('#products')


// eventi sezione contatori
function createIntervall(number, element) {
    let counter = 0;

    let interval = setInterval(() =>{
        if (counter < number){
            counter++ ;
            element.innerHTML = counter;
        }else {
            clearInterval(interval);
        }
        
    })
}


let confirm = false;

let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && confirm == false) {
            createIntervall(2000, since);
            createIntervall(500, reviews);
            createIntervall(753, products);
            createIntervall(810, items);
            confirm = true;

        }
    })
})

observer.observe(since);



//elementi catturati sezione cards
let cardsWrapper = document.querySelector('.cards-wrapper');




//creazione card
data.forEach((product , index) => {
    if(index >= data.length - 4){
    let div = document.createElement('div');
    div.classList.add('col-12', 'col-md-3', 'my-3', 'mx-auto', 'd-flex', 'flex-column', 'align-items-center');
    div.innerHTML= `
    <div class="card" style="width: 16rem;">
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            New
                <span class="visually-hidden">unread messages</span>
        </span>
        <img src="${product.url}" class="card-img-top" style="height : 286px" alt="...">
        <div class="card-body text-center">
            <h6 class="card-title">${product.name}</h6>
            <h6 class="card-title">${product.category}</h6>
                <p>€<span>${product.price}</span></p>
                <div>
                    <a href="./shop.html"><button type="button" class="btn bg-button button-size-shop"><i class="fa-solid fa-cart-shopping fa-lg me-2" style="color: #ffffff;"></i >SHOP NOW</button></a>
                </div>
                <i class="fa-regular fa-heart fa-lg mt-4" style="color: #ff0000;"></i>
        </div>
    </div>
    `
    cardsWrapper.appendChild(div);
    }
})


//eventi cards
let likes = document.querySelectorAll('.fa-heart');
let imgLikes = document.querySelectorAll('.card-img-top');

//evento click cuore
likes.forEach((like) => {
    like.addEventListener('click', () => {
        like.classList.toggle('fa-solid');
        like.style.color = 'red';
    })
})

//evento click immagine
imgLikes.forEach((img, index) => {
    img.addEventListener('dblclick', () => {
        likes[index].classList.toggle('fa-solid');
        likes[index].style.color = 'red';
    })
})

})



/* inizializzazione animation scroll */

AOS.init();