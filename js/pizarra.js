var pizarra_canvas
var pizarra_context
var grosor = 1;
var color = "#000";
var recTam = 5;
var tipo = 0;

/*
	Inicializamos la pizarra. 
	En primer lugar comprobamos si el navegador tiene soporte para canvas utilizando la 
	librerÃ­a Modernizr. 
	DespuÃ©s guardamos referencia al canvas y definimos el color del trazo con el que vamos a dibujar. 
	Por Ãºltimo, aÃ±adimos listeners para los eventos "mousedown" y "mouseup", ya que cuando salten esos
	eventos tenemos que empezar / terminar de pintar
*/
function setColor(c) {
  color = c;
  init();
}

function setLine(l) {
  grosor = l;
  recTam = l+1;
  if(l == '1') {
    $("#pincel").html("<img src='img/Lfino.png'>");  
  }
  else if(l == '4') {
    $("#pincel").html("<img src='img/Lmedio.png'>");  
  }
  else if(l == '8') {
    $("#pincel").html("<img src='img/Lgrueso.png'>");  
  }
  init();
}

function setTipo(t) {
  tipo = t;
  if(t == '0') {
    $("#figura").html("<img src='img/Lmedio.png'>");  
  }
  else if(t == '2') {
    $("#figura").html("<img src='img/Circulo.png'>");  
  }
  else if(t == '1') {
    $("#figura").html("<img src='img/Rectangulo.png'>");  
  }
  init();
}

function init(){
	if(!Modernizr.canvas){
		document.getElementById("contenedor_pizarra").style.display = "none";
	}else{
		if(color != '#FFFFFF') {
		  document.getElementById("dColores").style.backgroundColor = color;
		}
		document.getElementById("no_html5").style.display = "none";
		pizarra_canvas = document.getElementById("pizarra");
		pizarra_context = pizarra_canvas.getContext("2d");
		pizarra_context.strokeStyle = color; 
		pizarra_context.lineWidth = grosor;
		pizarra_context.fillStyle = color;
		pizarra_canvas.addEventListener("mousedown",empezarPintar,false);
		pizarra_canvas.addEventListener("mouseup",terminarPintar,false);
		pizarra_canvas.addEventListener("mousemove",ponerCoordenadas,false);
	}
}

/*
	empezarPintar(e)
	Al hacer mousedown sobre la pizarra, comenzamos un nuevo trazo, movemos el pincel hasta la 
	posiciÃ³n del ratÃ³n y aÃ±adimos un listener para el evento mousemove, para que con cada movimiento 
	del ratÃ³n se haga un nuevo trazo
*/

function empezarPintar(e){
	pizarra_context.beginPath();
	pizarra_context.moveTo(e.clientX-pizarra_canvas.offsetLeft,e.clientY-pizarra_canvas.offsetTop);
	pizarra_canvas.addEventListener("mousemove",pintar,false)
}

function ponerCoordenadas(e) {
	$("#pX").html(e.clientX-pizarra_canvas.offsetLeft);
	$("#pY").html(e.clientY-pizarra_canvas.offsetTop);
}

/*
	terminarPintar(e) se ejecuta al soltar el botÃ³n izquierdo, y elimina el listener para 
	mousemove
*/

function terminarPintar(e){
	pizarra_canvas.removeEventListener("mousemove",pintar,false);
}
	
/*
	pintar(e) se ejecuta cada vez que movemos el ratÃ³n con el botÃ³n izquierdo pulsado.
	Con cada movimiento dibujamos una nueva linea hasta la posiciÃ³n actual del ratÃ³n en pantalla.
*/

function pintar(e) {
	if(tipo == 0) { //linea
	  pizarra_context.lineTo(e.clientX-pizarra_canvas.offsetLeft,e.clientY-pizarra_canvas.offsetTop);
	  pizarra_context.stroke();
	}
	else if(tipo == 1) { //cuadrado
	  pizarra_context.fillRect(e.clientX-pizarra_canvas.offsetLeft,e.clientY-pizarra_canvas.offsetTop,recTam,recTam); //pinta un cuadrado
	  pizarra_context.stroke();
	}
	else if(tipo == 2) { //circulo
	  pizarra_context.fill();
	  pizarra_context.beginPath();
	  pizarra_context.arc(e.clientX-pizarra_canvas.offsetLeft,e.clientY-pizarra_canvas.offsetTop, recTam/2, 0, 2 * Math.PI, false);
	  pizarra_context.stroke();
	}
}
/*
	borrar() vuelve a setear el ancho del canvas, lo que produce que se borren los trazos dibujados
	hasta ese momento.
*/

function borrar(){
	pizarra_canvas.width = pizarra_canvas.width;
	setColor(color);
	setLine(grosor);
}
