const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")

// c.fillStyle = "rgba(255,180,134)"
// c.fillRect(100,100,100,100)

// // line
// c.beginPath();
// c.moveTo(100, 400);
// c.lineTo(200, 300);
// c.lineTo(400, 300)
// c.strokeStyle = "red"
// c.stroke();



// c.beginPath()

// c.moveTo(400, 100);
// c.lineTo(300, 100);
// c.lineTo(400, 200);
// c.lineTo(400,100);
// c.strokeStyle = "blue"
// c.stroke();

// // Arc (start angle, what angle to start drawing arc, endAngle, how long should we draw it?)
// c.beginPath();
// c.arc(300, 600, 30, 0, Math.PI * 2)
// c.strokeStyle = "green"
// c.stroke();

// for (i = 0; i < 10; i++) {
//     let x = Math.random() * 1000;
//     let y = Math.random() * 1000;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2)
//     c.strokeStyle = "green"
//     c.stroke();
// }

// c.beginPath();
// c.arc(200, 200, 30, 0, Math.PI * 2)
// c.strokeStyle = "blue"
// c.stroke();

// function makeCircle {
//     let x = 200;
//     let y = 100;
//     let dx = 5;
//     let dy = 4;
//     let radius = 30;

//     c.beginPath

// }


// for (let i = 0; i < 10; i++) {
//     circles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         dx: Math.random() * 10 - 5
//     })
// }

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 50;
let minRadius = 2;

let colorArray = [
    '#580C82',
    '#8F30A1',
    '#FE4773',
    '#F6D68D',
    '#46B3A5',
    '#2E6D92'
]

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse)
})


class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.radius = radius
        this.minRadius = radius
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    }

    draw = function () {
        c.beginPath()

        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c.fill()

        // c.strokeStyle = "blue"
        // c.lineWidth = 2
        // c.stroke()


    }

    update = function () {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy

        //interactivity

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1
            }
        } else if (this.radius > this.minRadius){
            this.radius -= 1;
        }


        this.draw()
    }


}


let circleArray = [];

for (let i = 0; i < 1000; i++) {

    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let dx = (Math.random() * - 0.5) * 4;
    let dy = (Math.random() * - 0.5) * 4;

    circleArray.push(new Circle(x, y, dx, dy, radius))

}

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.width);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }


}

animate();
