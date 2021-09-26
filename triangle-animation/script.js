function main() {

   
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // mendefinisikan vertex
    let vertices = [
        0.0,
        0.8,
        0.0,
        0.83,
        1.0, //titik A
        -0.5,
        -0.8,
        0.0,
        0.01,
        0.26, //titik B
        0.5,
        -0.8,
        0.0,
        0.81,
        0.73, //titik C
    ];


    let positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    let vertexShaderCode = document.getElementById("vertexShaderCode").text
    let vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader,vertexShaderCode)
    gl.compileShader(vertexShader)

    let fragmentShaderCode = document.getElementById("fragmentShaderCode").text
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragmentShaderCode)
    gl.compileShader(fragmentShader)

    let shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram,vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)
    gl.useProgram(shaderProgram)


    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    let aPosition = gl.getAttribLocation(shaderProgram, "a_Position")
    let aColor = gl.getAttribLocation(shaderProgram, "a_Color")
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5*Float32Array.BYTES_PER_ELEMENT, 0)
    gl.vertexAttribPointer(aColor, 2, gl.FLOAT, false, 1*Float32Array.BYTES_PER_ELEMENT, 2*Float32Array.BYTES_PER_ELEMENT)

    gl.enableVertexAttribArray(aPosition)
    gl.enableVertexAttribArray(aColor)

    gl.viewport(0, 0, canvas.width, canvas.height)

    let primitive = gl.TRIANGLES
    let offset = 0
    let count = 3

    let dx = 0;
    let dy = 0;
    let dz = 0;
    let udx = gl.getUniformLocation(shaderProgram, "dx");
    let udy = gl.getUniformLocation(shaderProgram, "dy");
    let udz = gl.getUniformLocation(shaderProgram, "dz");


    let freeze = false
    function onMouseClick(e) {
        freeze = !freeze
    }
    document.addEventListener("click", onMouseClick, false)

    function onKeyDown(e) {
        if(e.keyCode == 32) freeze = true
    }
    document.addEventListener("keydown", onKeyDown, false)

    function onKeyUp(e) {
        if(e.keyCode == 32) freeze = false
    }
    document.addEventListener("keyup", onKeyUp, false)

    function render() {
        if(!freeze) {
            dx -= 0.001;
            dy += 0.001;
            dz += 0.001;
        }
        gl.uniform1f(udx,dx)
        gl.uniform1f(udy,dy)
        gl.uniform1f(udz,dz)

        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(primitive, offset, count)
        requestAnimationFrame(render)

    }

    requestAnimationFrame(render)

}


main()