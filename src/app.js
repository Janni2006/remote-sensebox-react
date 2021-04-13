import React from 'react';
import ReactDOM from 'react-dom';
import FileUpload from './fileupload';


class App extends React.Component {
    render() {
        return (
            <FileUpload/>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));