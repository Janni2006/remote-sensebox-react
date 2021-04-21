import React, { Component } from 'react';
import { connect } from 'react-redux';

import WorkspaceName from './WorkspaceName';
import AddToQueue from './AddToQueue';
import DownloadProject from './DownloadProject';
import OpenProject from './OpenProject';
import Screenshot from './Screenshot';
import ResetWorkspace from './ResetWorkspace';
import CopyCode from './CopyCode';

class WorkspaceFunc extends Component {

  render() {
    return (
      <div style={{ width: 'max-content', display: 'flex' }}>

        {!this.props.assessment ?
          <WorkspaceName
            style={{ marginRight: '5px' }}
            multiple={this.props.multiple}
            project={this.props.project}
            projectType={this.props.projectType}
          />
          : null}

        {!this.props.multiple ?
          <AddToQueue iconButton />
          : null}

        {!this.props.multiple ?
          <CopyCode iconButton />
          : null}

        {!this.props.multiple ?
          <DownloadProject style={{ marginRight: '5px' }} />
          : null}


        {!this.props.assessment && !this.props.multiple ?
          <OpenProject
            style={{ marginRight: '5px' }}
            assessment={this.props.assessment}
          />
          : null}

        {!this.props.assessment && !this.props.multiple ?
          <Screenshot style={{ marginRight: '5px' }} />
          : null}

        {!this.props.multiple ?
          <ResetWorkspace style={this.props.projectType === 'project' || this.props.projectType === 'gallery' ? { marginRight: '5px' } : null}
          />
          : null}
      </div>
    );
  };
}

export default connect(null)(WorkspaceFunc);
