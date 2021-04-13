import React, { useRef, useState } from 'react';
import axios from 'axios';

function FileUploadField() {

    const [file, setFile] = useState(''); // storing the uploaded file
    // storing the recived file from backend
    const [data, getFile] = useState({ name: "", path: "" });
    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element

    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accessing file
        console.log(file);
        setFile(file); // storing file
    }

    const uploadFile = () => {
        const formData = new FormData();
        formData.append('file', file); // appending file
        // axios.post('http://192.168.1.134:4500/upload', formData, {
        //     onUploadProgress: (ProgressEvent) => {
        //         let progress = Math.round(
        //             ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
        //         setProgess(progress);
        //     }
        // }).then(res => {
        //     console.log(res);
        // }).catch(err => console.log(err))
        fetch("http://192.168.1.134/upload", {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        }).then((response) => {
            return response.text();
        })
    }

    return (
        <div>
            <div className="file-upload">
                <input type="file" ref={el} onChange={handleChange} />
                <div className="progessBar" style={{ width: progress }}>
                    {progress}
                </div>
                <button onClick={uploadFile} className="upbutton">
                    Upload
                </button>
            </div>
        </div>
    );
}

class FileUpload extends React.Component {
    componentDidMount() { }
    render() {
        return (
            <FileUploadField />
        )
    }
}

export default FileUpload;