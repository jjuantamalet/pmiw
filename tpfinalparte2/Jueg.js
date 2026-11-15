class Juego {
  constructor() {
    this.estado = "menu";
    this.barco = new Barco();
    this.escudo = new Escudo();

    this.duracion = 30 * 60; 
    this.frames = 0;         

    this.cantRocas = 6;
    this.crearRocas();

    this.y1 = 0;
    this.y2 = -height;
    this.velAgua = 4; 

    this.btnJugar = new Boton("JUGAR", 300, 200, 200, 50);
    this.btnInstrucciones = new Boton("INSTRUCCIONES", 250, 270, 300, 50);
    this.btnVolverInstrucciones = new Boton("VOLVER", 300, 330, 200, 50);
    this.btnVolverGanaste = new Boton("VOLVER AL INICIO", 250, 260, 300, 50);
    this.btnVolverPerdiste = new Boton("VOLVER AL INICIO", 250, 260, 300, 50);
    
    this.audioReproduciendose = false;
    this.finAudioActivado = false;
  }

  crearRocas() {
    this.rocas = [];
    for (let i = 0; i < this.cantRocas; i++) {
      this.rocas[i] = new Roca();
    }
  }

  actualizar() {
    if (this.estado === "jugando") {
      if (!this.audioReproduciendose) {
        s_rio.loop();
        s_rio.setVolume(0.5);
        this.audioReproduciendose = true;
      }

      this.frames++;

      if (this.frames >= this.duracion) {
        this.estado = "final";
        s_rio.stop();
        if (!this.finAudioActivado) {
          s_victoria.play();
          this.finAudioActivado = true;
        }
      } else {
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65) || keyIsDown(97)) {
          this.barco.moverIzquierda();
        }
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68) || keyIsDown(100)) {
          this.barco.moverDerecha();
        }

        for (let i = 0; i < this.cantRocas; i++) {
          this.rocas[i].caer(this.barco);
          if (this.rocas[i].chocaCon(this.barco)) {
            if (this.barco.tieneEscudo) {
              this.barco.tieneEscudo = false;
              s_escudoRoto.play();
              this.rocas[i].volverAArrancar(this.barco);
            } else {
              this.estado = "perdio";
              s_rio.stop();
              if (!this.finAudioActivado) {
                s_barcoRoto.play();
                this.finAudioActivado = true;
              }
            }
          }
        }

        this.escudo.caer();
        if (this.escudo.chocaCon(this.barco)) {
          this.barco.tieneEscudo = true;
          s_escudoAgarrar.play();
          this.escudo.volverAArrancar();
        }
      }
    }
  }

  dibujar() {
    if (this.estado === "menu") {
      this.dibujarMenu();
    } else if (this.estado === "instrucciones") {
      this.dibujarInstrucciones();
    } else if (this.estado === "jugando") {
      imageMode(CORNER);
      image(aguaImg, 0, this.y1, width, height);
      
      push();
      translate(0, this.y2);
      scale(1, -1);
      image(aguaImg, 0, -height, width, height);
      pop();
      
      this.y1 += this.velAgua;
      this.y2 += this.velAgua;
      if (this.y1 >= height) this.y1 = this.y2 - height;
      if (this.y2 >= height) this.y2 = this.y1 - height;

      for (let i = 0; i < this.cantRocas; i++) {
        this.rocas[i].dibujar();
      }
      this.escudo.dibujar();
      this.barco.dibujar();
      
      this.dibujarTimer();
      this.dibujarIndicadorEscudo();
      
    } else if (this.estado === "final") {
      this.dibujarFinal();
    } else {
      this.dibujarPerdio();
    }
  }

  dibujarMenu() {
    imageMode(CORNER);
    image(pantallaInicialImg, 0, 0, width, height);
    
    fill(255);
    textSize(38);
    textAlign(CENTER, BASELINE);
    text("SUBERCASEAUX EN EL RIO", width / 2, 90);
    
    this.btnJugar.dibujar();
    this.btnInstrucciones.dibujar();
  }

  dibujarInstrucciones() {
    imageMode(CORNER);
    image(pantallaInstruccionesImg, 0, 0, width, height);
    
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("INSTRUCCIONES", width / 2, 45);
    
    textSize(15);
    text("• Movimiento: Flechas o teclas A y D para mover el barco.", width / 2, 100);
    text("• Objetivo: Esquivá las rocas durante 30 segundos para ganar.", width / 2, 140);
    text("• Power-up: Agarrá los círculos de agua para conseguir un escudo", width / 2, 180);
    text("  que te protege y aguanta un choque contra las rocas.", width / 2, 210);
    text("• Vidas: Tenés una sola vida. ¡Cuidado!", width / 2, 250);
    
    this.btnVolverInstrucciones.dibujar();
  }

  click() {
    if (this.estado === "menu" && this.btnJugar.mouseEncima()) {
      this.estado = "jugando";
    } else if (this.estado === "menu" && this.btnInstrucciones.mouseEncima()) {
      this.estado = "instrucciones";
    } else if (this.estado === "instrucciones" && this.btnVolverInstrucciones.mouseEncima()) {
      this.estado = "menu";
    } else if (this.estado === "final" && this.btnVolverGanaste.mouseEncima()) {
      this.volverAlInicio();
    } else if (this.estado === "perdio" && this.btnVolverPerdiste.mouseEncima()) {
      this.volverAlInicio();
    }
  }

  dibujarTimer() {
    fill(255);
    textAlign(LEFT, BASELINE);
    textSize(18);
    let segundos = int((this.duracion - this.frames) / 60) + 1;
    text("Tiempo: " + segundos, 15, 30);
  }

  dibujarIndicadorEscudo() {
    textSize(18);
    textAlign(RIGHT, BASELINE);
    if (this.barco.tieneEscudo) {
      fill(255, 220, 0);
      text("Escudo: SI", width - 15, 30);
    } else {
      fill(255);
      text("Escudo: NO", width - 15, 30);
    }
  }

  dibujarFinal() {
    imageMode(CORNER);
    image(pantallaGanarImg, 0, 0, width, height);
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(45);
    text("¡GANASTE!", width / 2, height / 2 - 60);
    this.btnVolverGanaste.dibujar();
  }

  dibujarPerdio() {
    imageMode(CORNER);
    image(pantallaPerderImg, 0, 0, width, height);
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(45);
    text("PERDISTE", width / 2, height / 2 - 60);
    this.btnVolverPerdiste.dibujar();
  }

  volverAlInicio() {
    if (this.estado === "final" || this.estado === "perdio") {
      s_barcoRoto.stop();
      s_victoria.stop();
      this.barco = new Barco();
      this.escudo = new Escudo();
      this.frames = 0;
      this.crearRocas();
      this.estado = "menu";
      this.audioReproduciendose = false;
      this.finAudioActivado = false;
    }
  }
}
