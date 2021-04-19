import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';

import Queue from './Home/Queue';
import UploadDialog from './Home/UploadDialog';

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
            componentHeight: null
        };
        this.myDiv = React.createRef();
    }

    componentDidMount() {
        this.setState({ componentHeight: this.myDiv.current.offsetHeight + 'px' });
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
                        <Card style={{ height: '100%', margin: '1vH 0 0 0', maxHeight: '60vH', overflow: 'auto' }} ref={this.myDiv}>
                            <Accordion
                                square={true}
                                style={{ margin: 0 }}
                                expanded={this.state.expanded}
                                onChange={this.onChange}
                            >
                                <AccordionSummary>
                                    <b style={{ fontSize: '20px', marginRight: '5px', width: '35px' }}>{unequal}</b>
                                    <div style={{ margin: 'auto 5px 2px 0px' }}>Test</div>
                                </AccordionSummary>
                                <AccordionDetails style={{ padding: 0, height: `calc(${this.state.componentHeight} - 50px - 50px)`, backgroundColor: 'white' }}>
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
                                    <div style={{ margin: 'auto 5px 2px 0px' }}>Test</div>
                                </AccordionSummary>
                                <AccordionDetails style={{ padding: 0, height: `calc(${this.state.componentHeight} - 50px - 50px)`, backgroundColor: 'white' }}>
                                    <Queue />
                                </AccordionDetails>
                            </Accordion>
                        </Card>

                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Card style={{ height: '100%', margin: '1vH 0 0 0', overflow: 'hidden', padding: '0px' }}>
                            <Button onClick={() => {
                                this.setState({ open: true })
                            }}>Test</Button>
                        </Card>
                    </Grid>
                </Grid>
                <UploadDialog open={this.state.open} toggleDialog={() => { this.toggleDialog() }} />
            </div>
        );
    };
}


export default Home;
