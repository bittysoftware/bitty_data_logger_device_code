let connected = 0
bluetooth.onBluetoothConnected(function () {
    connected = 1
    starttime = input.runningTime()
})
bluetooth.onBluetoothDisconnected(function () {
    connected = 0
})
let message_type = 0
let timestamp = 0
let starttime = 0
let value1 = 0
let value2 = 0
let value3 = 0
let value4 = 0

// message type 13 = temperature data
message_type = 13

bluetooth.startUartService()
let message = pins.createBuffer(11);

function transmitData() {
    timestamp = input.runningTime() - starttime
    message.setNumber(NumberFormat.Int8LE, 0, message_type);
    message.setNumber(NumberFormat.Int32BE, 1, timestamp);
    message.setNumber(NumberFormat.Int16BE, 5, value1);
    message.setNumber(NumberFormat.Int16BE, 7, value2);
    message.setNumber(NumberFormat.Int16BE, 9, value3);
    bluetooth.uartWriteBuffer(message)
}
basic.forever(function () {
    if (connected == 1) {
        value1 = input.temperature()
        transmitData()
    }
    basic.pause(1000)
})