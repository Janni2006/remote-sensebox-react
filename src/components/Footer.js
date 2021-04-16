import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';

class Footer extends Component {
    render() {
        return (
            <footer style={{ position: 'absolute', bottom: '0', width: '100%' }}>
                <div style={{ minHeight: '30px', backgroundColor: '#4EAF47', textAlign: 'center', paddingTop: '2px' }}>
                    <div style={{ color: 'white', height: '100%' }}>
                        <div style={{ textDecoration: 'none', color: 'inherit' }}>Impressum</div>
                        <Typography style={{ margin: '0px 10px 0px 10px', display: 'initial', fontSize: '1rem' }}>|</Typography>
                        <div to={"/privacy"} style={{ textDecoration: 'none', color: 'inherit' }}>Privacy</div>
                        <Typography style={{ margin: '0px 10px 0px 10px', display: 'initial', fontSize: '1rem' }}>|</Typography>
                        <div to={"/news"} style={{ textDecoration: 'none', color: 'inherit' }}>News</div>
                        <Typography style={{ margin: '0px 10px 0px 10px', display: 'initial', fontSize: '1rem' }}>|</Typography>
                        <a href="https://sensebox.de" style={{ textDecoration: 'none', color: 'inherit' }}>sensebox.de</a>
                    </div>
                </div>
            </footer>
        );
    };
}

export default Footer;