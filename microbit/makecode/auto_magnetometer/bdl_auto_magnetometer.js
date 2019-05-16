let connected = 0
bluetooth.onBluetoothConnected(function () {
    connected = 1
    basic.showString("C")
})
bluetooth.onBluetoothDisconnected(function () {
    connected = 0
    basic.showString("D")
})
bluetooth.startMagnetometerService();
