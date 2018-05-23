import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar'
import { toggleSidebar } from '../actions/app-actions'

const mapStateToProps = (state) => {
  return {
    expanded: state.getIn(['app', 'sidebarExpanded']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggle: () => { dispatch(toggleSidebar()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

