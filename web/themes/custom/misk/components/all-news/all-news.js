(function (Drupal, once) {
  'use strict';

  function applyReadMoreAnim(btn) {
    const text = btn.querySelector('.all-news__read-more-text');
    const icon = btn.querySelector('.all-news__read-more-icon');

    if (!text || !icon) {
      return;
    }

    const gap = 7;

    text.style.transform = `translateX(${icon.offsetWidth + gap}px)`;
    icon.style.transform = `translateX(-${text.offsetWidth + gap}px)`;
  }

  function clearReadMoreAnim(btn) {
    const text = btn.querySelector('.all-news__read-more-text');
    const icon = btn.querySelector('.all-news__read-more-icon');

    if (!text || !icon) {
      return;
    }

    text.style.transform = '';
    icon.style.transform = '';
  }

  Drupal.behaviors.allNewsReadMore = {
    attach(context) {
      once('all-news-read-more', '.all-news', context).forEach((card) => {
        const btn = card.querySelector('.all-news__read-more');

        if (!btn) {
          return;
        }

        card.addEventListener('mouseenter', () => {
          applyReadMoreAnim(btn);
        });

        card.addEventListener('mouseleave', () => {
          clearReadMoreAnim(btn);
        });
      });
    }
  };

})(Drupal, once);
