console.log("Menggamabr huruf");

function main() {
    tesGreet()

    var canvas = document.getElementById("myCanvas")
    var gl = canvas.getContext("webgl")

    var vertices = [
        
        //huruf H
         -0.15, 0.25,      
         -0.15, -0.25,     
        
         -0.15, 0.0,     
         0.0, 0.0,       
        
         0.0, 0.25,      
         0.0, -0.25,      

        //Huruf C
        -0.25, 0.25,
        -0.40, 0.25,

        -0.40, 0.25,
        -0.40, -0.25,

        -0.40, -0.25,
        -0.25, -0.25,

        //Huruf Y
        0.10, 0.25,
        0.20, 0.0,

        0.20, 0.0,
        0.30, 0.25,

        0.20, 0.0,
        0.20, -0.25

    ];

    var positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)

    var vertexShaderCode = document.getElementById("vertexShaderCode").text

    var vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vertexShaderCode)
    gl.compileShader(vertexShader)


    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text


    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader,fragmentShaderCode)
    gl.compileShader(fragmentShader)

    var shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)
    gl.useProgram(shaderProgram)


    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position")

    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(aPosition)

    gl.clearColor(0.08, 0.08, 0.08, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.LINES, 0, 18)

}

function tesGreet() {
    console.log("Hi ");
}