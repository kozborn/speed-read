import { connect } from 'react-redux';
import NewText from '../components/NewText';
import { addText } from '../actions/user-actions';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveText: text => dispatch(addText(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewText);
