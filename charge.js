function createCharge(charge, pos)
{
    charges.push(new Charge({
        charge: charge,
        pos: pos
    }))
}

class Charge extends Particle
{
    constructor(props)
    {
        super(props)

        this.textSize = 16;
        this.selected = false; 
        this.dragging = false; 
        this.fieldLinesEndingHere = 0
    }

    display()
    {
        let canvas = foreGroundCanvas;
        canvas.push()
            if (this.charge > 0) this.fillColor = positiveChargeColor;
            if (this.charge < 0) this.fillColor = negativeChargeColor;
            if (this.charge == 0) this.fillColor = neutralChargeColor;

            if (this.selected) this.strokeColor = 255;
            if (!this.selected) this.strokeColor = 0;
            prepareCanvas(this)
            canvas.ellipse(0, 0, chargeDiameter * this.mass, chargeDiameter * this.mass)
            
            canvas.fill(255)
            canvas.noStroke()
            let chargeToText = (this.charge > 0) ? "+" + this.charge : this.charge
            canvas.text(chargeToText, 0, 5)
        canvas.pop()

        this.move()
    }

    select()
    {
        this.selected = true;
    }
}