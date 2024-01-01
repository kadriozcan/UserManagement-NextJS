import { User } from "@/models/user";
import React from "react";
import UserList from "./user-list";

const Page = async () => {
  const response = await fetch("http://localhost:8008/users/");
  const users: User[] = await response.json();

  return <UserList users={users} />;
};

export default Page;
