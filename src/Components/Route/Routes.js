import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { visitPage } from '../../actions/generalActions';

import { Switch, withRouter } from 'react-router-dom';

import PublicRoute from './PublicRoute';

import Home from '../Home';
import BlocklyEditor from '../Editor';
import NotFound from '../NotFound';
import Settings from '../Settings/Settings';
import Project from '../Project/Project';
import Impressum from '../Impressum';
import Privacy from '../Privacy';
import News from '../News';
import Faq from '../Faq';

class Routes extends Component {

  componentDidUpdate() {
    this.props.visitPage();
  }

  render() {
    return (
      <div style={{ margin: '0 22px' }}>
        <Switch>
          <PublicRoute path="/" exact>
            <Home />
          </PublicRoute>
          <PublicRoute path="/blockly" exact>
            <BlocklyEditor />
          </PublicRoute>
          <PublicRoute path="/blockly/:shareId" exact>
            <Project />
          </PublicRoute>
          {/* settings */}
          <PublicRoute path="/settings" exact>
            <Settings />
          </PublicRoute>
          {/* privacy */}
          <PublicRoute path="/impressum" exact>
            <Impressum />
          </PublicRoute>
          <PublicRoute path="/privacy" exact>
            <Privacy />
          </PublicRoute>
          <PublicRoute path="/news" exact>
            <News />
          </PublicRoute>
          <PublicRoute path="/faq" exact>
            <Faq />
          </PublicRoute>
          {/* Not Found */}
          <PublicRoute>
            <NotFound />
          </PublicRoute>

        </Switch>
      </div>
    );
  }
}

BlocklyEditor.propTypes = {
  visitPage: PropTypes.func.isRequired
};

export default connect(null, { visitPage })(withRouter(Routes));
