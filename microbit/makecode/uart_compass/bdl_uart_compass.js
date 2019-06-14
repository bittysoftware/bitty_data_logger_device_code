let value4 = 0
let starttime = 0
let connected = 0
bluetooth.onBluetoothConnected(function () {
    connected = 1
    starttime = input.runningTime()
})
bluetooth.onBluetoothDisconnected(function () {
    connected = 0
})

function transmitData2() {
    timestamp = input.runningTime() - starttime
    message.setNumber(NumberFormat.Int8LE, 0, message_type);
    message.setNumber(NumberFormat.Int32BE, 1, timestamp);
    message.setNumber(NumberFormat.Int16BE, 5, value1);
    message.setNumber(NumberFormat.Int16BE, 7, value2);
    message.setNumber(NumberFormat.Int16BE, 9, value3);
    bluetooth.uartWriteBuffer(message)
}
input.onButtonPressed(Button.A, function () {
    input.calibrateCompass()
})
let message_type = 0
let timestamp = 0
let value1 = 0
let value2 = 0
let value3 = 0
value4 = 0
// message type 12 = compass data
message_type = 12
bluetooth.startUartService()
let message = pins.createBuffer(11);
basic.forever(function () {
    if (connected == 1) {
        value1 = input.compassHeading()
        transmitData2()
    }
    basic.pause(100)
})