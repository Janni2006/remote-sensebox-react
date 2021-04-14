import React from 'react';
import ReactDOM from 'react-dom';
import FileUpload from './fileupload';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    async componentDidMount() {
        if (localStorage.getItem("deviceID") === null) {
            fetch("http://192.168.1.134/api/device/register")
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem("deviceID", data.deviceID);
                })
        }
        this.setState({ loading: false });
        console.log(localStorage.getItem("deviceID"))
    }
    render() {
        return (
            <FileUpload />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));