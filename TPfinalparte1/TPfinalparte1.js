// Integrantes: Mateo Rodríguez y Juan Mendoza Tamalet
// Trabajo practico: El Desierto, de Horacio Quiroga 
// URL: https://youtu.be/_p7JHiVy44E

let estado = 0;
let textos = [];
let imagenes = []; 

// Nombres para la pantalla de créditos y control de opacidad
let nombresCreditos = "\n\nEl Desierto de Horacio Quiroga\naventura grafica hecha por:\nJuan Mendoza Tamalet y Mateo Bautista Rodríguez";
let opCreditos = 0;

// Fuentes
let fuenteText;
let fuenteCreditos;

// Sonidos
let sonidoAmbiente;
let latidos;
let trueno;
let grito;
let caida;
let hambre;
let delirio;

let mapaImagenes = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13, 14, 15, 16, 17, 18, 19, 20
];

// arreglo para el boton A
let textosBotonA = [
  "Comenzar",                                  
  "Continuar",                                  
  "Continuar",                                  
  "Continuar",                                  
  "A. Salir en la canoa desafiando el clima",  
  "Continuar",                                  
  "Continuar",                                 
  "A. Intentar preparar comida para sus hijos",
  "Continuar",                                  
  "Continuar",                                  
  "Continuar",                                
  "Continuar",                                  
  "A. Enseñar a protegerse y comunicarse",     
  "Continuar",                                 
  "Continuar",                                  
  "A. Resistir con las provisiones restantes", 
  "Continuar",                                 
  "Continuar",                                  
  "A. Tapar las goteras con envases plásticos",
  "Continuar",                                  
  "Continuar",                                  
  "Reiniciar"                                   
];

// arreglo boton B
let opcionesBotonB = [];
opcionesBotonB[4]  = "B. Quedarse en el rancho a cuidar a los niños";
opcionesBotonB[7]  = "B. Intentar buscar ayuda con los vecinos";
opcionesBotonB[12] = "B. Mandar a sus hijos a buscar ayuda";
opcionesBotonB[15] = "B. Salir a buscar ayuda o refugio";
opcionesBotonB[18] = "B. Utilizar los envases para señales de humo";

function preload() {
  //carga de textos, imagenes y sonido
  
  textos = loadStrings("textos.txt");
  fuenteText = loadFont("data/Lora.ttf");
  fuenteCreditos = loadFont("data/ZillaSlab-SemiBold.ttf");
  for (let i = 0; i <= 20; i++) {
    imagenes[i] = loadImage("data/pantalla" + i + ".png"); 
  }
  sonidoAmbiente = loadSound("data/sonidoFondo.mp3");
  latidos = loadSound("data/corazon.mp3");
  trueno = loadSound("data/trueno.mp3");
  grito = loadSound("data/grito.mp3");
  caida = loadSound("data/caida.mp3");  
  hambre = loadSound("data/hambre.mp3"); 
  delirio= loadSound("data/delirio.mp3");
}

function setup() {
  createCanvas(800, 450);
  textFont(fuenteText);
}

function draw() {
  background(25);

 //Muestra de pantalla
  if (estado >= 0 && estado <= 21) {
    dibujarPantalla(estado);
  }
}

function dibujarPantalla(numEstado) {
  let indiceImagen = obtenerIndiceImagen(numEstado);
  image(imagenes[indiceImagen], 0, 0, width, height);

  // mostramos la caja y texto exceptuando en los estados que no nos sirve
  if (numEstado !== 0 && numEstado !== 21) {
    mostrarCajaYTexto(numEstado);
  }
  
  // creditos
  if (numEstado == 21) {
    dibujarCreditosFinales();
  }

  crearBoton(numEstado);
}
// indice de la imagen segun el estado
function obtenerIndiceImagen(numEstado) {
  let aux = numEstado;
  if (aux >= 0 && aux <= 21) {
    return mapaImagenes[aux];
  } else {
    return 0;
  }
}

function obtenerTextoBotonA(numEstado) {
  if (numEstado >= 0 && numEstado <= 21) {
    return textosBotonA[numEstado];
  }
  return "Continuar";
}

function obtenerTextoBotonB(numEstado) {
  let aux = numEstado;

  if (aux == 4 || aux == 7 || aux == 12 || aux == 15 || aux == 18) {
    return opcionesBotonB[aux];
  } else {
    return "";
  }
}
// crea el boton
function crearBoton(numEstado) {
  let btn1 = obtenerTextoBotonA(numEstado);
  let btn2 = obtenerTextoBotonB(numEstado);

  if (btn2 !== "") {
    dibujarBotonIndividual(btn1, 210, 425, 320, 28);
    dibujarBotonIndividual(btn2, 590, 425, 320, 28);
  } else if (btn1 !== "") {
    dibujarBotonIndividual(btn1, 400, 425, 220, 28);
  }
}

// dibujo del boton y hover
function dibujarBotonIndividual(txt, x, y, ancho, alto) {
  if (colisionBoton(x, y, ancho, alto)) {
    fill(140, 110, 50, 180);
  } else {
    fill(45, 35, 20, 150);
  }

  stroke(180, 145, 75, 160);
  strokeWeight(1.5);
  rectMode(CENTER);
  rect(x, y, ancho, alto, 5);

  noStroke();
  fill(255);
  textSize(14); 
  textAlign(CENTER, CENTER);
  text(txt, x, y);
}
//detecta si el boton esta dentro de una zona
function colisionBoton(x, y, ancho, alto) {
  if (mouseX > x - ancho / 2 && mouseX < x + ancho / 2 &&
      mouseY > y - alto / 2 && mouseY < y + alto / 2) {
    return true;
  } else {
    return false;
  }
}

function mostrarCajaYTexto(numEstado) {
  let cajaAlto = height * 0.25; 
  let cajaY = height - cajaAlto;
  let cajaAncho = width - 40;
  let cajaX = 20;

  stroke(180, 145, 75, 160);
  strokeWeight(1);
  fill(65, 50, 25, 140);
  rectMode(CORNER);
  rect(cajaX, cajaY, cajaAncho, cajaAlto - 5, 8);

  let tx = cajaX + 20;
  let ty = cajaY + 10;
  let mensaje = textos[numEstado];

  dibujarTextoConSombra(mensaje, tx, ty, cajaAncho - 40, cajaAlto - 45);
}
// creditos
function dibujarCreditosFinales() {
  if (opCreditos < 255) {
    opCreditos += 3;
    if (opCreditos > 255) {
      opCreditos = 255;
    }
  }

  noStroke();
  textSize(25); 
  textAlign(CENTER, CENTER);
  fill(0, opCreditos); 
  
  textFont(fuenteCreditos);
  text(nombresCreditos, width / 2, height / 2 - 15);
}

function dibujarTextoConSombra(cadena, x, y, ancho, alto) {
  noStroke();
  textSize(18); 
  textAlign(LEFT, TOP);

  fill(0);
  text(cadena, x + 1, y, ancho, alto);
  text(cadena, x - 1, y, ancho, alto);
  text(cadena, x, y + 1, ancho, alto);
  text(cadena, x, y - 1, ancho, alto);

  fill(255);
  text(cadena, x, y, ancho, alto);
}

function mousePressed() {
  let estadoAnterior = estado;
 //paso entre estados 
  if (estado >= 0 && estado <= 3) {
    if (colisionBoton(400, 425, 220, 28)) {
      estado++;
    }
  } 
  else if (estado == 4) {
    if (colisionBoton(210, 425, 320, 28)) {
      estado = 5;
    } else if (colisionBoton(590, 425, 320, 28)) {
      estado = 6;
    }
  } 
  else if (estado == 5) {
    if (colisionBoton(400, 425, 220, 28)) {
      estado = 6; 
    }
  }
  else if (estado == 6) {
    if (colisionBoton(400, 425, 220, 28)) {
      estado = 7;
    }
  }
  else if (estado == 7) {
    if (colisionBoton(210, 425, 320, 28)) {
      estado = 8;
    } else if (colisionBoton(590, 425, 320, 28)) {
      estado = 9;
    }
  } 
  else if (estado == 8) {
    if (colisionBoton(400, 425, 220, 28)) {
      estado = 10;
    }
  }
  else if (estado == 9) {
    if (colisionBoton(400, 425, 220, 28)) {
      estado = 10;
    }
  }
  else if (estado == 10) {
    if (colisionBoton(400, 425, 220, 28)) {
      estado = 11;
    }
  }
  else if (estado == 11) {
    if (colisionBoton(400, 425, 220, 28)) {
      estado = 12;
    }
  }
  else if (estado == 12) {
    if (colisionBoton(210, 425, 320, 28)) {
      estado = 13;
    } else if (colisionBoton(590, 425, 320, 28)) {
      estado = 14;
    }
  } 
  else if (estado == 13) { 
    if (colisionBoton(400, 425, 220, 28)) {
      estado = 21;
    }
  }
  else if (estado == 14) { 
    if (colisionBoton(400, 425, 220, 28)) {
      estado = 15;
    }
  }
  else if (estado == 15) { 
    if (colisionBoton(210, 425, 320, 28)) {
      estado = 16;
    } else if (colisionBoton(590, 425, 320, 28)) {
      estado = 20;
    }
  } 
  else if (estado == 16) {
    if (colisionBoton(400, 425, 220, 28)) {
      estado = 17;
    }
  }
  else if (estado == 17) {
    if (colisionBoton(400, 425, 220, 28)) {
      estado = 18;
    }
  }
  else if (estado == 18) { 
    if (colisionBoton(210, 425, 320, 28)) {
      estado = 19; 
    } else if (colisionBoton(590, 425, 320, 28)) {
      estado = 20; 
    }
  } 
  else if (estado == 19 || estado == 20) { 
    if (colisionBoton(400, 425, 220, 28)) {
      estado = 21;
    }
  }
  else if (estado == 21) {
    if (colisionBoton(400, 425, 220, 28)) {
      estado = 0;
    }
  }

  if (estado !== estadoAnterior) {
    opCreditos = 0;
  }
  
  // Sonido desde el estado 1 hasta los creditos
    if (estado == 1 && !sonidoAmbiente.isPlaying()) {
      sonidoAmbiente.loop();
      sonidoAmbiente.setVolume(0.4);
    }
    
    if (estado == 2){
      latidos.play();
    }else{
      latidos.stop();
    }
  
    if (estado == 2){
      latidos.play();
    }else{
      latidos.stop();
    }
 
     if (estado == 5){
      trueno.play();
    }else{
      trueno.stop();
    }
    
   if (estado == 2){
      latidos.play();
    }else{
      latidos.stop();
    }
    
   if (estado == 9){
      grito.play();
    }else{
      grito.stop();
    }
  if (estado == 10){
      delirio.play();
    }else{
      delirio.stop();
    }
  if (estado == 13 || estado == 14){
      caida.play();
    }else{
      caida.stop();
    }
    
  if (estado == 19){
      hambre.play();
    }else{
      hambre.stop();
    }
    
    if (estado == 21) {
      sonidoAmbiente.stop();
}
}
