/**
 * Template Name: AgriCulture
 * Template URL: https://bootstrapmade.com/agriculture-bootstrap-website-template/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

;(function () {
  'use strict'

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled () {
    const selectBody = document.querySelector('body')
    const selectHeader = document.querySelector('#header')
    if (
      !selectHeader.classList.contains('scroll-up-sticky') &&
      !selectHeader.classList.contains('sticky-top') &&
      !selectHeader.classList.contains('fixed-top')
    )
      return
    window.scrollY > 100
      ? selectBody.classList.add('scrolled')
      : selectBody.classList.remove('scrolled')
  }

  document.addEventListener('scroll', toggleScrolled)
  window.addEventListener('load', toggleScrolled)

  /**
   * Scroll up sticky header to headers with .scroll-up-sticky class
   */
  let lastScrollTop = 0
  window.addEventListener('scroll', function () {
    const selectHeader = document.querySelector('#header')
    if (!selectHeader.classList.contains('scroll-up-sticky')) return

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop && scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important')
      selectHeader.style.top = `-${header.offsetHeight + 50}px`
    } else if (scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important')
      selectHeader.style.top = '0'
    } else {
      selectHeader.style.removeProperty('top')
      selectHeader.style.removeProperty('position')
    }
    lastScrollTop = scrollTop
  })

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle')

  function mobileNavToogle () {
    document.querySelector('body').classList.toggle('mobile-nav-active')
    mobileNavToggleBtn.classList.toggle('bi-list')
    mobileNavToggleBtn.classList.toggle('bi-x')
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle)

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle()
      }
    })
  })

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault()
      this.parentNode.classList.toggle('active')
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active')
      e.stopImmediatePropagation()
    })
  })

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader')
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    })
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top')

  function toggleScrollTop () {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active')
    }
  }
  scrollTop.addEventListener('click', e => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })

  window.addEventListener('load', toggleScrollTop)
  document.addEventListener('scroll', toggleScrollTop)

  /**
   * Animation on scroll function and init
   */
  function aosInit () {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  }
  window.addEventListener('load', aosInit)

  /**
   * Auto generate the carousel indicators
   */
  document
    .querySelectorAll('.carousel-indicators')
    .forEach(carouselIndicator => {
      carouselIndicator
        .closest('.carousel')
        .querySelectorAll('.carousel-item')
        .forEach((carouselItem, index) => {
          if (index === 0) {
            carouselIndicator.innerHTML += `<li data-bs-target="#${
              carouselIndicator.closest('.carousel').id
            }" data-bs-slide-to="${index}" class="active"></li>`
          } else {
            carouselIndicator.innerHTML += `<li data-bs-target="#${
              carouselIndicator.closest('.carousel').id
            }" data-bs-slide-to="${index}"></li>`
          }
        })
    })

  /**
   * Init swiper sliders
   */
  function initSwiper () {
    document.querySelectorAll('.init-swiper').forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector('.swiper-config').innerHTML.trim()
      )

      if (swiperElement.classList.contains('swiper-tab')) {
        initSwiperWithCustomPagination(swiperElement, config)
      } else {
        new Swiper(swiperElement, config)
      }
    })
  }

  window.addEventListener('load', initSwiper)

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  })
})()


const projectItems = document.querySelectorAll('.project-item');
const sliderModal = document.getElementById('sliderModal');
const sliderImage = document.getElementById('sliderImage');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
let currentProjectImages = [];

// Liste des images pour chaque projet
const projectImages = {
    project1: [
        'assets/img/karim02.png',
        'assets/img/karim03.png',
        'assets/img/karim04.png',
    ],
    project2: [
        'path/to/project2_image1.jpg',
        'path/to/project2_image2.jpg',
        'path/to/project2_image3.jpg',
    ],
    project3: [
        'path/to/project3_image1.jpg',
        'path/to/project3_image2.jpg',
        'path/to/project3_image3.jpg',
    ],
};

// Ouvrir le slider quand on clique sur un projet
projectItems.forEach(item => {
    item.addEventListener('click', () => {
        const project = item.getAttribute('data-project');
        currentProjectImages = projectImages[project];
        currentIndex = 0;
        updateSliderImage();
        sliderModal.style.display = 'block';
    });
});

// Met à jour l'image du slider
function updateSliderImage() {
    sliderImage.src = currentProjectImages[currentIndex];
}

// Fermer le modal
closeBtn.addEventListener('click', () => {
    sliderModal.style.display = 'none';
});

// Navigation précédente
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentProjectImages.length - 1;
    updateSliderImage();
});

// Navigation suivante
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < currentProjectImages.length - 1) ? currentIndex + 1 : 0;
    updateSliderImage();
});

// Fermer le modal en cliquant en dehors de l'image
sliderModal.addEventListener('click', (event) => {
    if (event.target === sliderModal) {
        sliderModal.style.display = 'none';
    }
});
