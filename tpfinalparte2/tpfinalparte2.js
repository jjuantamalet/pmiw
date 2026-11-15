//https://youtu.be/G8w_ie-7w-0
//Subercasaux en el rio
//integrantes Juan Agustin Mendoza Tamalet, Mateo Bautista Rodriguez
let juego;
let aguaImg;
let canoaImg = [];
let rocaImg = [];
let escudoImg = [];
let pantallaInicialImg, pantallaInstruccionesImg, pantallaGanarImg, pantallaPerderImg;
let boton0Img, boton1Img;

let s_rio, s_barcoRoto, s_escudoAgarrar, s_escudoRoto, s_victoria;

function preload() {
  aguaImg = loadImage('data/agua.png');
  pantallaInicialImg = loadImage('data/pantallainicial.png');
  pantallaInstruccionesImg = loadImage('data/pantallainstrucciones.png');
  pantallaGanarImg = loadImage('data/pantallaganar.png');
  pantallaPerderImg = loadImage('data/pantallaperder.png');
  
  boton0Img = loadImage('data/boton0.png');
  boton1Img = loadImage('data/boton1.png');

  for (let i = 0; i < 15; i++) {
    canoaImg[i] = loadImage('data/sprite' + i + '.png');
  }

  for (let i = 0; i < 5; i++) {
    rocaImg[i] = loadImage('data/roca' + i + '.png');
  }

  for (let i = 0; i < 3; i++) {
    escudoImg[i] = loadImage('data/escudo' + i + '.png');
  }

  s_rio = loadSound('data/rio.mp3');
  s_barcoRoto = loadSound('data/barco_roto.mp3');
  s_escudoAgarrar = loadSound('data/escudo_agarrar.mp3');
  s_escudoRoto = loadSound('data/escudo_roto.mp3');
  s_victoria = loadSound('data/victoria.mp3');
}

function setup() {
  createCanvas(800, 400);
  juego = new Juego();
}

function draw() {
  juego.actualizar();
  juego.dibujar();
}

function mousePressed() {
  juego.click();
}
