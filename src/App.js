import React, { Component } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

import { Provider } from 'react-redux';
import store from './store';
// import { loadUser } from './actions/authActions';

import './App.css';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Content from './components/Content';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4EAF47',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#DDDDDD'
    },
    button: {
      compile: '#e27136'
    }
  }
});

class App extends Component {

  random = (length = 8) => {
    // Declare all characters
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Pick characers randomly
    let str = '';
    for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;

  };

  componentDidMount() {
    // store.dispatch(loadUser());
    if (localStorage.getItem("deviceID") === null) {
      localStorage.setItem("deviceID", this.random(32));
    }
  }

  render() {
    const customHistory = createBrowserHistory();
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router history={customHistory}>
            <Content />
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
