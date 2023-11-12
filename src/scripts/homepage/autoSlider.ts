export const handleSlider = () =>{
    document.addEventListener("DOMContentLoaded", function () {
        const slider = document.querySelector<HTMLDivElement>(".hero_image_slider");
        const prevButton = document.querySelector<HTMLElement>(".prev-button");
        const nextButton = document.querySelector<HTMLElement>(".next-button");
        const slideWidth = slider.offsetWidth;
        const numSlides = slider.children.length;
        let currentSlide = 0;
      
        const goToSlide = (slideNumber) => {
          if (slideNumber < 0) {
            currentSlide = numSlides - 1;
          } else if (slideNumber >= numSlides) {
            currentSlide = 0;
          } else {
            currentSlide = slideNumber;
          }
          slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        };
      
        const nextSlide = () => {
          currentSlide++;
          goToSlide(currentSlide);
        };
      
        const prevSlide = () => {
          currentSlide--;
          goToSlide(currentSlide);
        };
      
        let autoSlideInterval = setInterval(nextSlide, 3000);
      
        slider.addEventListener("mouseenter", () => {
          clearInterval(autoSlideInterval);
        });
      
        slider.addEventListener("mouseleave", () => {
          autoSlideInterval = setInterval(nextSlide, 3000);
        });
      
        nextButton.addEventListener("click", nextSlide);
        prevButton.addEventListener("click", prevSlide);
      });
      //
}
  