import React, { Component } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

import { Provider } from 'react-redux';
import store from './store';

import './App.css';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Content from './Components/Content';

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
