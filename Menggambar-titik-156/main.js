function main() {
    
    //untuk mendapatkan canvas di html,  sebagai media untuk menggambar
    var canvas = document.getElementById("myCanvas");

    //menyiapkan tools untu nggambar misal peesil, krayon, dll
    var context = canvas.getContext("webgl");

    //ini definisi titik
    var vertexShaderCode = `
    void main() {
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 10.0;
    }
    `;

    var vertexShader = context.createShader(context.VERTEX_SHADER);
    context.shaderSource(vertexShader, vertexShaderCode);
    context.compileShader(vertexShader);
    
    //ini definisi fragment , warna
    // rgba, disini alphanya kalau 1 berati terlihat
    var fragmentShaderCode = `
    void main() {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); 
    }
    `;

    var fragmentShader = context.createShader(context.FRAGMENT_SHADER);
    context.shaderSource(fragmentShader, fragmentShaderCode);
    context.compileShader(fragmentShader);


    //vertex shader dan fragment shader akan dijadikan 1 package agar bisa tampil, caranya dengan membuat program
    var shaderProgram = context.createProgram();
    //di attach untuk menggabungkan
    context.attachShader(shaderProgram, vertexShader);
    context.attachShader(shaderProgram, fragmentShader);
    //selanjutnya di link
    context.linkProgram(shaderProgram);
    
    context.useProgram(shaderProgram); //setelah ini sudh siap di compile

    //kertas yang akan digambar harus bersih dulu, jadi gambar sebelumnya di clear dulu
    context.clearColor(0.0, 0.0, 0.0,1.0);  //ini definisi background
    context.clear(context.COLOR_BUFFER_BIT);

    //mulai menggambar
    context.drawArrays(context.POINTS, 0, 1);



}