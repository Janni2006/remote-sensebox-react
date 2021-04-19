import * as Blockly from 'blockly/core';

Blockly.Arduino.serial_begin = function () {
    Blockly.Arduino.setupCode_['serial_begin'] = 'Serial.begin(9600);\n';
    var code = '';
    return code;
};

Blockly.Arduino.serial_println = function () {
    var printSerial = Blockly.Arduino.valueToCode(this, 'printSerial', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
    var code = 'Serial.printl(' + printSerial + ');\n';
    return code;
};