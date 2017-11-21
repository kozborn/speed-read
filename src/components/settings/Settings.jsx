import React from 'react';
import Modal from '../common/Modal';

const Settings = ({ }) => {
  return (
    <div>
      <h2>Settings page</h2>
      <Modal
        isOpen
        overlay={true}
        container={document.getElementById("root")}
        title="Modal with settings"
        position="center"
      >
        <div className="test">
          <h3>Lorem ipsum from onet</h3>
          <div>Dzisiaj do godziny 13.00 patrole obrońców przyrody tylko raz natknęły się na ciężki sprzęt pracujący przy wycince drzew. Jednak na widok ekologów maszyny zaprzestały pracy i wróciły na parking. Aktywistom z Obozu dla Puszczy jednak nie udało się zlokalizować maszyn z innego parkingu.</div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
