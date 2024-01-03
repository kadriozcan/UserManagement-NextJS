"use client";
import { User } from "@/models/user";
import React, { useEffect, useState } from "react";
import NewUserModal from "./newuser-modal";
import EditUserModal from "./edituser-modal";

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  // show pop-up form for New button
  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  // show pop-up form for edit button with selected user details
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  // close pop-up form
  const handleCloseModal = () => {
    setShowAddUserModal(false);
    setShowEditUserModal(false);
  };

  // fetching users and formatting registration_date
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8008/users", {
        method: "GET",
      });
      if (response.ok) {
        let users: User[] = await response.json();

        // Format registrationDate field
        users = users.map((user) => {
          if (user.registration_date) {
            const date = new Date(user.registration_date);

            user.registration_date = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
          }
          return user;
        });

        setUsers(users);
        console.log("Users:", users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // post request with new user and then, fetch users again
  const handleSaveUser = async (newUser: User) => {
    try {
      const response = await fetch("http://localhost:8008/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log("User saved:", newUser.username);
        fetchUsers();
        handleCloseModal();
      } else {
        console.error("Failed to save user. Status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // update request with selected user and fetch users again
  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const response = await fetch(
        `http://localhost:8008/users/${updatedUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        console.log(`User with ID ${updatedUser.id} updated.`);
        await fetchUsers();
      } else {
        console.error("Failed to update user. Status:", response.status);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
    handleCloseModal();
  };

  // delete request with selected user's id
  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:8008/users/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          console.log(`User with ID ${id} deleted.`);
          await fetchUsers();
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
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
            <th scope="col">Username</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Registration Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.username}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.phone_number}</td>
              <td>{user.registration_date}</td>
              <td>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => {
                    if (user.id !== undefined) {
                      handleDeleteUser(user.id);
                    } else {
                      console.error("User ID is undefined.");
                    }
                  }}
                >
                  Delete
                </button>
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

export default Page;
