const k = 89900; // k = 8.99 * Math.pow(10, -9) adjusted because all charges are in micro coulombs;

const gridSize = 25;
const chargeDiameter = 40; // diameter of a point charge
const chargeRadius = chargeDiameter / 2;
const testChargeDiameter = 10;
const testChargeRadius = testChargeDiameter / 2;
const testChargeCharge = 0.000005; //q = 5 micro coulombs;
const fieldLinesPerCoulomb = 4;
const equiLinesAccuracy = 0.125; 
const equiLinesLimit = 4500;
const voltageAccuracy = 30;

const positiveChargeColor = "rgba(210, 41, 45, 1)";
const negativeChargeColor = "rgba(23, 97, 176, 1)";
const neutralChargeColor = "rgbaa(85, 85, 85, 0.75)";

const fieldVectorScale = 500; // this constant scales the size of the arrows in the field vector mode. The arrows get smaller as the constant gets bigger

const defaultFont = "Times New Roman";
const buttonFont = "Arial";

let charges = []


let showFieldLinesBoolean = true; 
let showFieldVectorsBoolean = false;
let showEquipotentialLinesBoolean = false;
let showVoltageBoolean = false;
let showGridBoolean = false;
let fullscreenBoolean = false;
let showVoltageValueBoolean = false;
let testChargeModeBoolean = false;

let mousePosition;