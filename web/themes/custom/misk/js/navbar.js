document.querySelector(".close-btn").addEventListener("click", function () {
  var toggle = document.querySelector('[data-bs-toggle="dropdown"]');
  bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
});

document.querySelector('[data-bs-toggle="dropdown"]').addEventListener('hide.bs.dropdown', function () {
  var menu = document.querySelector('.dropdown-menu');
  menu.style.animation = 'none';
  menu.getBoundingClientRect();
  menu.style.animation = '';
  menu.classList.add('hiding');

  menu.addEventListener('animationend', function () {
    menu.classList.remove('hiding');
  }, { once: true });
});
