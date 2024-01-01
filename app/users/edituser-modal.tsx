import { User } from "@/models/user";
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditUserModal = ({
  showModal,
  onClose,
  onSave,
  selectedUser,
}: {
  showModal: boolean;
  onClose: () => void;
  onSave: () => void;
  selectedUser: User;
}) => {
  const [firstName, setFirstName] = useState(selectedUser.first_name);
  const [lastName, setLastName] = useState(selectedUser.last_name);
  const [phoneNumber, setPhoneNumber] = useState(selectedUser.phone_number);

  useEffect(() => {
    setFirstName(selectedUser.first_name);
    setLastName(selectedUser.last_name);
    setPhoneNumber(selectedUser.phone_number);
  }, [selectedUser]);

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNewUser">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstName}
            />
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastName}
            />
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
