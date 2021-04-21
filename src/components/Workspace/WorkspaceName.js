import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { workspaceName } from '../../actions/workspaceActions';

import Snackbar from '../Snackbar';
import Dialog from '../Dialog';

import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Blockly from 'blockly/core'

const styles = (theme) => ({
  workspaceName: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '25px',
    display: 'inline-flex',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    }
  }
});


class WorkspaceName extends Component {

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      title: '',
      content: '',
      open: false,
      name: props.name,
      snackbar: false,
      type: '',
      key: '',
      message: ''
    };
  }

  componentDidUpdate(props) {
    if (props.name !== this.props.name) {
      this.setState({ name: this.props.name });
    }
  }

  toggleDialog = () => {
    this.setState({ open: !this.state, title: '', content: '' });
  }

  setFileName = (e) => {
    this.setState({ name: e.target.value });
  }

  renameWorkspace = () => {
    this.props.workspaceName(this.state.name);
    this.toggleDialog();
    this.setState({ snackbar: true, type: 'success', key: Date.now(), message: `${Blockly.Msg.messages_rename_success_01} ${this.state.name} ${Blockly.Msg.messages_rename_success_02}` });
  }

  render() {
    return (
      <div style={this.props.style}>
        <Tooltip title={`${Blockly.Msg.tooltip_project_title} ${this.props.name ? `: ${this.props.name}` : ''}`} arrow style={{ height: '100%' }}>
          <div
            className={this.props.classes.workspaceName}
            onClick={() => { if (this.props.multiple) { this.props.workspaceName(this.props.project.title); } this.setState({ open: true, title: this.props.projectType === 'gallery' ? 'Projektdaten ändern' : this.props.projectType === 'project' ? 'Projekt umbenennen' : 'Projekt benennen', content: this.props.projectType === 'gallery' ? 'Bitte gib einen Titel und eine Beschreibung für das Galerie-Projekt ein und bestätige die Angaben mit einem Klick auf \'Eingabe\'.' : 'Bitte gib einen Namen für das Projekt ein und bestätige diesen mit einem Klick auf \'Eingabe\'.' }) }}
          >
            {this.props.name && !isWidthDown(this.props.projectType === 'project' || this.props.projectType === 'gallery' ? 'xl' : 'xs', this.props.width) ?
              <Typography style={{ margin: 'auto -3px auto 12px' }}>{this.props.name}</Typography>
              : null}
            <div style={{ width: '40px', display: 'flex' }}>
              <FontAwesomeIcon icon={faPen} style={{ height: '18px', width: '18px', margin: 'auto' }} />
            </div>
          </div>
        </Tooltip>

        <Snackbar
          open={this.state.snackbar}
          message={this.state.message}
          type={this.state.type}
          key={this.state.key}
        />
        <Dialog
          open={this.state.open}
          title={this.state.title}
          content={this.state.content}
          onClose={() => { this.toggleDialog(); this.setState({ name: this.props.name }); }}
          onClick={() => { this.toggleDialog(); this.setState({ name: this.props.name }); }}
          button={'Abbrechen'}
        >
          <div style={{ marginTop: '10px' }}>
            {this.props.projectType === 'gallery' || this.state.projectType === 'gallery' ?
              <div>
                <TextField autoFocus placeholder={this.state.saveXml ? 'Dateiname' : 'Projekttitel'} value={this.state.name} onChange={this.setFileName} style={{ marginBottom: '10px' }} />
              </div>
              : <TextField autoFocus placeholder={this.state.saveXml ? 'Dateiname' : 'Projekttitel'} value={this.state.name} onChange={this.setFileName} style={{ marginRight: '10px' }} />}
            <Button disabled={!this.state.name} variant='contained' color='primary' onClick={() => { this.renameWorkspace(); this.toggleDialog(); }}>Eingabe</Button>
          </div>
        </Dialog>
      </div>
    );
  };
}

WorkspaceName.propTypes = {
  workspaceName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  name: state.workspace.name,
  message: state.message,
});

export default connect(mapStateToProps, { workspaceName })(withStyles(styles, { withTheme: true })(withWidth()(WorkspaceName)));
