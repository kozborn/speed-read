import React from 'react';
import Modal from '../common/Modal';

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true,
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({modalOpen: true});
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  render() {
    return (
      <div>
        <h2 onClick={this.openModal}>Settings page</h2>
        <Modal
          isOpen={this.state.modalOpen}
          overlay={true}
          title="Modal with settings"
          position="right"
          closeBtn={true}
          onClose={this.closeModal}
        >
          <div className="test">
            <h3>Lorem ipsum from onet</h3>
            <div>Dzisiaj do godziny 13.00 patrole obrońców przyrody tylko raz natknęły się na ciężki sprzęt pracujący przy wycince drzew. Jednak na widok ekologów maszyny zaprzestały pracy i wróciły na parking. Aktywistom z Obozu dla Puszczy jednak nie udało się zlokalizować maszyn z innego parkingu.</div>
          </div>
        </Modal>
      </div>
    );
  }
};

export default Settings;
