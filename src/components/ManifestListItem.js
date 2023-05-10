import React, { Component } from 'react';
import ManifestListTools from '../containers/ManifestListTools';

class ManifestListItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      TargetComponent,
      targetProps,
    } = this.props;

    return (
      <div style={{ position: 'relative' }} >
        <TargetComponent {...targetProps} />
        <ManifestListTools {...this.props.targetProps} />
      </div>
    )
  }
}

export default ManifestListItem;
