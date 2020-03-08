#include "MicroBit.h"
#include "MicroBitUARTService.h"

MicroBit uBit;
MicroBitUARTService *uart;

int connected = 0;
uint8_t message_type = 0;
uint32_t timestamp = 0;
uint32_t starttime = 0;
uint16_t value1 = 0;
uint16_t value2 = 0;
uint16_t value3 = 0;
uint16_t value4 = 0;
uint8_t message [] = {0,0,0,0,0,0,0,0,0,0,0};

/*
 * Converts an int value into an array of uint8_t with a specified length, collectively representing the int in big endian format.
 */
void asByteArray(int number, int num_bytes, uint8_t* result) {
    int inx = 0;
    int shift_bits = (num_bytes - 1) * 8;

    while (inx < num_bytes) {
        result[inx] = (number >> shift_bits) & 0xFF;
        inx++;
        shift_bits = shift_bits - 8;
    }
    result[num_bytes - 1] = number & 0xFF;
}

void transmitData() {
    timestamp = uBit.systemTime();
    message[0] = message_type;
    asByteArray(timestamp, 4, &message[1]);
    asByteArray(value1, 2, &message[5]);
    uart->send(message,11);
}
void onConnected(MicroBitEvent)
{
    uBit.display.scroll("C");
    connected = 1;
    printf("connected\n");
}

void onDisconnected(MicroBitEvent)
{
    uBit.display.scroll("D");
    connected = 0;
}

int main()
{
    // Initialise the micro:bit runtime.
    uBit.init();

    uBit.messageBus.listen(MICROBIT_ID_BLE, MICROBIT_BLE_EVT_CONNECTED, onConnected);
    uBit.messageBus.listen(MICROBIT_ID_BLE, MICROBIT_BLE_EVT_DISCONNECTED, onDisconnected);

    uart = new MicroBitUARTService(*uBit.ble, 32, 32);
    uBit.display.scroll("bdl");

    // random numbers are generated solely for demonstration purposes so you may not need this
    uBit.seedRandom(); 

    while (true) {
        if (connected == 1) {
            message_type = 1;
            // random numbers used solely for demonstration purposes. Acquire your data here as required.
            value1 = uBit.random(1024);
            transmitData();
            uBit.sleep(200);
            message_type = 2;
            // random numbers used solely for demonstration purposes. Acquire your data here as required.
            value1 = uBit.random(1024);
            transmitData();
            uBit.sleep(200);
            message_type = 3;
            // random numbers used solely for demonstration purposes. Acquire your data here as required.
            value1 = uBit.random(1024);
            transmitData();
            uBit.sleep(200);
            message_type = 4;
            // random numbers used solely for demonstration purposes. Acquire your data here as required.
            value1 = uBit.random(1024);
            transmitData();
        }
        uBit.sleep(1000);
  }

    // If main exits, there may still be other fibers running or registered event handlers etc.
    // Simply release this fiber, which will mean we enter the scheduler. Worse case, we then
    // sit in the idle task forever, in a power efficient sleep.
    release_fiber();
}
