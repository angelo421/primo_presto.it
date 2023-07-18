
      fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
      .then((response) => response.json())
      .then((data) => {
        
        
        let reviewsWrapper = document.querySelector('.swiper-wrapper')
        data.forEach(review => {
            let div = document.createElement('div')
            div.classList.add('swiper-slide')
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title text-truncate">${review.name}</h5>
              <p class="card-text text-truncate">${review.email}</p>
              <p class="card-text text-truncate">${review.body}</p>
            </div>
          </div>`

          reviewsWrapper.appendChild(div)
        });


        var swiper = new Swiper(".mySwiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            },
            pagination: {
              el: ".swiper-pagination",
            },
          });
        });


      
   
      
   

      




