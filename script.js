const carouselTrack = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));

let isDragging = false;
let startX;
let currentTranslate = 0;
let prevTranslate = 0;

function startDrag(e) {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX;
    carouselTrack.style.transition = 'none'; 
    e.currentTarget.classList.add('dragging');
}

function duringDrag(e) {
    if (!isDragging) return;

    const currentX = e.pageX || e.touches[0].pageX;
    const diffX = currentX - startX;
    currentTranslate = prevTranslate + diffX;

    carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
}

function endDrag(e) {
    if (!isDragging) return;

    isDragging = false;
    carouselTrack.style.transition = 'transform 0.3s ease'; 
    e.currentTarget.classList.remove('dragging'); 

    const slideWidth = slides[0].getBoundingClientRect().width;
    const moveIndex = Math.round(-currentTranslate / slideWidth);

    const maxIndex = slides.length - 1;
    const finalIndex = Math.max(0, Math.min(moveIndex, maxIndex));

    prevTranslate = -finalIndex * slideWidth;
    carouselTrack.style.transform = `translateX(${prevTranslate}px)`;
}


carouselTrack.addEventListener('mousedown', startDrag);
carouselTrack.addEventListener('mousemove', duringDrag);
carouselTrack.addEventListener('mouseup', endDrag);
carouselTrack.addEventListener('mouseleave', endDrag);

carouselTrack.addEventListener('touchstart', startDrag);
carouselTrack.addEventListener('touchmove', duringDrag);
carouselTrack.addEventListener('touchend', endDrag);




function initializeCounter(counter) {
    const decrementButton = counter.querySelector('#decrement');
    const incrementButton = counter.querySelector('#increment');
    const numberInput = counter.querySelector('.number-input');

    // Function to update the input value
    function updateValue(newValue) {
        numberInput.value = newValue;
    }

    // Event listener for decrement button
    decrementButton.addEventListener('click', () => {
        let value = parseInt(numberInput.value, 10);
        const minValue = parseInt(numberInput.min, 10);
        if (value > minValue) {
            value--;
            updateValue(value);
        }
    });

    // Event listener for increment button
    incrementButton.addEventListener('click', () => {
        let value = parseInt(numberInput.value, 10);
        value++;
        updateValue(value);
    });
}

// Initialize counters for all counter elements when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.counter').forEach((counter) => {
        initializeCounter(counter);
    });
});