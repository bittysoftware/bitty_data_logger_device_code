# bitty_data_logger_device_code

## Description

Example C/C++ implementation of code which transmits "general data" items 1, 2, 3 and 4 for plotting in Bitty Data Logger. Random values are used here. Replace lines containing value1 = uBit.random(1024) with a call to a function which acquires your own data (e.g. reading from a gpio pin). Note that the example uses message types 1 - 4 for general data items 1 - 4 and each of these message types only uses the value1 field, which is 16 bits in length.

## Capture Mode
Select User Code in the Data Capture Mode section of the Bitty Data Logger Settings screen to use with this microbit code.

## Building this code

To build this code, you need an offline microbit development environment, based on Yotta. See https://lancaster-university.github.io/microbit-docs/offline-toolchains/ for details.

Copy main.cpp into the source directory of microbit-samples and config.json into the root directory.