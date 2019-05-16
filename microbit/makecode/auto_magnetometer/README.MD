# Magnetometer Data - Auto Capture Mode

This script allows Bitty Data Logger to capture magnetometer data in auto capture mode. All magnetometer sampling and Bluetooth communication is handled by the Bluetooth magnetometer service.

If you need to intervene in the capture process and manipulate data before sending it over Bluetooth, you should select user code capture mode in the Bitty Data Logger Settings screen and use the bdl_uart_magnetometer.js sample as the basis for your code.