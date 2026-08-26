(function (Drupal) {
  'use strict';

  Drupal.behaviors.contactResults = {
    attach: function (context) {

      const buttons = context.querySelectorAll(
        '.contact-results__message button'
      );

      buttons.forEach(function (button) {
        if (button.dataset.contactResultsProcessed) {
          return;
        }

        button.dataset.contactResultsProcessed = 'true';

        button.addEventListener('click', function () {
          const cell = button.closest('.contact-results__message');
          const shortMessage = cell.querySelector('.message-short');
          const fullMessage = cell.querySelector('.message-full');

          if (fullMessage.style.display === 'none') {
            shortMessage.style.display = 'none';
            fullMessage.style.display = 'block';
            button.textContent = 'Show less';
          }
          else {
            shortMessage.style.display = 'inline';
            fullMessage.style.display = 'none';
            button.textContent = 'Show more';
          }
        });
      });

    }
  };

})(Drupal);
