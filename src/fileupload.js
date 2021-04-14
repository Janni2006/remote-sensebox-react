import React, { useRef, useState } from 'react';

function FileUploadField() {

    const [file, setFile] = useState(''); // storing the uploaded file
    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element

    const handleChange = (e) => {
        const file = e.target.files[0]; // accessing file
        console.log(file);
        setFile(file); // storing file
    }

    const uploadFile = () => {
        const formData = new FormData();
        formData.append('file', file); // appending file
        fetch("http://192.168.1.134/api/upload", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'deviceID': localStorage.getItem("deviceID").toString()
            },
            body: formData
        }).then((response) => {
            return response.text();
        })
    }

    return (
        <div>
            <div className="file-upload">
                <input type="file" ref={el} onChange={handleChange} accept=".ino" />
                <button onClick={uploadFile} className="upbutton">
                    Upload
                </button>
            </div>
        </div>
    );
}

class FileUpload extends React.Component {
    render() {
        return (
            <FileUploadField />

        )
    }
}

export default FileUpload;
