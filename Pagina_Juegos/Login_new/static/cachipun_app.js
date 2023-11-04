// Instancias de Clases
let menu = new Menu();
let alert = new Alert();
let juego = new Juego();

// Variables
let menuBtn = document.querySelector('#menu-toggle');
let menuReset = document.querySelector('#menuReset');
let menuReglas = document.querySelector('#menuReglas');
let juegoUsuario = document.querySelector('#juegoUsuario');

// Listeners del menú
menuBtn.addEventListener('click', menu.cambioMenu);
menuReset.addEventListener('click', e => {
  menu.reset(e);
  menu.cambioMenu(e);
});
menuReglas.addEventListener('click', e => {
  menu.reglas(e);
  menu.cambioMenu(e);
});



// Listeners del Juego
juegoUsuario.addEventListener('click', jugar);

function jugar(e) {
  juegoUsuario.removeEventListener('click', jugar);
  e.target.classList.toggle('eleccionActiva');
  juego.usuario(e);
  juego.bot();
  juego.partida(juego.eleccionUsuario, juego.eleccionBot);
  setTimeout(e => {
    alert.render(juego.mensaje, ['alertContainer']);
    let alertBtn = document.querySelector('.alertBtn');
    alertBtn.addEventListener('click', e => {
      alert.action();
      alert.actionJuego();
    });
    juegoUsuario.addEventListener('click', jugar);
  }, 1000);

}

