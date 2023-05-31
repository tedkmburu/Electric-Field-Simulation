function prepareCanvas(props)
{
    props.canvas.translate(props.pos)
    props.canvas.angleMode(props.canvas.DEGREES)
    props.canvas.rotate(props.angle)
    props.canvas.fill(props.fillColor)
    props.canvas.stroke(props.strokeColor)
    props.canvas.rectMode(props.canvas.CENTER)
    props.canvas.ellipseMode(props.canvas.CENTER)
    props.canvas.imageMode(props.canvas.CENTER)
    props.canvas.textAlign(props.textAlign);
    props.canvas.textSize(props.textSize);
}

class Particle
{
    constructor(props)
    {
        this.pos = props.pos || new p5.Vector(0, 0, 0)
        this.vel = props.vel || new p5.Vector(0, 0, 0)
        this.acc = props.acc || new p5.Vector(0, 0, 0)
        
        this.netForce = props.netForce || new p5.Vector(0, 0, 0)
        this.canMove = props.canMove || false;

        this.mass = props.mass || 1
        this.charge = props.charge || 0
        this.radius = props.radius || 10
        this.fillColor = props.fillColor || "black"
        this.strokeColor = props.strokeColor || "red"

        this.canvas = props.canvas || foreGroundCanvas
        this.textAlign = props.textAlign || foreGroundCanvas.CENTER
        this.textSize = props.textSize || 12
        
    }

    move()
    {
        this.previousPosition = this.pos.copy()
        
        if (this.canMove)
        {
            this.acc = this.netForce.div(this.mass)
            this.vel.add(this.acc);
            this.pos.add(this.vel);
        }
    }
}