function main() {

    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");


    /*posisi titik yang direncabakan
    A(-0.5 , 0.5)
    B(-0.5 , -0.5)
    C(0.5 , -0.5)
    */

    
    var vertices = [
        -0.5, 0.5,      // titik A
        -0.5, -0.5,     // titik B
        0.5, -0.5,      // titik C
        0.5, -0.5,      // titik C
        0.5, 0.5,       //titik D
        -0.5, 0.5     // titik A
    ];


    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = document.getElementById("vertexShaderCode").text;

    //membuat titik
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;
    
    //membuat warna
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    //package program
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    //karena titiknya ada 3
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");

    //3 titik menggunakan array buffer
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(aPosition);


    //define background
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    
    gl.drawArrays(gl.TRIANGLES, 0,6);

}