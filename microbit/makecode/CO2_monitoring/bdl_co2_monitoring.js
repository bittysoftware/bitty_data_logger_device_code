bluetooth.onBluetoothConnected(function () {
    connected = 1
})
bluetooth.onBluetoothDisconnected(function () {
    connected = 0
})
function transmitSensorData () {
    timestamp = input.runningTime() - starttime
    message.setNumber(NumberFormat.Int8LE, 0, message_type);
    message.setNumber(NumberFormat.Int32BE, 1, timestamp);
    message.setNumber(NumberFormat.Int16BE, 5, sensor_reading);
    message.setNumber(NumberFormat.Int16BE, 7, 0);
    message.setNumber(NumberFormat.Int16BE, 9, 0);
    basic.showNumber(sensor_reading)
    bluetooth.uartWriteBuffer(message)
}
let starttime = input.runningTime()
let sensor_reading = 0
let connected = 0
let timestamp = 0
let message_type = 1
bluetooth.startUartService()
let message = pins.createBuffer(11);
connected == 0
serial.redirect(
SerialPin.P0,
SerialPin.P1,
BaudRate.BaudRate9600
)
COZIR.setupCozir()
basic.forever(function () {
    if (connected == 1) {
        sensor_reading = COZIR.Co2()
        transmitSensorData()
    }
    basic.pause(1000)
})
