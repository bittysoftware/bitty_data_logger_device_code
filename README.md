# bitty_data_logger_device_code
Example microcontroller code and templates for use with Bitty Data Logger.

## Capture Modes
Note that Bitty Data Logger supports two data capture mode. 

In Auto mode, data is sampled and communicated over Bluetooth automatically by the microbit software framework known as the DAL. You need to write very little microbit code if you take this approach.

In User Code mode, you are responsible for acquiring data from within your own code and for sending it over Bluetooth in the correct format to a connected device using the Bluetooth UART service. Message formats for the different types of data which Bitty Data Logger supports are defined below.

## UART Message Formats

### General:

```
    message.setNumber(NumberFormat.Int8LE, 0, message_type);
    message.setNumber(NumberFormat.Int32BE, 1, timestamp);
    message.setNumber(NumberFormat.Int16BE, 5, value1);
    message.setNumber(NumberFormat.Int16BE, 7, value2);
    message.setNumber(NumberFormat.Int16BE, 9, value3);
```

### Message Types:

```
    1,2,3,4 : general data items 1, 2, 3 and 4 : composite 24 bit value in BE format

    10    : accelerometer: value1 = X, value2 = Y, value3 = Z

    11    : magnetometer: value1 = X, value2 = Y, value3 = Z

    12    : compass: value1 = compass bearing

    13    : temperature: value1 = temperature
```