/**
* makecode NAU7802 ADC Package.
* Based on HX711 package from https://github.com/daferdur/pxt-myhx711
*/

//% weight=20 color=#b77ff0 icon="\uf017" block="NAU7802"
namespace NAU7802 {
    let _zeroOffset:any = 1
let _calibrationFactor:any = 1
let LDO_3V3 = 4
let GAIN_128 = 7
let CHANNEL_2 = 1
// I2C addresses
let deviceAddress = 42
let PU_CTRL = 0
let CTRL1 = 1
let CTRL2 = 2
let OCAL1_B2 = 3
let OCAL1_B1 = 4
let OCAL1_B0 = 5
let GCAL1_B3 = 6
let GCAL1_B2 = 7
let GCAL1_B1 = 8
let GCAL1_B0 = 9
let OCAL2_B2 = 10
let OCAL2_B1 = 11
let OCAL2_B0 = 12
let GCAL2_B3 = 13
let GCAL2_B2 = 14
let GCAL2_B1 = 15
let GCAL2_B0 = 16
let I2C_Control = 17
let ADCO_B2 = 18
let ADCO_B1 = 19
let ADCO_B0 = 20
// shared with OTP_B1
let ADC = 21
let OTP_B1 = 21
let OTP_B0 = 22
let PGA_PWR = 28
let DEVICE_REV = 31
//register bits
let PU_CTRL_RR = 0
let PU_CTRL_PUD = 1
let PU_CTRL_PUA = 2
let PU_CTRL_PUR = 3
let PU_CTRL_CS = 4
let PU_CTRL_CR = 5
let PU_CTRL_OSCS = 6
let PU_CTRL_AVDDS = 7
let CTRL1_GAIN = 2
let CTRL1_VLDO = 5
let CTRL1_CRP = 7
let CTRL2_CALMOD = 1
let CTRL2_CALS = 2
let CTRL2_CRS = 6
let CTRL2_CAL_ERROR = 3
let CTRL2_CHS = 7
let PGA_PWR_PGA_CURR = 0
let PGA_PWR_ADC_CURR = 2
let PGA_CHIP_DIS = 0
let PGA_INV = 3
let PGA_PWR_PGA_CAP_EN = 7
let SPS_10 = 0
let CHANNEL_12 = 0
// status codes
let CAL_FAILURE = 2
let CAL_IN_PROGRESS = 1
let CAL_SUCCESS = 0

    //% blockId="NAU7802_UP" block="power up"
    //% weight=90 blockGap=8
    export function powerUp() {
        //line 164 in arduino code
        setBit(PU_CTRL_PUD, PU_CTRL) //power up digital
        setBit(PU_CTRL_PUA, PU_CTRL) //power up analog
        let result = getRegister(PU_CTRL)
        let counter = 0
        while (true) {
            if (getBit(PU_CTRL_PUR, PU_CTRL) == 1) { //read ready bit
                break
            }
            basic.pause(1)
            counter += 1
            if (counter > 100) {
                return false
            }
        }
        return true
    }

    //% blockId="NAU7802_DOWN" block="power down"
    //% weight=90 blockGap=8
    export function powerDown() {
        // line 183
        clearBit(PU_CTRL_PUD, PU_CTRL)
        return clearBit(PU_CTRL_PUA, PU_CTRL)
    }

    //% blockId="NAU7802_SET_OFFSET" block="set offset %offset"
    //% weight=80 blockGap=8
    export function set_offset(offset: number) {
    
    }

    //% blockId="NAU7802_GET_OFFSET" block="get offset"
    //% weight=80 blockGap=8
    export function get_offset(): number {

    }

    //% blockId="NAU7802_SET_SCALE" block="set scale %scale"
    //% weight=80 blockGap=8
    export function set_scale(scale: number) {
      SCALE = scale
    }

    //% blockId="NAU7802_GET_SCALE" block="get scale"
    //% weight=80 blockGap=8
    export function get_scale(): number {
      return SCALE
    }

    //% blockId="NAU7802_TARE" block="tare %times"
    //% weight=80 blockGap=8
    export function tare(times: number) {
    
    }

    //% blockId="NAU7802_GET_UNITS" block="get N averaged final scaled value %times"
    //% weight=80 blockGap=8
    export function get_units(times: number): number {
      
    }

    //% blockId="NAU7802_GET_VALUE" block="get N averaged offsetted data %times"
    //% weight=80 blockGap=8
    export function get_value(times: number): number {
       
    }

    //% blockId="NAU7802_READ_AVERAGE" block="read N averaged raw data %times"
    //% weight=80 blockGap=8
    export function getAverage(averageAmount: number): number {
       // line 269
        let total = 0
        let samplesAquired = 0
        let startTime = input.runningTime()
        while (true) {
            if (available() == true) {
                total += getReading()
                samplesAquired += 1
                if (samplesAquired == averageAmount) {
                    break;
                }
            } else if (input.runningTime() - startTime > 1000) {
                return 0
            }
            basic.pause(1) 
        }
        total /= averageAmount
        return total
    }

    //% blockId="NAU7802_READ" block="read"
    //% weight=80 blockGap=8
    export function getReading(): number {
        // Send register address
        pins.i2cWriteNumber(deviceAddress, ADCO_B2, NumberFormat.UInt8BE,false)
        let valueRaw = pins.i2cReadNumber(deviceAddress, NumberFormat.UInt8BE, false) << 16
        valueRaw |= pins.i2cReadNumber(deviceAddress, NumberFormat.UInt8BE, false) << 8
        valueRaw |= pins.i2cReadNumber(deviceAddress, NumberFormat.UInt8BE, false)
        let valueShifted = valueRaw << 8
        return valueShifted >> 8
    }

    //% blockId="NAU7802_BEGIN" block="begin"
    //% weight=80 blockGap=8
    export function begin() {
        if (isConnected() == false) {
            if (isConnected() == false) { //2nd try
                return false
        }
    }
    let result = true
    result = result && reset()
    //serial.writeLine("init1 =" + result)
    result = result && powerUp()
    //serial.writeLine("init2 =" + result)
    result = result && setLDO(LDO_3V3)
    //serial.writeLine("init3 =" + result)
    result = result && setGain(GAIN_128)
    //serial.writeLine("init4 =" + result)
    result = result && setSampleRate(SPS_10)
    //serial.writeLine("init5 =" + result)
    result = result && setRegister(ADC, 0x30)
    //serial.writeLine("init6 =" + result)
    result = result && setBit(PGA_PWR_PGA_CAP_EN, PGA_PWR)
    //serial.writeLine("init7 =" + result)
    result = result && calibrateAFE()
    //serial.writeLine("init8 =" + result)
    return result
   }
    
    function setBit(bitNumber: number, registerAddress: number) {
    // line 360
        let value = getRegister(registerAddress)
        value |= (1 << bitNumber)
        return setRegister(registerAddress, value)
    }
    function setRegister(registerAddress: number, value: number) {
    // line 401
        let buf = pins.createBuffer(2)
        buf[0] = registerAddress
        buf[1] = value
        pins.i2cWriteBuffer(deviceAddress, buf)
        return true
    }
    function getBit(bitNumber: number, registerAddress: number) {
    // line 376
        let value = getRegister(registerAddress)
        value &= (1 << bitNumber)
        value = value >>> bitNumber // added because original returns a number, not a boolean!
        return value
}
    function getRegister (registerAddress: number) {
        // line 384
        pins.i2cWriteNumber(deviceAddress,registerAddress,
            NumberFormat.UInt8BE,false)
        return pins.i2cReadNumber(deviceAddress, NumberFormat.UInt8BE, false)
    }
}
