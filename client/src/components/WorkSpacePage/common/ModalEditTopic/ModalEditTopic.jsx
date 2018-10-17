import React from "react";
import { Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { ButtonInline } from "@/components/common";
import EditTopicForm from "./EditTopicForm.jsx";

class ModalEditTopic extends React.Component {
  handleSave = () => {
    const {
      formFields,
      fieldsValidation,
      toggleModal,
      fetchEditChannel,
      currentChannel,
      currentTeam
    } = this.props;
    const clientErrors = fieldsValidation();

    // proceed to send data to server if there's no error
    if (Object.keys(clientErrors).length === 0) {
      fetchEditChannel({
        brief_description: formFields.topic,
        teamId: currentTeam.id,
        channelId: currentChannel.id
      });
      toggleModal();
    }
  };

  render() {
    const {
      currentTopic,
      clientErrors,
      formFields,
      isModalOpen,
      toggleModal,
      handleChange,
      handleSave
    } = this.props;
    return (
      <React.Fragment>
        {isModalOpen && (
          <Modal size="small" open={isModalOpen} onClose={toggleModal}>
            <Modal.Content>
              <EditTopicForm
                currentTopic={currentTopic}
                clientErrors={clientErrors}
                formFields={formFields}
                toggleModal={toggleModal}
                handleChange={handleChange}
                handleSave={handleSave}
              />
            </Modal.Content>
          </Modal>
        )}
        {!isModalOpen && currentTopic ? (
          <ButtonInline
            cssClass="lightgrey"
            title={currentTopic}
            icon={<i className="fas fa-pencil-alt" />}
            displayText="edit"
            handleClick={toggleModal}
          />
        ) : (
          <ButtonInline
            cssClass="lightgrey"
            title={currentTopic}
            icon={<i className="fas fa-pencil-alt" />}
            displayText="add a topic"
            handleClick={toggleModal}
          />
        )}
      </React.Fragment>
    );
  }
}

ModalEditTopic.propTypes = {
  currentTopic: PropTypes.string,
  formFields: PropTypes.object.isRequired,
  clientErrors: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  currentTeam: PropTypes.object.isRequired,
  currentChannel: PropTypes.object.isRequired,

  toggleModal: PropTypes.func.isRequired,
  fetchEditChannel: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default ModalEditTopic;
