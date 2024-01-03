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
  onSave: (updatedUser: User) => void;
  selectedUser: User;
}) => {
  // setting user details with the input from pop-up fields
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState(selectedUser.first_name);
  const [lastName, setLastName] = useState(selectedUser.last_name);
  const [phoneNumber, setPhoneNumber] = useState(selectedUser.phone_number);

  // pop-up form fields comes filled with the details of selected user
  useEffect(() => {
    setUserName(selectedUser.username);
    setFirstName(selectedUser.first_name);
    setLastName(selectedUser.last_name);
    setPhoneNumber(selectedUser.phone_number);
  }, [selectedUser]);

  const handleSave = () => {
    const updatedUser = {
      id: selectedUser.id,
      username: username,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };
    onSave(updatedUser);
  };

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formNewUser">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSave()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
