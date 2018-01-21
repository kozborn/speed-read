import React from 'react'
import { string, bool, func } from 'prop-types';
import Modal from './Modal'
import Help from '../../connectors/Help'

class HelpPortal extends React.Component {

  static propTypes = {
    helpKey: string.isRequired,
    modalOpen: bool,
    customTrigger: bool,
    onClose: func,
  }

  static defaultProps = {
    modalOpen: false,
    customTrigger: false,
    onClose: () => null,
  }

  constructor(props) {
    super(props)
    this.state = {
      modalOpen: props.modalOpen,
    }

    this.showHelp = this.showHelp.bind(this);
    this.closeHelp = this.closeHelp.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.modalOpen !== this.props.modalOpen) {
      this.setState({ modalOpen: nextProps.modalOpen })
    }
  }

  showHelp() {
    this.setState({ modalOpen: true})
  }

  closeHelp() {
    this.setState({ modalOpen: false})
    this.props.onClose()
  }

  render() {
    return (
      <div className="help-portal">
        {!this.props.customTrigger &&
          <button className="btn help icon-left" onClick={this.showHelp} />
        }
        <Modal
          isOpen={this.state.modalOpen}
          overlay
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
