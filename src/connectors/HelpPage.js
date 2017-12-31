import React from 'react'
import { connect } from "react-redux";
import Help from "../components/Help"

class HelpConnector extends React.Component {

  componentDidMount() {
    console.log("did mount")
  }

  render() {
    return <Help text={this.props.text} />
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpConnector)
