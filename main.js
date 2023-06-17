noseX = 0;
noseY = 0;
rightWrist = 0;
leftWrist = 0;
difference = 0;

function preload() {

}

function setup() {
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.position(150, 130);
    canvas = createCanvas(400, 400);
    canvas.position(800, 175);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    background("#87CEEB");
    document.getElementById("shape_size").innerHTML = "Width and height of square will be " + difference + " px";
    fill('#346beb'); //shape color
    stroke('#050505'); //border color
    square(noseX, noseY, difference); //creates square in order: x,y,size
}

function modelLoaded() {
    console.log("poseNet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("X of nose is " + noseX + " and Y of nose is " + noseY);

        leftWrist = results[0].pose.leftWrist.x;
        rightWrist = results[0].pose.rightWrist.x;
        difference = Math.floor(leftWrist - rightWrist);
        console.log("Left Wrist: " + leftWrist + " Right Wrist: " + rightWrist);
    }
}