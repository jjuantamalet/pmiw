class Barco {
  constructor() {
    this.tam = 30;
    this.x = width / 2;
    this.y = height - 50;
    this.vel = 6;
    this.tieneEscudo = false;
    
    this.frameCanoa = 0;
    this.frameEscudo = 0;
  }

  dibujar() {
    imageMode(CENTER);
    
    if (this.tieneEscudo) {
      image(escudoImg[this.frameEscudo], this.x, this.y, 100, 100);
      if (frameCount % 5 === 0) {
        this.frameEscudo = (this.frameEscudo + 1) % 3;
      }
    }
    
    image(canoaImg[this.frameCanoa], this.x, this.y, 80, 50);
    
    if (frameCount % 4 === 0) {
      this.frameCanoa = (this.frameCanoa + 1) % 15;
    }
  }

  moverIzquierda() {
    if (this.x > this.tam / 2) {
      this.x -= this.vel;
    }
  }

  moverDerecha() {
    if (this.x < width - this.tam / 2) {
      this.x += this.vel;
    }
  }
}
