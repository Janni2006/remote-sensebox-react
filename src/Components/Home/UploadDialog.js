import React, { Component } from 'react';
import * as Blockly from 'blockly/core';

import { detectWhitespacesAndReturnReadableResult } from '../../helpers/whitespace';

import Editor from "@monaco-editor/react";
import Button from '@material-ui/core/Button';
import { Tooltip } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import Dialog from '../Dialog';

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
        };
    }

    uploadFile = (file) => {
        console.log(file)
        if (file.name.split(".")[1] !== "ino") {
            this.setState({ progress: false, file: false, open: true, title: "Unzulässiger Dateityp", content: "Die übergebene Datei entsprach nicht dem geforderten Format. Es sind nur INO-Dateien zulässig." });
        } else {
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onloadend = () => {
                this.setState({ usketch: reader.result, sketch: reader.result })
            }
        }
    }

    upload = async () => {
        if (this.state.sketch) {
            if (!this.state.name) {
                this.createFileName();
            } else {
                this.setState({ file: false, open: false, title: '', content: '', progress: true });
                const data = {
                    "sketch_name": this.state.name,
                    "sketch": this.state.sketch
                };
                console.log(data)
                await fetch(`${process.env.REACT_APP_REMOTE_BACKEND}/api/upload`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json', 'deviceID': localStorage.getItem("deviceID") },
                    body: JSON.stringify(data)
                })
                    .then(data => {
                        console.log("data");
                        this.setState({ progress: false });
                        this.props.toggleDialog();
                    })
                    .catch(err => {
                        console.log("err");
                        this.setState({ progress: false, file: false, open: true, title: Blockly.Msg.compiledialog_headline, content: Blockly.Msg.compiledialog_text });
                    });
                console.log("here2");
            }
        } else {
            this.setState({ file: false, open: true, title: "Error", content: "Sie haben keinen sketch eingegeben" });
        }
    }

    createFileName = () => {
        if (!this.state.name) {
            this.setState({ file: true, open: true, title: 'Projekt kompilieren', content: 'Bitte gib einen Namen für die Bennenung des hoch zu ladenden Programms ein und bestätige diesen mit einem Klick auf \'Eingabe\'.' });
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
                            <input type="file" onChange={(e) => this.uploadFile(e.target.files[0])} accept=".ino" style={{ display: 'none' }} id="upload-sketch" />
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
                                defaultValue="// Please paste your code in here"
                                onChange={this.handleEditorChange}
                                value={this.state.usketch}
                            />
                        </div>
                    }
                </Dialog>
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
            </div>
        );
    }
}

export default UploadDialog;