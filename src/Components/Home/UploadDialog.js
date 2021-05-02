import React, { Component } from 'react';

import * as Blockly from 'blockly/core';

import { detectWhitespacesAndReturnReadableResult } from '../../helpers/whitespace';

import { withStyles } from '@material-ui/core/styles';
import Editor from "@monaco-editor/react";
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Tooltip } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import Snackbar from '../Snackbar';
import Dialog from '../Dialog';
import Copy from '../copy.svg';

const styles = (theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
});

class UploadDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: false,
            sketch: "",
            name: "",
            usketch: "",
            open: false,
            file: false,
            title: '',
            content: '',
            snackbar: false,
            type: '',
            key: '',
            message: '',
            xml: ''
        };
    }

    uploadFile = (file) => {
        console.log(file)
        if (file.type === 'text/xml') {
            console.log("XML")
            var XMLreader = new FileReader();
            XMLreader.readAsText(file);
            XMLreader.onloadend = () => {
                var xmlDom = null;
                try {
                    xmlDom = Blockly.Xml.textToDom(XMLreader.result);

                    const workspace = new Blockly.Workspace();
                    Blockly.Xml.domToWorkspace(xmlDom, workspace);

                    if (workspace.getAllBlocks().length < 1) {
                        this.setState({ open: true, title: 'Keine Blöcke', content: 'Es wurden keine Blöcke detektiert. Bitte überprüfe den XML-Code und versuche es erneut.' });
                    }
                    else {
                        this.setState({ usketch: Blockly.Arduino.workspaceToCode(workspace), sketch: Blockly.Arduino.workspaceToCode(workspace), xml: XMLreader.result })
                    }
                } catch (err) {
                    this.setState({ open: true, title: 'Ungültige XML', content: 'Die XML-Datei konnte nicht in Blöcke zerlegt werden. Bitte überprüfe den XML-Code und versuche es erneut.' });
                }
            };
        }
        else if (file.name.split(".")[file.name.split(".").length] === "ino") {
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onloadend = () => {
                this.setState({ usketch: reader.result, sketch: reader.result })
            }
        } else {
            this.setState({ progress: false, file: false, open: true, title: "Unzulässiger Dateityp", content: "Die übergebene Datei entsprach nicht dem geforderten Format. Es sind nur INO-Dateien zulässig." });
        }
    }

    upload = async () => {
        if (this.state.sketch) {
            if (!this.state.name) {
                this.createFileName();
            } else {
                this.setState({ file: false, open: false, title: '', content: '', progress: true });
                this.props.toggleDialog();
                const data = {
                    "sketch_name": this.state.name,
                    "sketch": this.state.sketch,
                    "sketch_xml": this.state.xml
                };
                console.log(data)
                if (process.env.React_APP_SAME_SERVER === "true") {
                    await fetch(`${window.location.origin}/api/upload`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json', 'deviceID': localStorage.getItem("deviceID") },
                        body: JSON.stringify(data)
                    })
                        .then(() => {
                            this.setState({ progress: false });
                        })
                        .catch(() => {
                            this.props.toggleDialog();
                            this.setState({ progress: false, file: false, open: true, title: Blockly.Msg.compiledialog_headline, content: Blockly.Msg.compiledialog_text });
                        });
                }
                else {
                    await fetch(`${process.env.REACT_APP_REMOTE_BACKEND}/api/upload`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json', 'deviceID': localStorage.getItem("deviceID") },
                        body: JSON.stringify(data)
                    })
                        .then(() => {
                            this.setState({ progress: false });
                            this.setState({ snackbar: true, type: 'success', key: Date.now(), message: 'Das Projekt wurde erfolgreich hochgeladen.' });
                        })
                        .catch(() => {
                            this.props.toggleDialog();
                            this.setState({ progress: false, file: false, open: true, title: Blockly.Msg.compiledialog_headline, content: Blockly.Msg.compiledialog_text });
                        });
                }

            }
        } else {
            this.setState({ file: false, open: true, title: "Error", content: "Sie haben keinen sketch eingegeben" });
        }
    }

    createFileName = () => {
        if (!this.state.name) {
            this.setState({ file: true, open: true, title: 'Projekt hocladen', content: 'Bitte gib einen Namen für die Bennenung des hoch zu ladenden Programms ein und bestätige diesen mit einem Klick auf \'Eingabe\'.' });
        }
    }

    toggleDialog = () => {
        this.setState({ open: !this.state.open });
    }

    handleEditorChange = (value, event) => {
        this.setState({ sketch: value });
        console.log(value)
    };

    setFileName = (e) => {
        this.setState({ name: detectWhitespacesAndReturnReadableResult(e.target.value) });
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    title="Upload code"
                    content=""
                    onClose={this.state.progress ? null : this.props.toggleDialog}
                    actions={
                        <div>
                            {this.state.progress ?
                                null :
                                <div>
                                    <Button onClick={() => { this.upload(); }} color="primary" disabled={!this.state.sketch} >
                                        Upload
                                </Button>
                                    <Button onClick={() => { this.props.toggleDialog() }} color="primary">
                                        {Blockly.Msg.button_cancel}
                                    </Button>
                                </div>
                            }
                        </div>
                    }
                >
                    {this.state.progress ?
                        null :
                        <div style={{ overflow: "hidden", width: "50vw" }}>
                            <input type="file" onChange={(e) => this.uploadFile(e.target.files[0])} accept="text/xml, .ino" style={{ display: 'none' }} id="upload-sketch" />
                            <label htmlFor="upload-sketch">
                                <Tooltip title="Lade deinen Sketch hoch" arrow>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                    >
                                        Hochladen
                            </Button>
                                </Tooltip>
                            </label>
                            <Editor
                                height="50vh"
                                width="50vw"
                                defaultLanguage="cpp"
                                defaultValue={Blockly.Msg.home_upload_dialog_DEFAULT}
                                onChange={this.handleEditorChange}
                                value={this.state.usketch}
                            />
                        </div>
                    }
                </Dialog>
                <Backdrop className={this.props.classes.backdrop} open={this.state.progress}>
                    <div className='overlay'>
                        <img src={Copy} width="400" alt="copyimage"></img>
                        <h2>{Blockly.Msg.compile_overlay_head}</h2>
                        <p>{Blockly.Msg.compile_overlay_text}</p>
                        <p>{Blockly.Msg.compile_overlay_help}<a href="/faq" target="_blank">FAQ</a></p>
                        <CircularProgress color="inherit" />
                    </div>
                </Backdrop>
                <Dialog
                    open={this.state.open}
                    title={this.state.title}
                    content={this.state.content}
                    onClose={this.toggleDialog}
                    onClick={this.state.file ? () => { this.toggleDialog(); this.setState({ name: this.props.name }); } : this.toggleDialog}
                    button={this.state.file ? Blockly.Msg.button_cancel : Blockly.Msg.button_close}
                >
                    {this.state.file ?
                        <div style={{ marginTop: '10px' }}>
                            <TextField autoFocus placeholder='Dateiname' value={this.state.name} onChange={this.setFileName} style={{ marginRight: '10px' }} />
                            <Button disabled={!this.state.name} variant='contained' color='primary' onClick={() => this.upload()}>Eingabe</Button>
                        </div>
                        : null}
                </Dialog>
                <Snackbar
                    open={this.state.snackbar}
                    message={this.state.message}
                    type={this.state.type}
                    key={this.state.key}
                />
            </div>
        );
    }
}

export default (withStyles(styles, { withTheme: true })(UploadDialog));