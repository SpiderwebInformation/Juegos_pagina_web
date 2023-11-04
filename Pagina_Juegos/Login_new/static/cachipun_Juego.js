class Juego {
  constructor() {
    this.puntosBot = 0;
    this.puntosUsuario = 0;
  }
  usuario(e) {
    e.stopPropagation();
    this.juegoUsuario = document.querySelector('.jugadaUsuario');
    switch (e.target.id) {
      case 'piedra':
        this.eleccionUsuario = 0;
        break
      case 'papel':
        this.eleccionUsuario = 1;
        break
      case 'tijera':
        this.eleccionUsuario = 2;
        break
    }
  }
  bot() {
    this.eleccionBot = Math.floor(Math.random() * 3);
  }
  partida(eleccionUsuario, eleccionBot) {
    this.juegoBot = document.querySelector('.jugadaBot');
    this.eleccionBot = eleccionBot;
    this.jugadaBot = this.juegoBot.querySelector('img');
    this.puntajeBot = document.querySelector('#puntosBot').firstChild;
    this.eleccionUsuario = eleccionUsuario;
    this.jugadaUsuario = this.juegoUsuario.querySelector('img');
    this.puntajeUsuario = document.querySelector('#puntosUsuario').firstChild;
    if (this.eleccionBot == this.eleccionUsuario) {
      this.mensaje = 'Empate';
    } else if (this.eleccionBot == 1 && this.eleccionUsuario == 0 || this.eleccionBot == 2 && this.eleccionUsuario == 1 || this.eleccionBot == 0 && this.eleccionUsuario == 2) {
      this.puntosBot++;
      this.mensaje = 'Gana Bot';
    } else if (this.eleccionBot == 2 && this.eleccionUsuario == 0 || this.eleccionBot == 1 && this.eleccionUsuario == 2 || this.eleccionBot == 0 && this.eleccionUsuario == 1) {
      this.puntosUsuario++;
      this.mensaje = 'Gana Usuario';
    }
    switch (this.eleccionUsuario) {
      case 0:
        this.imgUsuario = './img/piedra.png'
        break;
      case 1:
        this.imgUsuario = './img/papel.png'
        break;
      case 2:
        this.imgUsuario = './img/tijera.png'
        break;
    }
    switch (this.eleccionBot) {
      case 0:
        this.imgBot = './img/piedra.png'
        break;
      case 1:
        this.imgBot = './img/papel.png'
        break;
      case 2:
        this.imgBot = './img/tijera.png'
        break;
    }
    setTimeout((imgBot, imgUsuario) => {
      this.puntajeBot.nodeValue = this.puntosBot;
      this.puntajeUsuario.nodeValue = this.puntosUsuario;
      this.jugadaBot.setAttribute('src', imgBot);
      this.jugadaUsuario.setAttribute('src', imgUsuario);
    }, 1000, this.imgBot, this.imgUsuario);
  }
}