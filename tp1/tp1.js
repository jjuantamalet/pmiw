//https://youtu.be/r72KCkENUK4
let sprite=[];
let nubesImg=[],nubesX=[],nubesY=[];
let elemImg=[],elemX=[],elemY=[],elemW=[],elemH=[];
let valla,suelo,nube1,nube2,montanas,casa,cartel,arbusto1,arbusto2,arbol1,arbol2;
let posX,posY,frameActual=5,velocidadMundo=3,mundoX=0;
let estado="QUIETO",contadorEnojo=0;

function preload() {
  for(let i=0;i<22;i++) {
    sprite[i]=loadImage("data/"+i+".png");
  }
  casa=loadImage("data/casa.png");
  valla=loadImage("data/valla.png");
  suelo=loadImage("data/suelo.png");
  nube1=loadImage("data/nube1.png");
  nube2=loadImage("data/nube2.png");
  montanas=loadImage("data/montanas.png");
  cartel=loadImage("data/cartel.png");
  arbusto1=loadImage("data/arbusto1.png");
  arbusto2=loadImage("data/arbusto2.png");
  arbol1=loadImage("data/arbol1.png");
  arbol2=loadImage("data/arbol2.png");
}

function setup() {
  createCanvas(800,600);
  posX=width*0.5; 
  posY=height*0.78;

  for(let i=0;i<6;i++) {
    nubesImg[i]=random([nube1,nube2]);
    nubesX[i]=i*350;
    nubesY[i]=random(50,250);
  }

  let tipos=[arbol1,arbol2,casa,arbusto1,arbusto2,valla,cartel];
  
  for(let i=0;i<15;i++) {
    let tipoSeleccionado=random(tipos);
    elemImg[i]=tipoSeleccionado;
    elemX[i]=i*300; 
    elemW[i]=tipoSeleccionado.width*0.4;  
    elemH[i]=tipoSeleccionado.height*0.4;
    elemY[i]=height*0.815-elemH[i];
  }
}

function draw() {
  background(119,202,253);

  if(estado==="QUIETO") {
    frameActual=5;
  } 
  else if(estado==="CORRIENDO") {
    mundoX-=velocidadMundo;
    animar(0,4,5);
    contadorEnojo++;
    
    if(contadorEnojo>300) {
      estado="ENOJADO";
      frameActual=5;
      contadorEnojo=0;
    }
  } 
  else if(estado==="ENOJADO") {
    animar(5,21,6);
  }

  imageMode(CENTER);
  for(let n=0;n<6;n++) {
    let xNube=nubesX[n]+mundoX*0.2;
    if(xNube<-200) {
      nubesX[n]+=width*2;
    }
    image(nubesImg[n],xNube,nubesY[n],nubesImg[n].width*1.3,nubesImg[n].height*1.3);
  }

  let desplazamientoMontanas=mundoX*0.4;
  let escalaMontanas=width*1.4;
  for(let m=-1;m<3;m++) {
    image(montanas,(m*escalaMontanas)+(desplazamientoMontanas%escalaMontanas),height*0.6,escalaMontanas,height*0.5);
  }

  imageMode(CORNER);
  let margenPantalla=width+250;
  let tamSuelo=suelo.width;
  let posSuelo=mundoX%tamSuelo;
  for(let x=posSuelo-tamSuelo;x<margenPantalla;x+=tamSuelo-10) {
    image(suelo,x,height*0.80,tamSuelo+10,suelo.height);
  }

  for(let i=0;i<15;i++) {
    let posicionPantalla=elemX[i]+mundoX;
    
    if(posicionPantalla<-300) {
      elemX[i]+=width*6;
    }
    
    if(posicionPantalla>-300&&posicionPantalla<margenPantalla) {
      image(elemImg[i],posicionPantalla,elemY[i],elemW[i],elemH[i]);
    }
  }

  dibujarPersonaje(sprite[frameActual],posX,posY);
}
function animar(ini,fin,vel) {
  if(frameCount%vel===0) {
    frameActual++;
    if(frameActual>fin) {
      frameActual=ini;
      if(estado==="ENOJADO") {
        estado="CORRIENDO";
        contadorEnojo=0;
      }
    }
  }
}

function dibujarPersonaje(img,x,y) {
  imageMode(CENTER);
  push();
  translate(x,y);
  scale(-1,1);
  image(img,0,0);
  pop();
}
function keyPressed() {
  if(key===' ') {
    if(estado==="QUIETO") {
      estado="CORRIENDO";
      frameActual=0;
      velocidadMundo=3;
      contadorEnojo=0;
    } 
    else if(estado==="CORRIENDO") {
      velocidadMundo+=2;
    }
  } 
  else if(key==='r'||key==='R') {
    estado="QUIETO";
    frameActual=5;
    velocidadMundo=3;
    contadorEnojo=0;
  }
}
