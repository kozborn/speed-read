import React from 'react'
import { string } from 'prop-types';
import Modal from './Modal'
import Help from '../../connectors/Help'

class HelpPortal extends React.Component {

  static propTypes = {
    helpKey: string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      helpModal: false,
    }

    this.showHelp = this.showHelp.bind(this);
    this.closeHelp = this.closeHelp.bind(this);
  }

  showHelp() {
    this.setState({helpModal: true})
  }

  closeHelp() {
    this.setState({helpModal: false})
  }

  render() {
    return (
      <div>
        <button onClick={this.showHelp}>Help</button>
        <Modal
          isOpen={this.state.helpModal}
          overlay
          title={"Help modal"}
          position="center"
          closeBtn
          onClose={this.closeHelp}
        >
          <Help helpKey={this.props.helpKey} />
        </Modal>
      </div>
    )
  }

}

export default HelpPortal
