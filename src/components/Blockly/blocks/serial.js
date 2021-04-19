import * as Blockly from 'blockly/core';
import { getColour } from '../helpers/colour';

Blockly.Blocks['serial_begin'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.serial_begin)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(getColour().sensebox);
        this.setTooltip(Blockly.Msg.serial_begin_tooltip);
    }
};

Blockly.Blocks['serial_println'] = {
    init: function () {

        this.setColour(getColour().sensebox);
        this.appendDummyInput()
            .appendField("serial print")
        this.appendValueInput('printSerial')
            .appendField("Msg")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("print something to the serial console");
    }
};