import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import * as actions from 'mirador/dist/es/src/state/actions';
import { getWindowIds, getManifest, getWindowManifests } from 'mirador/dist/es/src/state/selectors';
import ManifestListTools from '../components/ManifestListTools';

function mapStateToProps(state, { manifestId }) {
  const windowIds = getWindowIds(state);
  var activeWindowIds = [];

  Object.entries(windowIds).forEach(([key, value]) => {
    if (getManifest(state, { windowId: value })) {
      if (manifestId == getManifest(state, { windowId: value }).id) {
        activeWindowIds.push(value);
      }
    }
  });

  return {
    active: getWindowManifests(state).includes(manifestId),
    activeWindows: activeWindowIds,
    manifestId: manifestId
  }
};

const mapDispatchToProps = {
  addWindow: actions.addWindow,
  onDismissClick: actions.removeResource,
  removeWindow: actions.removeWindow,
  updateWorkspaceMosaicLayout: actions.updateWorkspaceMosaicLayout,
};

const styles = (theme) => ({
  windowAddRemove: {
    position: 'absolute',
    right: '0',
    top: '0',
    padding: '5px',
    minWidth: '0'
  },
  manifestRemove: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    padding: '0 5px',
    textTransform: 'none'
  }
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)

export default enhance(ManifestListTools);
