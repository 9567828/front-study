const swiper = new Swiper(".eventSlide", {
  loop: true,
  autoplay: {
    delay: 3000, //add
    disableOnInteraction: false,
  },
  pagination: {
    clickable: true,
    el: ".swiper-pagination",
  },
});