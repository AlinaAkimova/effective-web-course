const prev   = document.getElementById('slide-prev'),
      next   = document.getElementById('slide-next'),
      slides = document.querySelectorAll('.slide');

let index = 0;

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

prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);

document.addEventListener('keyup', e => {
    if(e.code === 'ArrowRight' || e.code === 'Space')
        nextSlide();
    else if(e.code === 'ArrowLeft')
    prevSlide();
});

    
        