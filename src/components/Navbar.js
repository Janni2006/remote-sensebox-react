import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/authActions';

import senseboxLogo from './sensebox_logo.svg';

import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tour from 'reactour'
import { blockly, assessment } from './Tour';
import { faBars, faChevronLeft, faLayerGroup, faQuestionCircle, faCog, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Blockly from 'blockly'
import Tooltip from '@material-ui/core/Tooltip';


const styles = (theme) => ({
  drawerWidth: {
    width: window.innerWidth < 600 ? '100%' : '240px',
    borderRight: `1px solid ${theme.palette.primary.main}`
  },
  appBarColor: {
    backgroundColor: theme.palette.primary.main
  },
  tourButton: {
    marginleft: 'auto',
    marginright: '30px',
  }
});


class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isTourOpen: false
    };
  }

  toggleDrawer = () => {
    this.setState({ open: !this.state.open });
  }

  openTour = () => {
    this.setState({ isTourOpen: true });

  }

  closeTour = () => {
    this.setState({ isTourOpen: false });
  }

  render() {
    var isBlockly = /^\/blockly(\/.*$|$)/g.test(this.props.location.pathname);
    return (
      <div>
        <AppBar
          position="fixed"
          style={{ height: '50px', marginBottom: this.props.projectIsLoading ? '0px' : '30px', boxShadow: this.props.projectIsLoading ? 'none' : '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)', top: '0px' }}
          classes={{ root: this.props.classes.appBarColor }}
        >
          <Toolbar style={{ height: '50px', minHeight: '50px', padding: 0, color: 'white' }}>
            <IconButton
              color="inherit"
              onClick={this.toggleDrawer}
              style={{ margin: '0 10px' }}
              className="MenuButton"
            >
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
            <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" noWrap>
                remote senseBox
              </Typography>
            </Link>
            <Link to={"/"} style={{ marginLeft: '10px' }}>
              <img src={senseboxLogo} alt="senseBox-Logo" width="30" />
            </Link>
            {isBlockly ?
              <Tooltip title='Hilfe starten' arrow>
                <IconButton
                  color="inherit"
                  className={`openTour ${this.props.classes.button}`}
                  onClick={() => { this.openTour(); }}
                  style={{ margin: '0 30px 0 auto' }}
                >
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </IconButton>
              </Tooltip>
              : null}
            <Tour
              steps={isBlockly ? blockly() : assessment()}
              isOpen={this.state.isTourOpen}
              onRequestClose={() => { this.closeTour(); }}
            />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          anchor="left"
          onClose={this.toggleDrawer}
          open={this.state.open}
          classes={{ paper: this.props.classes.drawerWidth }}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        >
          <div style={{ height: '50px', cursor: 'pointer', color: 'white', padding: '0 22px' }} className={this.props.classes.appBarColor} onClick={this.toggleDrawer}>
            <div style={{ display: ' table-cell', verticalAlign: 'middle', height: 'inherit', width: '0.1%' }}>
              <Typography variant="h6" style={{ display: 'inline' }}>
                {Blockly.Msg.navbar_menu}
              </Typography>
              <div style={{ float: 'right' }}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
            </div>
          </div>
          <List>
            {[{ text: "Home", icon: faHome, link: "/" }, { text: "Blockly", icon: faLayerGroup, link: "/blockly" }].map((item, index) => {
              if (item.restriction || Object.keys(item).filter(attribute => attribute === 'restriction').length === 0) {
                return (
                  <Link to={item.link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem button onClick={this.toggleDrawer}>
                      <ListItemIcon><FontAwesomeIcon icon={item.icon} /></ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  </Link>
                );
              }
              else {
                return (
                  null
                )
              }
            }
            )}
          </List>
          <Divider classes={{ root: this.props.classes.appBarColor }} style={{ marginTop: 'auto' }} />
          <List>
            {[{ text: 'FAQ', icon: faQuestionCircle, link: "/faq" },
            { text: Blockly.Msg.navbar_settings, icon: faCog, link: "/settings" }].map((item, index) => {
              if (item.restriction || Object.keys(item).filter(attribute => attribute === 'restriction').length === 0) {
                return (
                  <Link to={item.link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem button onClick={item.function ? () => { item.function(); this.toggleDrawer(); } : this.toggleDrawer}>
                      <ListItemIcon><FontAwesomeIcon icon={item.icon} /></ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  </Link>
                );
              }
              else {
                return (
                  null
                )
              }

            }

            )}
          </List>
        </Drawer>
        {this.props.projectIsLoading ?
          <LinearProgress style={{ marginBottom: '30px', boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)' }} />
          : null}
      </div>
    );
  }
}

Navbar.propTypes = {
  projectIsLoading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  activeStep: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  projectIsLoading: state.project.progress,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(withStyles(styles, { withTheme: true })(withRouter(Navbar)));
