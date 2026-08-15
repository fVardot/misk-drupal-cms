(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.newsSlider = {
    attach(context) {
      once('news-slider', '.news-slider', context).forEach((slider) => {
        const carousel = slider.querySelector('.news-carousel');
        const slides = Array.from(
          slider.querySelectorAll('.news-slide')
        );

        const previousButton = slider.querySelector(
          '.slider-arrow--prev'
        );

        const nextButton = slider.querySelector(
          '.slider-arrow--next'
        );

        if (!carousel || !slides.length) {
          return;
        }

        let currentIndex = 0;

        const updateSlider = () => {
          slides.forEach((slide, index) => {
            slide.classList.toggle(
              'is-active',
              index === currentIndex
            );
          });

          const slideWidth = slides[0].offsetWidth;
          const sliderWidth = slider.offsetWidth;

          const activeSlide = slides[currentIndex];

          const activeCenter =
            activeSlide.offsetLeft + (slideWidth / 2);

          const viewportCenter = sliderWidth / 2;

          const offset =
            viewportCenter - activeCenter;

          carousel.style.transform =
            `translateX(${offset}px)`;

          if (previousButton) {
            previousButton.disabled =
              currentIndex === 0;
          }

          if (nextButton) {
            nextButton.disabled =
              currentIndex === slides.length - 1;
          }
        };

        previousButton?.addEventListener('click', () => {
          if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
          }
        });

        nextButton?.addEventListener('click', () => {
          if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlider();
          }
        });

        window.addEventListener('resize', updateSlider);

        updateSlider();
      });
    }
  };

})(Drupal, once);