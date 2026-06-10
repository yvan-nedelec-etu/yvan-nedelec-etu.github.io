document.addEventListener('DOMContentLoaded', function () {
  var burger    = document.getElementById('burger');
  var navMobile = document.getElementById('nav-mobile');
  var closeBtn  = document.getElementById('nav-mobile-close');
  if (!burger || !navMobile) return;
  burger.addEventListener('click', function () { navMobile.classList.add('open'); });
  closeBtn.addEventListener('click', function () { navMobile.classList.remove('open'); });
  navMobile.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { navMobile.classList.remove('open'); });
  });
});
