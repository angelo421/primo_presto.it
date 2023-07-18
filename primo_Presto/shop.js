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


//collegamento file.json
fetch('./shop.json')
.then((response) => response.json())
.then((data) => {

    
    let cardsWrapper = document.querySelector('#cardsWrapper');
    let categoriesWrapper = document.querySelector('#categoriesWrapper');
    // funzione creazione cards 
    function createCards(array) {
        cardsWrapper.innerHTML='';
        array.forEach((card) =>{
            let div = document.createElement('div');
            div.classList.add('col-12', 'col-md-6' , 'my-3');
            div.innerHTML = ` 
                <div class="card" style="width: 18rem;">
                                
                    <img src="${card.url}" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <h6 class="card-title text-truncate" title="${card.name}">${card.name}</h6>
                        <h6 class="card-title">${card.category}</h6>
                        <p>€<span>${card.price}</span></p>
                        <div>
                            <button type="button" class="btn bg-button button-size-shop"><i class="fa-solid fa-cart-shopping fa-lg me-2" style="color: #ffffff;"></i >Aggiungi al carrello</button>
                        </div>
                            <i class="fa-regular fa-heart fa-lg mt-4" style="color: #ff0000;"></i>
                    </div>
                </div>`
            cardsWrapper.appendChild(div)


        })
   }
    createCards(data);

    // funzione per verificare le categorie non ripetute
    function filterCategories() {

        let categories = data.map((element) => element.category);
        let categoriesNotRepeated = [];

        categories.forEach((category) => {
            if(!categoriesNotRepeated.includes(category)){
                categoriesNotRepeated.push(category)
            }
        })

        //creazione input per ogni categoria
        categoriesNotRepeated.forEach((category) =>{
            let div = document.createElement('div');
            div.classList.add('form-check')
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
                <label class="form-check-label" for="${category}">
                    ${category}
                </label>
            `

            categoriesWrapper.appendChild(div)
        })
       
    }

    filterCategories()


    let formCheckInput = document.querySelectorAll('.form-check-input');

    // funzione mostra per categoria
    function showForCategories(array) {
        let arrayCategories = Array.from(formCheckInput);
        let checkedInput = arrayCategories.find((element) => element.checked);
        let filtered = array.filter((element) => element.category == checkedInput.id);

        if(checkedInput.id != 'All'){
            return filtered
           /*  createCards(filtered); */
        } else {
            return data
            /* createCards(data); */
        }

    }


    //evento filtro per categoria
    formCheckInput.forEach((input) => {
        input.addEventListener('click', () => {
            /* showForCategories(); */
            globalFilter()

        })
    })

    //funzione filtra per prezzo

    let inputPrice = document.querySelector('#inputPrice');
    let formLabel = document.querySelector('.form-label');

    //funzione per trovare numero massimo
    function numMax() {
        let prices = data.map((element) => +element.price)
        let maxPrice = Math.ceil(Math.max(...prices))
        let minPrice = Math.min(...prices)

        inputPrice.max = maxPrice
        inputPrice.min = minPrice
        inputPrice.value = maxPrice
    
    }

    numMax()


    function showForPrice(array) {
        let filtered = array.filter((element) => +element.price <= +inputPrice.value).sort((a,b) => a.price - b.price)
       
        return filtered
        /* createCards(filtered) */
    }

    showForPrice(data)

    //evento filtro per prezzo
    inputPrice.addEventListener('input', () =>{
        formLabel.innerHTML = '€' + inputPrice.value
        globalFilter()
        /* showForPrice() */
    })



    //funzione filtra per parola

    let wordInput = document.querySelector('#wordInput');

    function showForWord(array) {
        let inputValue = wordInput.value
        let filtered = array.filter((element) => element.name.toLowerCase().includes(inputValue.toLowerCase()))
        
        return filtered
        /* createCards(filtered) */
    }
    


    //evento filtro per parola 
    wordInput.addEventListener('input', () => {
        globalFilter()
        /* showForWord() */
    })


    //funzione globale
    function globalFilter() {
        let filteredByCategory = showForCategories(data);
        let filteredByPrice = showForPrice(filteredByCategory);
        let filteredByWord = showForWord(filteredByPrice);

        createCards(filteredByWord)
    }

   
    
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

