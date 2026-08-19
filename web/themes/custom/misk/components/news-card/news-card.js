(function (Drupal, once) {
  'use strict';

  function applyReadMoreAnim(btn) {
    const text = btn.querySelector('.read-more-text');
    const icon = btn.querySelector('.read-more-icon');

    if (!text || !icon) {
      return;
    }

    const gap = 7;

    text.style.transform = `translateX(${icon.offsetWidth + gap}px)`;
    icon.style.transform = `translateX(-${text.offsetWidth + gap}px)`;
  }

  function clearReadMoreAnim(btn) {
    const text = btn.querySelector('.read-more-text');
    const icon = btn.querySelector('.read-more-icon');

    if (!text || !icon) {
      return;
    }

    text.style.transform = '';
    icon.style.transform = '';
  }

  Drupal.behaviors.newsCardReadMore = {
    attach(context) {
      once('news-card-read-more', '.read-more', context).forEach((btn) => {
        const slide = btn.closest('.news-slide');

        const target = slide || btn;

        target.addEventListener('mouseenter', () => {
          applyReadMoreAnim(btn);
        });

        target.addEventListener('mouseleave', () => {
          clearReadMoreAnim(btn);
        });
      });
    }
  };

})(Drupal, once);