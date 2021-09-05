/**
* makecode NAU7802 ADC Package.
* Based on HX711 package from https://github.com/daferdur/pxt-myhx711
*/

//% weight=20 color=#b77ff0 icon="\uf017" block="NAU7802"
namespace NAU7802 {


//% blockId="NAU7802_UP" block="power up"
//% weight=90 blockGap=8
export function power_up() {
    
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
    
}