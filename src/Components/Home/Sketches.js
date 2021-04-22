import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import SketchObject from './SketchObject';

import ReactLoading from 'react-loading';

function Sketches() {
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
        <div style={{ height: "calc(55vh - 100px)", width: "100%", overflow: "auto" }}>
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
                            key={sketch_item.code}
                            friendly_name={sketch_item.friendly_name}
                            blockly={sketch_item.blockly}
                            finished={sketch_item.finished}
                            code={sketch_item.code}
                        />
                    })}
                    {sketches && sketches.length === 0 ? <ListItem>Du hast noch kein Sketch hochgeladen</ListItem> : null}
                </List>
            }
        </div>

    )
}

export default Sketches;
