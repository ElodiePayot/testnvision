document.addEventListener('DOMContentLoaded', function() {

  const topBtn = document.querySelector('#topTrigger');
  const section1 = document.querySelector('#section-1');
  const heightS1 = section1.clientHeight;

  window.addEventListener('scroll', () => {
    if (window.scrollY > heightS1) {
      topBtn.classList.add('active');
    }
    else (
      topBtn.classList.remove('active')
    )
  });


}, false);
