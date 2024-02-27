document.getElementById('carta-abierta');
document.getElementById('carta-frente');
document.getElementById('carta-cerrada');
const blank = document.getElementById('blank');
const hoja = document.getElementById('hoja');
const cartaAbiertaContainer = document.getElementById('carta-abierta-container');
const cartaCerradaContainer = document.getElementById('carta-cerrada-container');
var abierta = false;

const corazon = document.getElementById('corazon');
var currentY = 0;

var initAnim = new TWEEN.Tween({ y: 0 }) // Inicializa el valor inicial de la animación
    .to({ y: -300 }, 1000) // Define el valor final y la duración de la animación (en milisegundos)
    .easing(TWEEN.Easing.Quadratic.Out) // Define una función de aceleración para la animación
    .onUpdate(function(f) { // Define lo que sucede en cada actualización de la animación
        hoja.style.transform = 'translateY(' + f.y + 'px)'; // Actualiza la posición del cuadrado en cada paso de la animación
})


corazon.addEventListener('click', ()=>{
    cartaCerradaContainer.style.display = abierta?'flex':'none';
    cartaAbiertaContainer.style.display = abierta?'none':'flex';
    initAnim.start();
});


var mouseOverAnim =new TWEEN.Tween({ y: -300 })
.to({ y: -350 }, 100)
.easing(TWEEN.Easing.Quadratic.Out)
.onUpdate(function(f) {
    hoja.style.transform = 'translateY(' + f.y + 'px)';
    currentY = f.y;
});

hoja.addEventListener('mouseover', ()=>{
    mouseOverAnim.start();
});


var mouseOutAnim =new TWEEN.Tween({ y: -350 })
.to({ y: -300 }, 100)
.easing(TWEEN.Easing.Quadratic.Out)
.onUpdate(function(f) {
    hoja.style.transform = 'translateY(' + f.y + 'px)';
    currentY = f.y;
});

hoja.addEventListener('mouseout', ()=>{
    mouseOutAnim.start();
});


var clickAnim = new TWEEN.Tween({ y: currentY })
    .to({ y: -1500 }, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function(f) {
        hoja.style.transform = 'translateY(' + f.y + 'px)';
        currentY = f.y;
    })

console.log(blank.style.top);

var hojaAppear = new TWEEN.Tween({ y: 100 })
.to({ y: 0 }, 3500)
.easing(TWEEN.Easing.Quadratic.InOut)
.onUpdate(function(f) {
    blank.style.top = f.y + 'vh';
})

clickAnim.chain(hojaAppear);

hoja.addEventListener('click', ()=>{
    clickAnim.start();
    mouseOverAnim.start = function(){};
    mouseOutAnim.start = function(){};
});

// Función de actualización que se ejecuta en cada cuadro de la animación
function actualizar() {
    requestAnimationFrame(actualizar);
    TWEEN.update(); // Actualiza todas las animaciones Tween.js
}
actualizar();