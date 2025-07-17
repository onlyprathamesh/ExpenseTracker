import React from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useNavigate, useLocation } from "react-router-dom";


function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleLogOut = async () => {
    try {
      const res = await fetch("http://localhost:8080/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res) {
        alert("Error while Logging Out. Please try again later.");
        console.log("Error logging out: ", res);
      }

      navigate("/");
    } catch (error) {
      console.log("Logout failed: ", error);
    }
  };
  return (
    <Navbar fluid>
      <NavbarBrand href="/home">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Expense Tracker
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        {!isHome && <Button
          color="none"
          onClick={handleLogOut}
          className="bg-white text-black hover:bg-black hover:text-white focus:ring-2 focus:ring-gray-500"
        >
          Log Out
        </Button>}

        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" active onClick={(e) => e.preventDefault()}>
          {!isHome? "Home" : "Login / SignUp"}
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default NavBar;
