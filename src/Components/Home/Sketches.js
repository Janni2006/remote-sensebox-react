import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { Card } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import ReactLoading from 'react-loading';

function Sketches(props) {
    const [sketches, setSketches] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setInterval(async function () {
            const response = await fetch(`${process.env.REACT_APP_REMOTE_BACKEND}/api/private-sketches`, {
                method: "GET",
                headers: {
                    deviceID: localStorage.getItem("deviceID").toString(),
                },
            });
            const data = await response.json();
            setSketches(data);
            setLoading(false);
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div style={{ height: "calc(60vh - 100px)", width: "100%", overflow: "auto" }}>
            {loading ?
                <div
                    style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '25%'
                    }}
                >
                    <ReactLoading type={"bubbles"} color={"#4eaf46"} height={50} width={'100%'} />
                </div>
                :
                <List>
                    {sketches && sketches.map(sketch_item => {
                        return < SketchObject
                            key={sketch_item.id}
                            friendly_name={sketch_item.friendly_name}
                            blockly={sketch_item.blockly}
                            finished={sketch_item.finished}
                            code={sketch_item.code}
                            open={props.openDetails}
                        />
                    })}
                    {sketches && sketches.length === 0 ? <ListItem>Du hast noch kein Sketch hochgeladen</ListItem> : null}
                </List>
            }
        </div>

    )
}

class SketchObject extends Component {
    openDetails = () => {
        this.props.open(this.props.code);
    }
    render() {
        return (
            <ListItem >
                <Card style={{ height: '60px', width: '100%', overflow: 'hidden', padding: "5px" }}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        style={{ height: "60px" }}
                    >
                        <Grid item xs={6} md={6}>
                            {this.props.friendly_name}
                        </Grid>
                        <Grid item xs={4} md={4}>
                            {this.props.finished ?
                                <p
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        margin: "0px",
                                        marginTop: "2.5px",
                                        marginBottom: "2.5px",
                                        border: "1.5px solid rgb(47, 107, 43)",
                                        width: "48px",
                                        padding: "1.5px 4px 1.5px 4px",
                                        borderRadius: "10px",
                                        backgroundColor: "rgba(78, 175, 71, .2)",
                                        color: "rgb(47, 107, 43)"
                                    }}
                                >
                                    Finished
                                        </p> : null}
                            {this.props.blockly ?
                                <p
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        margin: "0px",
                                        marginTop: "2.5px",
                                        marginBottom: "2.5px",
                                        border: "1.5px solid rgb(153, 91, 165)",
                                        width: "40px",
                                        padding: "1.5px 4px 1.5px 4px",
                                        borderRadius: "10px",
                                        backgroundColor: "rgba(187,112,201, .2)",
                                        color: "rgb(153, 91, 165)"
                                    }}
                                >
                                    Blockly
                                        </p> : null}
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <IconButton onClick={this.openDetails} >
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Card>
            </ListItem >

        );
    }
}

export default Sketches;