class Menu {
  constructor() {
    this.menuReglas = document.querySelector('#menuInfo');
    this.menuReset = document.querySelector('#menuReset');
  }
  cambioMenu() {
    this.menu = document.querySelector('#site-nav');
    this.menuToggle = document.querySelector('#menu-toggle');
    this.menu.classList.toggle('site-nav-open');
    this.menuToggle.classList.toggle('menu-open');
  }
  reset(e) {
    e.preventDefault();
    if (juego.puntajeBot) {
      juego.puntajeBot.nodeValue = 0;
      juego.puntajeUsuario.nodeValue = 0;
    }
  }
  reglas(e) {
    e.preventDefault();
    alert.render(`
    <h2>Reglas de juego</h2>
      <ul>
        <li>
          <p class="reglassParrafo">Los jugadores elijen el elemento, sin que el oponente lo vea, y luego se muestran juntos,
de modo que pueda verse el elemento que cada uno ha elegido:</p>
          <ul>        
            <li>Piedra: un puño cerrado.</li>
            <li>Papel: todos los dedos extendidos, con la palma de la mano de lado.</li>
            <li>Tijera: dedos índice y medio extendidos y separados formando una "V".</li>
          </ul>
        </li>
        <li>
          <p>El objetivo es vencer al oponente seleccionando el arma que gana, 
según las siguientes reglas:</p>
          <ul>
            <li>La piedra aplasta la tijera (Gana la piedra).</li>
            <li>La tijera corta el papel (Gana la tijera).</li>
            <li>El papel envuelve la piedra (Gana el papel).</li>
            <li>En caso de empate (que dos jugadores elijan el mismo elemento), se juega otra vez.</li>
          </ul>
        </li>
      </ul>
    `, ['alertContainer', 'reglasContainer']);
    document.querySelector('.alertBtn').addEventListener('click', alert.action);
  }
}