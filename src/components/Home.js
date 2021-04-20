import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Fab from '@material-ui/core/Fab';

import Queue from './Home/Queue';
import Sketches from './Home/Sketches';
import UploadDialog from './Home/UploadDialog';

import { faPlus, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Accordion = withStyles((theme) => ({
    root: {
        border: `1px solid ${theme.palette.secondary.main}`,
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
}))(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
        borderBottom: `1px solid white`,
        marginBottom: '-1px',
        minHeight: '50px',
        '&$expanded': {
            minHeight: '50px',
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            expanded: true,
            componentHeight: null,
            componentWidth: null,
        };
        this.myDiv = React.createRef();
    }

    componentDidMount() {
        this.setState({ componentHeight: this.myDiv.current.offsetHeight + 'px', componentWidth: this.myDiv.current.offsetWidth + 'px' });
    }

    onChange = () => {
        this.setState({ expanded: !this.state.expanded });

    }

    toggleDialog = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        var unequal = '<>';
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} style={{ position: 'relative' }}>
                        <Card style={{ height: '60vh', margin: '1vH 0 0 0', overflow: 'hidden' }} ref={this.myDiv}>
                            <Accordion
                                square={true}
                                style={{ margin: 0 }}
                                expanded={this.state.expanded}
                                onChange={this.onChange}
                            >
                                <AccordionSummary>
                                    <b style={{ fontSize: '20px', marginRight: '5px', width: '35px' }}>{unequal}</b>
                                    <div style={{ margin: 'auto 5px 2px 0px' }}>Warteschleife</div>
                                </AccordionSummary>
                                <AccordionDetails style={{ padding: 0, height: `calc(${this.state.componentHeight} - 100px)`, width: this.state.componentWidth, backgroundColor: 'white' }}>
                                    <Queue />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion
                                square={true}
                                style={{ margin: 0 }}
                                expanded={!this.state.expanded}
                                onChange={this.onChange}
                            >
                                <AccordionSummary>
                                    <b style={{ fontSize: '20px', marginRight: '5px', width: '35px' }}>{unequal}</b>
                                    <div style={{ margin: 'auto 5px 2px 0px' }}>Eigene Sketches</div>
                                </AccordionSummary>
                                <AccordionDetails style={{ padding: 0, height: `calc(${this.state.componentHeight} - 50px - 50px)`, width: this.state.componentWidth, backgroundColor: 'white' }}>
                                    <Sketches />
                                </AccordionDetails>
                            </Accordion>
                        </Card>

                        <Card style={{ height: '20vh', margin: '1vH 0 0 0', overflow: 'hidden' }}>
                            <Grid
                                container
                                direction="row"
                                justify="space-evenly"
                                alignItems="center"
                                style={{ height: "20vh" }}
                            >
                                <Grid item xs={4} md={4}>
                                    <Fab
                                        variant="extended"
                                        onClick={() => {
                                            this.setState({ open: true })
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '1vw' }} />
                                            Upload
                                        </Fab>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Link to={"/blockly"} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Fab
                                            variant="extended"
                                            color="primary"
                                        >
                                            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '1vw' }} />
                                            Blockly
                                        </Fab>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Card style={{ height: '81vh', margin: '1vH 0 0 0', overflow: 'hidden', padding: '0px' }}>
                        </Card>
                    </Grid>
                </Grid>
                <UploadDialog open={this.state.open} toggleDialog={() => { this.toggleDialog() }} />
            </div >
        );
    };
}


export default Home;
