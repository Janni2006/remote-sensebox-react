import * as Blockly from 'blockly/core';

export const blockly = () => {
    return [
        {
            selector: ".wrapper",
            content: `${Blockly.Msg.blocklytour_wrapper}`,
        },
        {
            selector: ".blocklyWindow",
            content: `${Blockly.Msg.blocklytour_blocklyWindow}`,
        },
        {
            selector: ".blocklyToolboxDiv",
            content: `${Blockly.Msg.blocklytour_blocklyToolboxDiv}`,
        },
        {
            selector: '.workspaceFunc',
            content: `${Blockly.Msg.blocklytour_workspaceFunc}`,
        },
        {
            selector: ".uploadBlocks",
            content: `${Blockly.Msg.blocklytour_uploadBlocks}`,
        },
        {
            selector: ".showCode",
            content: `${Blockly.Msg.blocklytour_showCode}`,
        },
        {
            selector: ".MenuButton",
            content: `${Blockly.Msg.blocklytour_menuButton}`,
        }
    ];
};
