const background = canvas => {

    canvas.setup = function()  // This function only runs once when the page first loads. 
    {
      canvas.createCanvas(innerWidth, innerHeight); // creates the <canvas> that everything runs on.
      backgroundCanvas = canvas;
      canvas.angleMode(canvas.RADIANS);
      canvas.frameRate(60);  // the simulation will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can
    }
  
    canvas.draw = function() // this function runs every frame. Everything on the background canvas starts here.
    {  
      canvas.background(0); // sets the background color to black
    }
  
    canvas.windowResized = function() // inbuilt p5 function. runs everytime the window is resized
    {
      canvas.resizeCanvas(innerWidth, innerHeight); // resizes the canvas to fit the new window size
    }
}





const foreGround = canvas => {

    canvas.preload = function()
    {
        
    }

    canvas.setup = function()  // This function only runs once when the page first loads. 
    {
        canvas.createCanvas(innerWidth, innerHeight); // creates the <canvas> that everything runs on.
        foreGroundCanvas = canvas;
        canvas.angleMode(canvas.RADIANS);
        canvas.frameRate(60);  // the simulation will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can

        createCharge(4, new p5.Vector(200, 300))
        createCharge(-4, new p5.Vector(600, 350))
        // createCharge(Math.floor(Math.random() * 11) - 5, new p5.Vector(Math.floor(Math.random() * innerWidth), Math.floor(Math.random() * innerHeight)))
        // createCharge(Math.floor(Math.random() * 11) - 5, new p5.Vector(Math.floor(Math.random() * innerWidth), Math.floor(Math.random() * innerHeight)))
        // createCharge(Math.floor(Math.random() * 11) - 5, new p5.Vector(Math.floor(Math.random() * innerWidth), Math.floor(Math.random() * innerHeight)))
        // createCharge(2, new p5.Vector(Math.floor(Math.random() * innerWidth), Math.floor(Math.random() * innerHeight)))
        // createCharge(2, new p5.Vector(Math.floor(Math.random() * innerWidth), Math.floor(Math.random() * innerHeight)))
        // createCharge(2, new p5.Vector(Math.floor(Math.random() * innerWidth), Math.floor(Math.random() * innerHeight)))
        // createCharge(2, new p5.Vector(200, 400))
        // createCharge(2, new p5.Vector(400, 200))
        // createCharge(2, new p5.Vector(400, 400))

        // charges.push(new Charge({
        //     charge: 2,
        //     pos: new p5.Vector(200, 100)
        // }))
    }



    canvas.draw = function() // this function runs every frame. Everything on the foreground canvas starts here.
    {  
        canvas.clear(); // clears the canvas so that it's transparent
        mousePosition = new p5.Vector(canvas.mouseX, canvas.mouseY, 0)

        // displayGrid()

        if (showFieldLinesBoolean) showFieldLines();

        charges.forEach(charge => {
            charge.display()
        })
    //     console.log(mousePosition);
    }

    canvas.mouseClicked = function() { whenMouseClicked(); } // inbuilt p5 function. runs everytime any mouse button is clicked
    canvas.mouseDragged = function() { whenMouseDragged(); } // inbuilt p5 function. runs everytime the mosue is dragged (clicked down and moving)
    canvas.doubleClicked = function() { whenDoubleClicked(); } // inbuilt p5 function. runs everytime the mouse is double clicked
    canvas.keyPressed = function() { whenKeyPressed(); } // inbuilt p5 function. runs everytime any keyboard button is clicked
    canvas.mouseMoved = function() { whenMouseMoved(); } // inbuilt p5 function. runs everytime the mouse moves
    canvas.mouseReleased = function() { mouseReleased() }

    canvas.windowResized = function()  // inbuilt p5 function. runs everytime the window is resized
    {
        canvas.resizeCanvas(innerWidth, innerHeight); // resize the canvas to fit the new window
    }
}






new p5(background); // creates the background instance of p5
new p5(foreGround); // creates the foreground instance of p5

function displayGrid() // displays background grid
{
  let canvas = foreGroundCanvas;
  canvas.push();
  canvas.stroke("rgba(255,255,255,0.25)"); // gray color for the grid
    for (let x = 0; x <= innerWidth - sidePanelWidth; x+= gridSize)
    {
      canvas.line(x, 0, x, innerHeight);
    }
    for (let y = 0; y < innerHeight; y+= gridSize)
    {
      canvas.line(0, y, innerWidth, y);
    }
  canvas.pop();
}

function displayFrameRate() // displays frame rate at the top left of the screen
{
  let canvas = foreGroundCanvas;
  canvas.push();
    canvas.noStroke();
    canvas.fill(100);
    canvas.textSize(20);
    canvas.text(Math.round(canvas.frameRate()), 10, 25);
  canvas.pop();
}

function displayTrashCan()
{
  let canvas = foreGroundCanvas;
  canvas.image(icons[4], 20, innerHeight - 80, 60, 60);   
}


