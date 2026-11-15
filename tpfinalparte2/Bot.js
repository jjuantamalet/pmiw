class Boton {
  constructor(texto, x, y, ancho, alto) {
    this.texto = texto;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
  }

  dibujar() {
    imageMode(CORNER);
    if (this.mouseEncima()) {
      image(boton1Img, this.x, this.y, this.ancho, this.alto);
    } else {
      image(boton0Img, this.x, this.y, this.ancho, this.alto);
    }
    
    fill(255); 
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(22);
    text(this.texto, this.x + this.ancho / 2, this.y + this.alto / 2);
  }

  mouseEncima() {
    return mouseX > this.x && mouseX < this.x + this.ancho &&
           mouseY > this.y && mouseY < this.y + this.alto;
  }
}
