import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip, Typography } from '@material-ui/core';
import { CheckBoxOutlined, CheckBoxOutlineBlank } from '@material-ui/icons';

class ManifestListTools extends Component {
  constructor(props) {
    super(props);

    this.addWindow = this.addWindow.bind(this);
    this.removeWindow = this.removeWindow.bind(this);
    this.removeManifest = this.removeManifest.bind(this);
  }

  addWindow() {
    const {
      addWindow,
      manifestId,
    } = this.props;

    addWindow({ manifestId });
  }

  removeWindow() {
    const {
      activeWindows,
      removeWindow,
      updateWorkspaceMosaicLayout,
    } = this.props;

    Object.entries(activeWindows).forEach(([key, value]) => {
      removeWindow(value);
    });

    /** 
     * ugly hack, needs improvement
     * 
     * error on display if windows are removed and none remains
     * 
     * layout update prevents bug, this solution updates always
     * */
    if (activeWindows.length > 0) {
      updateWorkspaceMosaicLayout();
    }
  }

  removeManifest() {
    const {
      activeWindows,
      manifestId,
      onDismissClick,
      removeWindow,
      updateWorkspaceMosaicLayout,
    } = this.props;

    Object.entries(activeWindows).forEach(([key, value]) => {
      removeWindow(value);
    });

    /** 
     * duplicate, see above
     * */
    if (activeWindows.length > 0) {
      updateWorkspaceMosaicLayout();
    }

    onDismissClick(manifestId);
  }

  render() {
    const {
      active,
      t,
      classes,
    } = this.props;

    return (
      <React.Fragment>
        <Tooltip
          title={
            active
              ? t('window_remove')
              : t('window_add')
          }
        >
          <Button
            className={classes.windowAddRemove}
            onClick={
              active
                ? this.removeWindow
                : this.addWindow
            }
          >
            {
              active
                ? <CheckBoxOutlined />
                : <CheckBoxOutlineBlank />
            }
          </Button>
        </Tooltip>

        <Button
          className={classes.manifestRemove}
          onClick={this.removeManifest}
        >
          <Typography variant="body1" >
            {t('manifest_remove')}
          </Typography>
        </Button>
      </React.Fragment>
    )
  }
}

ManifestListTools.propTypes = {
  active: PropTypes.bool,
  activeWindows: PropTypes.arrayOf(PropTypes.string),
  manifestId: PropTypes.string.isRequired,
  onDismissClick: PropTypes.func.isRequired,
  removeWindow: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  updateWorkspaceMosaicLayout: PropTypes.func.isRequired,
};

ManifestListTools.defaultProps = {
  active: false,
  activeWindows: {},
};

export default ManifestListTools;
