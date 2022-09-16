
//cartoon object
let cartoon = {
    canvas: undefined,
    canvasContext: undefined,
    rectanglePostion: 0
}
//global counters
var cloudCounter = 1
var leaveCounter = 0

//the start function
cartoon.start = function () {
    cartoon.canvas = document.getElementById('mycanvas')
    cartoon.canvasContext = cartoon.canvas.getContext("2d");
    cartoon.mainLoop();
}
//Manipulates the DOM with the start function
document.addEventListener('DOMContentLoaded', cartoon.start);

//clears the canvas
cartoon.clearCanvas = function () {
    cartoon.canvasContext.clearRect(0, 0, cartoon.canvas.width, cartoon.canvas.height);
};
//mainLoop that is infinite
cartoon.mainLoop = function () {
    cartoon.clearCanvas();
    cartoon.update();
    cartoon.draw();
    window.setTimeout(cartoon.mainLoop, 1000 / 100);
};
//update function that moves the clouds and trees
cartoon.update = function () {

    if (leaveCounter > 0.8) {
        leaveCounter = 0
    }

    leaveCounter += .009

    cartoon.rectanglePosition = cloudCounter

    cloudCounter++

    if (cloudCounter == 800) {
        cloudCounter = 1
    }
};
//function that draws a cloud
cartoon.drawCloud = (x, y) => {
    cartoon.canvasContext.beginPath();
    cartoon.canvasContext.lineWidth = 4;
    cartoon.canvasContext.arc(x, y, 30, Math.PI * 0.5, Math.PI * 1.5);
    cartoon.canvasContext.arc(x + 35, y - 30, 35, Math.PI * 1, Math.PI * 1.85);
    cartoon.canvasContext.arc(x + 76, y - 22, 25, Math.PI * 1.37, Math.PI * 1.91);
    cartoon.canvasContext.arc(x + 100, y, 30, Math.PI * 1.5, Math.PI * 0.5);
    cartoon.canvasContext.moveTo(x + 100, y + 30);
    cartoon.canvasContext.lineTo(x, y + 30);
    cartoon.canvasContext.strokeStyle = 'black';
    cartoon.canvasContext.stroke();
    cartoon.canvasContext.fillStyle = 'white';
    cartoon.canvasContext.fill()
}
//function that draws a sun
cartoon.drawSun = (x, y) => {
    cartoon.canvasContext.beginPath();
    cartoon.canvasContext.moveTo(x + 16, y);
    cartoon.canvasContext.arc(x, y, 60, 0, 10);

    cartoon.canvasContext.shadowBlur = 20;
    cartoon.canvasContext.fillStyle = 'yellow';
    cartoon.canvasContext.fill();
}
//function that draws a tree
cartoon.drawTree = function (startX, startY, len, angle, branchWidth, color1, color2) {

    cartoon.canvasContext.beginPath();
    cartoon.canvasContext.save();
    cartoon.canvasContext.strokeStyle = color1
    cartoon.canvasContext.fillStyle = color2
    cartoon.canvasContext.lineWidth = branchWidth
    cartoon.canvasContext.translate(startX, startY)
    cartoon.canvasContext.rotate(angle * Math.PI / 180)
    cartoon.canvasContext.moveTo(0, 0)
    cartoon.canvasContext.lineTo(0, -len)
    cartoon.canvasContext.stroke()

    if (len < 8) {

        cartoon.canvasContext.beginPath()
        cartoon.canvasContext.arc(0, -len, 10, 0, Math.PI / 2)
        cartoon.canvasContext.fill()
        cartoon.canvasContext.restore()
        return
    }

    cartoon.drawTree(0, -len, len * 0.75, angle + 7, branchWidth * 0.5)
    cartoon.drawTree(0, -len, len * 0.75, angle - 7, branchWidth * 0.5)

    cartoon.canvasContext.restore()

}
//function that draws all the trees using a loop
cartoon.drawMoreTrees = function () {
    //an array of objects to control the position of each tree
    let Trees = [{
        xAxis: 90,
        yAxis: 380
    }, {
        xAxis: 200,
        yAxis: 455
    }, {
        xAxis: 100,
        yAxis: 570
    }]
    //for loop to render the trees
    for (let i = 0; i < Trees.length; i++) {

        cartoon.drawTree(Trees[i].xAxis, Trees[i].yAxis, 50, leaveCounter, 10, "brown", "green")

    }
}
//function that draws all the clouds using a loop
cartoon.drawMoreClouds = () => {
    //an array of objects to hold data of the position of each cloud
    let Clouds = [{
        xAxis: 0,
        yAxis: 100
    }, {
        xAxis: 200,
        yAxis: 180
    }, {
        xAxis: -200,
        yAxis: 70
    }, {
        xAxis: -300,
        yAxis: 250
    }, {
        xAxis: -450,
        yAxis: 100
    }, {
        xAxis: -650,
        yAxis: 190
    },]

    //for loop to render in the clouds
    for (let i = 0; i < Clouds.length; i++) {

        cartoon.drawCloud(cartoon.rectanglePosition + Clouds[i].xAxis, Clouds[i].yAxis)

    }

}
//function that draws the house
cartoon.drawHouse = function () {
    let ctx = cartoon.canvasContext


    ctx.fillStyle = 'brown';
    ctx.fillRect(300, 260, 150, 110)
    ctx.fillStyle = 'black';
    ctx.fillRect(355, 310, 40, 60)

    // Draws a triangle for the roof
    let height = 120 * Math.cos(Math.PI / 6);

    ctx.beginPath();
    ctx.moveTo(280, 280);
    ctx.lineTo(470, 280);
    ctx.lineTo(375, 300 - height);
    ctx.closePath();

    // the outline
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#666666';
    ctx.stroke();

    // the fill color
    ctx.fillStyle = "#FFCC00";
    ctx.fill();

    cartoon.canvasContext.beginPath();
    cartoon.canvasContext.moveTo(500 + 700, 50);
    cartoon.canvasContext.arc(387, 345, 4, 0, 10);

    cartoon.canvasContext.shadowBlur = 20;
    cartoon.canvasContext.fillStyle = 'yellow';
    cartoon.canvasContext.fill();




}
//function that draws the river
cartoon.drawRiver = function () {
    let ctx = cartoon.canvasContext
    ctx.beginPath();

    ctx.moveTo(600, 300);
    ctx.bezierCurveTo(600, 600, 1200, 600, 700, 650);
    cartoon.canvasContext.strokeStyle = '#38afcd';
    ctx.lineWidth = 20
    ctx.stroke();
}
//function that draws the mountain
cartoon.drawMountain = function () {
    let ctx = cartoon.canvasContext
    let height = 120 * Math.cos(Math.PI / 6);

    ctx.beginPath();
    ctx.moveTo(510, 300);
    ctx.lineTo(690, 300);
    ctx.lineTo(600, 250 - height);
    ctx.closePath();

    // the outline
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'grey';
    ctx.stroke();

    // the fill color
    ctx.fillStyle = "grey";
    ctx.fill();
    //draws the snowy top
    ctx.beginPath();
    ctx.moveTo(600 - 30, 295 - 100);
    ctx.lineTo(600 - 10, 295 - 80);
    ctx.lineTo(600 + 7, 295 - 105);
    ctx.lineTo(600 + 20, 295 - 90);
    ctx.lineTo(600 + 24, 295 - 110);
    ctx.lineTo(600, 295 - 150);
    ctx.fillStyle = '#fffafa';
    ctx.fill();
}
//function that draws the background
cartoon.drawBackground = () => {
    let ctx = cartoon.canvasContext
    let lg = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
    lg.addColorStop(0, "#00BFFF");
    lg.addColorStop(0.5, "white");
    lg.addColorStop(0.5, "#55DD00");
    lg.addColorStop(1, "white");
    cartoon.canvasContext.fillStyle = lg;
    cartoon.canvasContext.fillRect(0, 0, cartoon.canvas.width, cartoon.canvas.height);


    //text written in the canvas
    ctx.font = "40px Pacifico";
    ctx.fillStyle = "#212529";
    ctx.textAlign = "center";
    ctx.fillText("A Peaceful Place", 380,550);
}
//the main draw function
cartoon.draw = function () {

    cartoon.drawBackground()

    cartoon.drawSun(100, 100)

    cartoon.drawMoreClouds()

    cartoon.drawHouse()

    cartoon.drawMoreTrees()

    cartoon.drawRiver()

    cartoon.drawMountain()




};

