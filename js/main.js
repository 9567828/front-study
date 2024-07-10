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

// 사이드 메뉴 활성화시 스크롤 막기
function preventScroll(e) {
  window.scrollTo(0, 0);
}

const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(function(item) {
  item.addEventListener('click', function(e) {
    const subMenu = this.querySelector('.sub-list')
    const arrowIcon = this.querySelector('.fa-caret-right')

    subMenu.classList.toggle('open')
    arrowIcon.classList.toggle('active')

    menuItems.forEach(function(otherItem) {
      if (otherItem !== item) {
        const otherSubMenu = otherItem.querySelector('.sub-list')
        const arrowIcon = otherItem.querySelector('.fa-caret-right')
        otherSubMenu.classList.remove('open')
        arrowIcon.classList.remove('active')
      }
    })

  })
})