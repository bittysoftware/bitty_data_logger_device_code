# Temperature Data - Auto Capture Mode

This script allows Bitty Data Logger to capture temperature data in auto capture mode. All temperature sampling and Bluetooth communication is handled by the Bluetooth temperature service.

If you need to intervene in the capture process and manipulate data before sending it over Bluetooth, you should select user code capture mode in the Bitty Data Logger Settings screen and use the bdl_uart_temperature.js sample as the basis for your code.