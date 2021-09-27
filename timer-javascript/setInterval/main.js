function main() {
    console.log("main");

    /**
   * @type {HTMLCanvasElement} canvas
   */
    const canvas = document.getElementById("myCanvas");
  /**
   * @type {WebGLRenderingContext} gl
   */
    const gl = canvas.getContext("webgl");


    //let canvas = document.getElementById("myCanvas")
    console.log(canvas);

    //let gl = canvas.getContext('webgl')
    console.log(gl);

    let vertices = [
        //mau buat persegi (koordinat x, koordinat y, Red, Green , blue)
        //titik a
        -0.5, 0.5, 1.0, 0.0, 0.0,
        //titik b
        0.5, 0.5, 0.0, 1.0, 0.0,
        //titik c
        0.5, -0.5, 0.0, 0.0, 1.0,
        //titik d
        -0.5, -0.5, 0.0, 0.0, 1.0
    ]

    //memberiwarna gradias
    //--karena banyak perlu buffer, kaya linked list unuk save data-data yang akan kia gambar menggunakan shaders yang ada di GPU
    //----membuat linked list untuk simpan data vertex
    let buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    let vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition + uChange, 0.0, 1.0);
            vColor = aColor;
        }
    `;

    let fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;


    let vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vertexShaderSource)
    
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragmentShaderSource)

    gl.compileShader(vertexShader)
    gl.compileShader(fragmentShader)

    //membuat package, file .exe yang bisa di compile oleh CPU yang kemudia dikirm ke GPU untuk digambar
    let shaderProgram = gl.createProgram()

    //attach pengaturan fragment dan vertex ke file .exe
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)

    gl.linkProgram(shaderProgram) //ini menjadikan 1 package

    //kemudian kita gunakan program
    //analofgi sudah pegang kuas dan siap untuk menggambar
    gl.useProgram(shaderProgram)


    //update posisi
    //menggambar 1 per satu gambarnya
    let aPosition = gl.getAttribLocation(shaderProgram, "aPosition")
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5*Float32Array.BYTES_PER_ELEMENT,0)    
    //index sesuai dengan aPosition
    //sizenya 2 karena posisinya x dan y
    //tipe float karena tadi ada komanya
    //normalize false cari dinternet knapa
    //stride adalah ukuran rray yang dikirm (2 untuk posisi, 3 untuk warna)
    gl.enableVertexAttribArray(aPosition)

    var aColor = gl.getAttribLocation(shaderProgram, "aColor")
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5*Float32Array.BYTES_PER_ELEMENT, 2*Float32Array.BYTES_PER_ELEMENT)

    gl.enableVertexAttribArray(aColor)

    // let speedRaw = 1
    // let speed = speedRaw / 600

    let change = 0
    let uChange = gl.getUniformLocation(shaderProgram, "uChange")

    function render() {
        // if(change >= 0.5 || change <= -0.5) {
        //     speed = -speed
        // }
        // change = change + speed

        change += 0.001
        gl.uniform1f(uChange, change)


        gl.clearColor(1.0, 1.0, 1.0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)

        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
        //setTimeout(render, speed)
        //setInterval(render,1000/60)

    }
    setInterval(render,1000/60)
}