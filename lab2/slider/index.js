const prev   = document.getElementById('slide-prev'),
      next   = document.getElementById('slide-next'),
      slides = document.querySelectorAll('.slide');

let index = 0;

//ms
let duration = 0;

const makeTimer = () => {
    clearInterval(duration);
    duration = setInterval(() => {
        nextSlide();
    }, 5000)
}

makeTimer();

const activeSlide = n => {
    for(let slide of slides) {
        slide.classList.remove('active');
    }
    slides[n].classList.add('active');
}

const nextSlide = () => {
    index = (index + 1) % slides.length;
    activeSlide(index);
}

const prevSlide = () => {
    if(index == 0) {
        index = slides.length - 1;
    } else {
        index--;
    }
    activeSlide(index);
}

prev.addEventListener('click', () => {
    makeTimer();
    prevSlide();
});
next.addEventListener('click', () => {
    makeTimer();
    nextSlide();
});

document.addEventListener('keyup', e => {
    makeTimer();
    if(e.code === 'ArrowRight' || e.code === 'Space')
        nextSlide();
    else if(e.code === 'ArrowLeft')
    prevSlide();
});


        