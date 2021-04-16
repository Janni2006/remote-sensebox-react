import React from "react";
import Editor from "@monaco-editor/react";

class ReactEditor extends React.Component {
    state = {
        file: "",
        sketch: {
            device: "",
            name: "",
            code: "",
            time: null
        }
    }

    uploadFile = () => {
        let deviceID = localStorage.getItem("deviceID");
        console.log(deviceID);
        if (deviceID === null) {
            deviceID = createNameId();
            console.log(this.state.sketch.deviceID);
            localStorage.setItem("deviceID", deviceID);
            this.setState({ sketch: { device: deviceID } });
        } else {
            setSketch({ device: deviceID });
        }
        const formData = new FormData();
        formData.append("file", file); // appending file
        fetch(window.location.origin + "/api/upload", {
            method: "POST",
            headers: {
                Accept: "application/json",
                deviceID: sketch.device
            },
            body: formData
        }).then((response) => {
            return response.text();
        });
    };

    handleEditorChange = (value, event) => {
        this.setState({ sketch: { name: "test", code: JSON.stringify(value), time: Date.now() } });
        console.log(this.state.sketch);
    };
    render() {
        return (
            <div>
                <div className="textfield">
                    <Editor
                        height="40vH"
                        defaultLanguage="cpp"
                        defaultValue="// Please paste your code in here"
                        onChange={this.handleEditorChange}
                    />
                    <button onClick={this.uploadFile} className="upbutton">
                        Upload Sketch
                    </button>
                    <input type="text" />
                </div>
            </div>
        );
    }
}

export default ReactEditor;
