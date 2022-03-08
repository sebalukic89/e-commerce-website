const mobileButtonElement = document.querySelector('#mobile-menu-btn');
const mobileMenuElement = document.querySelector('#mobile-menu');

const toggleMobileMenu = () => {
  mobileMenuElement.classList.toggle('open');
};

mobileButtonElement.addEventListener('click', toggleMobileMenu);
