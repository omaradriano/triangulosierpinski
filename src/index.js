let gl;

import './css/custom.css'
import initWebGL from "./initContext";
let canvas = document.getElementById("canvas");

const generateTriangle = document.getElementById('btn__generateTriangle')

window.onload = start()
function start() { //Función que se ejecuta al principio de todo y sirve para dar un contexto de webgl
    gl = initWebGL(gl, canvas); // Inicializar el contexto GL

    if (gl) {
        gl.clearColor(0.75, 0.85, 0.80, 1.0); // Color azulito
        gl.enable(gl.DEPTH_TEST); // Habilitar prueba de profundidad
        gl.depthFunc(gl.LEQUAL); // Objetos cercanos opacan objetos lejanos
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Limpiar el buffer de color asi como el de profundidad
    }
}

generateTriangle.addEventListener('click', () => {

    const vertices = [
        0.0, 0.5,   // Vértice superior
        -0.5, -0.5,  // Vértice inferior izquierdo
        0.5, -0.5   // Vértice inferior derecho
    ];
    //((Ax + Bx) / 2, (Ay + By) / 2) 
    console.log(0.0 + (-0.5) / 2);
    console.log(0.5 + (-0.5) / 2);

    // Crear un búfer de vértices
    const vertexBuffer = gl.createBuffer();

    // Enlazar el búfer y cargar los vértices
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Definir los shaders de vértices y fragmentos
    const vsSource = `
            attribute vec4 aVertexPosition;
    
            void main() {
                gl_Position = aVertexPosition;
            }
            `;

    const fsSource = `
            void main() {
                gl_FragColor = vec4(0.75, 0.3, 0.80, 1.0); // Rojo sólido
            }
            `;

    // Crear los shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    // Compilar los shaders
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);

    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);

    // Crear el programa de shaders y adjuntar los shaders
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // Usar el programa de shaders
    gl.useProgram(shaderProgram);

    // Obtener la ubicación del atributo de posición de vértices
    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, "aVertexPosition");

    // Habilitar el atributo de posición de vértices
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Especificar el formato y la ubicación del búfer de vértices
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    gl.clearColor(0.75, 0.85, 0.80, 1.0); // Color azulito
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Limpiar el buffer de color asi como el de 
    // Dibujar el triángulo
    gl.drawArrays(gl.TRIANGLES, 0, 3);
})