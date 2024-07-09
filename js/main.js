const sb = document.querySelector('.menu-bar')
const closeBtn = document.querySelector('.close-btn')

const BODY = document.querySelector("body");

window.addEventListener('scroll', function() {
  let i = this.document.documentElement.scrollTop;

  if (i > 200) {
    BODY.classList.add("scrolling");
  } else {
    BODY.classList.remove("scrolling");
  }
})


const sideMenu = document.querySelector('.side-menu');
sb.addEventListener('click', function(){
  sideMenu.classList.add("open");

  BODY.style.overflow = "hidden";
  document.addEventListener('scroll', preventScroll);
});

closeBtn.addEventListener('click', function() {
  sideMenu.classList.remove("open")

  BODY.style.overflow = "";
  document.removeEventListener('scroll', preventScroll)
})

function preventScroll(e) {
  window.scrollTo(0, 0);
}