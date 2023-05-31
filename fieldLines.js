function netForceAtPoint(position) // given a vector, it will return the net force at that point as a vector
{
  let finalVector = new p5.Vector();

  // these are all the pointcharges
  charges.forEach(charge => {
      
    //F = KQ / (r^2)
    let kq = charge.charge * k;
    let r = p5.Vector.dist(position, charge.pos);

    if (r < 0.5) r = 0.5
    
    let rSquared = Math.pow(r,2);
    let force = kq / rSquared;

    let theta = p5.Vector.sub(charge.pos, position).heading();
    let forceX = force * Math.cos(theta);
    let forceY = force * Math.sin(theta);

    let forceVectors = new p5.Vector(forceX, forceY).mult(-1);

    finalVector.add(forceVectors);
  })

  return finalVector;
}



function showFieldLines()
{
    let fieldLineStartingPositions = []
    charges.forEach(charge => {
        
        let startingPositions = []
        let radius = chargeRadius;
        let numberOfLines = Math.abs(charge.charge) * 4;
        let origin = charge.pos.copy();

        let point = new p5.Vector(radius, radius);
        for (let a = 0; a < numberOfLines; a++)
        {
            let startingPosition = point.copy().add(origin)
            startingPositions.push(startingPosition);

            point.rotate((2 * Math.PI) / numberOfLines);
        } 
        fieldLineStartingPositions.push(startingPositions)
    })

    fieldLineStartingPositions.forEach(startingPositionsArray => {
        startingPositionsArray.forEach(startingPosition => {
            foreGroundCanvas.ellipse(startingPosition.x, startingPosition.y, 5, 5)

            let fieldLine = new FieldLine(startingPosition)
            fieldLine.getPoints()
            fieldLine.display()

            // console.log(fieldLine.endedInChargeIndex);
        })
    })

    // charges.forEach((charge, i) => {
    //     startingPositions.forEach(startingPosition => {
    //         foreGroundCanvas.ellipse(startingPosition.x, startingPosition.y, 5, 5)
    //     })
    // })
}



function getOriginalFieldLineStartingPositions(i)
{
    let startingPositions = []
    let charge = charges[i]
    let radius = chargeRadius;
    let times = Math.abs(charge.charge) * 4;
    let origin = charge.pos.copy();

    let point = new p5.Vector(radius, 0);
    for (let a = 0; a < times; a++)
    {
        let startingPosition = point.copy().add(origin)
        startingPositions.push(startingPosition);

        point.rotate((2 * Math.PI) / times);
    } 

    startingPositions.forEach(startingPosition => {
        foreGroundCanvas.ellipse(startingPosition.x, startingPosition.y, 5, 5)
    })

    return startingPositions
}


class FieldLine
{
    constructor(startingPosition)
    {
        this.startingPosition = startingPosition.copy()
        this.points = []

        this.endedInChargeIndex
        this.endedInChargeIndexAngle
    }

    getPoints()
    {
        this.points = []
        let point = this.startingPosition.copy()

        for (let i = 0; i < 100; i++) 
        {
            let netForce = netForceAtPoint(point)
            netForce.setMag(chargeRadius / 2)
            point.add(netForce)

            let diatanceToPoint = []
            charges.forEach(charge => {
                charge.dragging = false; 
                diatanceToPoint.push(charge.pos.copy().dist(mousePosition))
            })
        
            let closestChargeDistance = Math.min(...diatanceToPoint)
            let closestChargeIndex = diatanceToPoint.indexOf(closestChargeDistance)
            
            if (point.copy().dist(charges[closestChargeIndex].pos) < chargeRadius)
            {
                this.endedInChargeIndex = closestChargeIndex
                this.endedInChargeIndexAngle = netForce.heading()
                return
            }
            this.points.push(point.copy())
        }
    }

    display()
    {
        let canvas = foreGroundCanvas;
        canvas.push()
        canvas.beginShape();
        canvas.noFill();
            canvas.stroke(255);
            canvas.curveVertex(this.startingPosition.x, this.startingPosition.y)
            canvas.curveVertex(this.startingPosition.x, this.startingPosition.y)
            this.points.forEach(point => {
                canvas.curveVertex(point.x, point.y);
                // canvas.ellipse(point.x, point.y, 5, 5)
            })
        canvas.endShape();
        canvas.pop()
    }
}