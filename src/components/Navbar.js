import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import SenseboxLogo from './sensebox_logo.svg';

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
// import Tour from 'reactour'
// import { home, assessment } from './Tour';
import { faBars, faChevronLeft, faLayerGroup, faSignInAlt, faSignOutAlt, faCertificate, faUserCircle, faQuestionCircle, faCog, faChalkboardTeacher, faTools, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import * as Blockly from 'blockly'
import Tooltip from '@material-ui/core/Tooltip';


const styles = (theme) => ({
    drawerWidth: {
        // color: theme.palette.primary.main,
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
        return (
            <div>
                <AppBar
                    position="relative"
                    style={{ height: '50px', marginBottom: '30px', boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)', backgroundColor: '#4eaf46' }}
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
                        <div style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="h6" noWrap>
                                senseBox Blockly
                            </Typography>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                            <SenseboxLogo style={{ width: '30px' }} />
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="temporary"
                    anchor="left"
                    onClose={this.toggleDrawer}
                    open={this.state.open}
                    ModalProps={{ keepMounted: true }} // Better open performance on mobile.
                >
                    <div style={{ height: '50px', cursor: 'pointer', color: 'white', padding: '0 22px', backgroundColor: '#4eaf46' }} onClick={this.toggleDrawer}>
                        <div style={{ display: ' table-cell', verticalAlign: 'middle', height: 'inherit', width: '0.1%' }}>
                            <Typography variant="h6" style={{ display: 'inline' }}>
                                Menü
                            </Typography>
                            <div style={{ float: 'right' }}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </div>
                        </div>
                    </div>
                    <List>
                        {[{ text: "Blockly.Msg.navbar_tutorials", icon: faChalkboardTeacher, link: "/tutorial" }].map((item, index) => {
                            if (item.restriction || Object.keys(item).filter(attribute => attribute === 'restriction').length === 0) {
                                return (
                                    <ListItem button onClick={this.toggleDrawer} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <ListItemIcon><FontAwesomeIcon icon={item.icon} /></ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
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
            </div >
        );
    }
}

export default Navbar;