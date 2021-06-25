import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { onPageLoad } from '../actions/generalActions';

import * as Blockly from 'blockly/core';
import { De } from './Blockly/msg/de';
import { En } from './Blockly/msg/en';

import Navbar from './Navbar';
import Footer from './Footer';
import Routes from './Route/Routes';
import Cookies from './Cookies';

class Content extends Component {

  componentDidMount() {
    this.props.onPageLoad()
    if (this.props.language === 'de_DE') {
      Blockly.setLocale(De);
    } else if (this.props.language === 'en_US') {
      Blockly.setLocale(En);
    }
  }

  componentDidUpdate(props) {
    if (props.language !== this.props.language) {
      if (this.props.language === 'de_DE') {
        Blockly.setLocale(De);
      } else if (this.props.language === 'en_US') {
        Blockly.setLocale(En);
      }
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Navbar />
        <div style={{ marginTop: '70px' }}>
          <Routes />
        </div>

        <Cookies />
        <Footer />
      </div>
    );
  }
}

Content.propTypes = {
  language: PropTypes.string.isRequired,
  onPageLoad: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  language: state.general.language
});

export default connect(mapStateToProps, {onPageLoad})(Content);
