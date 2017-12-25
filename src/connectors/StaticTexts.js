import { connect } from 'react-redux'
import Immutable from 'immutable'
import StaticTexts from '../components/StaticTexts'
import { save } from '../actions/actions';

const mapStateToProps = (state) => {
  return {
    defaultDoc: state.getIn(['app', 'defaultDoc'], Immutable.Map()),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveDoc: (key, value) => dispatch(save(key, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaticTexts)
