import React, { Fragment, useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { connect } from 'react-redux';
import { updateWork } from '../../redux/actions/dailyWorkActions';

import { showAlert } from '../alert';

const EditModal = ({ data, updateWork }) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [des, setDes] = useState(data.description);
  const [status, setStatus] = useState(data.status);

  const toggle = () => setModal(!modal);

  const handleTextFieldChange = (mySetFunction, event) => {
    mySetFunction(event.currentTarget.value);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownToggle = () => setDropdownOpen((prevState) => !prevState);

  const handleStatus = (status) => {
    setStatus(status);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      title,
      description: des,
      status,
    };

    updateWork(data._id, body);
    showAlert('success', 'Work updated successfully!');
  };

  return (
    <Fragment>
      <button
        className="btn btn-link text-info edit_modal_btn"
        title="Edit"
        onClick={toggle}
      >
        <i className="fas fa-sliders-h"></i>
      </button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Modal 🛠</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGroup>
              <Input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => handleTextFieldChange(setTitle, e)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="des"
                id="des"
                value={des}
                onChange={(e) => handleTextFieldChange(setDes, e)}
              />
            </FormGroup>
            <FormGroup>
              <Dropdown isOpen={dropdownOpen} toggle={dropdownToggle}>
                <DropdownToggle caret>{status}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => handleStatus('Planned')}>
                    Planned
                  </DropdownItem>
                  <DropdownItem onClick={() => handleStatus('In Progress')}>
                    In Progress
                  </DropdownItem>
                  <DropdownItem onClick={() => handleStatus('Completed')}>
                    Completed
                  </DropdownItem>
                  <DropdownItem onClick={() => handleStatus('Delayed')}>
                    Delayed
                  </DropdownItem>
                  <DropdownItem onClick={() => handleStatus('Cancelled')}>
                    Cancelled
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Save
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default connect(null, {
  updateWork,
})(EditModal);
