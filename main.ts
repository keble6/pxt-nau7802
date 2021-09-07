/**
* makecode NAU7802 ADC Package.
* Based on HX711 package from https://github.com/daferdur/pxt-myhx711
*/

//% weight=20 color=#b77ff0 icon="\uf017" block="NAU7802"
namespace NAU7802 {


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
    export function power_down() {
        
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
    export function read_average(times: number): number {
       
    }

    //% blockId="NAU7802_READ" block="read"
    //% weight=80 blockGap=8
    export function read(): number {
    
       
    }

    //% blockId="NAU7802_BEGIN" block="begin"
    //% weight=80 blockGap=8
    export function begin() {
    
    }
    
    function setBit(bitNumber: number, registerAddress: number) {
    // line 360
        let value = getRegister(registerAddress)
        value |= (1 << bitNumber)
        return setRegister(registerAddress, value)
    }
    function getRegister (registerAddress: number) {
        // line 384
        pins.i2cWriteNumber(deviceAddress,registerAddress,
            NumberFormat.UInt8BE,false)
        return pins.i2cReadNumber(deviceAddress, NumberFormat.UInt8BE, false)
    }
}
