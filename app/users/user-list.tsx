"use client";
import { User } from "@/models/user";
import { useState } from "react";
import NewUserModal from "./newuser-modal";
import EditUserModal from "./edituser-modal";

const UserList = ({ users }: { users: User[] }) => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const handleCloseModal = () => {
    setShowAddUserModal(false);
    setShowEditUserModal(false);
  };

  const handleSaveUser = async (newUser: User) => {
    try {
      const response = await fetch("http://localhost:8008/users/", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      console.log("User saved:", newUser.username);
      handleCloseModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateUser = () => {
    console.log("User updated.");
    handleCloseModal();
  };

  return (
    <div>
      <div>
        <button className="btn btn-primary" onClick={() => handleAddUser()}>
          New User
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Registration Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User, index: number) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.phone_number}</td>
              <td>{user.registration_date}</td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <NewUserModal
        showModal={showAddUserModal}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
      />

      {selectedUser && (
        <EditUserModal
          showModal={showEditUserModal}
          onClose={handleCloseModal}
          onSave={handleUpdateUser}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};

export default UserList;
