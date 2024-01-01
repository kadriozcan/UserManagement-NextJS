"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand as={Link} href="/">
          UserManager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} href="/users" active={pathname === "/users"}>
              User Ops
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
