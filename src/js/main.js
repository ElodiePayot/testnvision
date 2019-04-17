document.addEventListener('DOMContentLoaded', function() { //fonction qui écoute les évenements

  const burger = document.querySelector('#triggerNav'); //constante id du burger
  const nav = document.querySelector('#pageNav'); //constante id de la nav

  burger.addEventListener('click', () => { //au clic sur le burger
    nav.classList.toggle('nav-active'); //on ajoute nav active sur la nav
  });
}, false);
