import React from 'react'
import Modal from './Modal'

class HelpPortal extends React.Component {

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
          <h2>Dupa zbita</h2>
        </Modal>
      </div>
    )
  }

}

export default HelpPortal
