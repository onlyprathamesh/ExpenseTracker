import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function LoginModal() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("info"); // "success", "warning", "error"

  const showAlert = (msg, type = "info") => {
    setAlertMsg(msg);
    setAlertType(type);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 7000); // auto-hide after 3s
  };

  // 🔐 Login API
const handleLogin = async (e) => {
  e.preventDefault();

  const userData = { userName, password };

  try {
    const response = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    console.log("Login result: ", result);

    if (response.ok) {
      navigate('/home', {
        state: { alert: { message: "Login successful!", type: "success" } }
      });
    } else {
      showAlert(result?.msg || "Login failed!", "warning");
    }
  } catch (error) {
    console.error("Login error:", error);
    showAlert("Something went wrong. Try again later.", "warning");
  }
};

const handleSignup = async (e) => {
  e.preventDefault();

  const userData = { userName, password };

  try {
    const response = await fetch("http://localhost:8080/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    console.log("Signup result:", result);

    if (response.ok) {
      navigate('/home', {
        state: { alert: { message: "Signup successful!", type: "success" } }
      });
    } else {
      showAlert(result?.msg || "Signup failed!", "warning");
    }
  } catch (error) {
    console.error("Signup error:", error);
    showAlert("Something went wrong. Try again later.", "warning");
  }
};

  return (
    <>
    <div className="p-4 max-w-md mx-auto">
      {alertVisible && (
        <Alert color={alertType} rounded>
          <span className="font-medium">{alertMsg}</span>
        </Alert>
      )}
        <StyledWrapper>
          <form className="form">
            <p id="heading">Login / SignUp</p>
            <div className="field">
              <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
              </svg>
              <input autoComplete="off" placeholder="UserName" className="input-field" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="field">
              <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
              <input placeholder="Password" className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button className="button4" onClick={handleLogin}>Login</button>
            <button className="button4" onClick={handleSignup}>Sign Up</button>
          </form>
        </StyledWrapper>
      </div>
    </>
  );
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 2em;
    padding-right: 2em;
    padding-bottom: 0.4em;
    background-color: #1f2937;
    border-radius: 25px;
    transition: .4s ease-in-out;
  }

  .form:hover {
    transform: scale(1.05);
    border: 1px solid black;
  }

  #heading {
    text-align: center;
    margin: 2em;
    color: rgb(255, 255, 255);
    font-size: 1.2em;
  }

  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    border-radius: 25px;
    padding: 0.6em;
    border: none;
    outline: none;
    color: black;
    background-color: white;
    box-shadow: inset 2px 5px 10px #1f2937;
  }

  .input-icon {
    height: 1.3em;
    width: 1.3em;
    fill: black;
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: black;
  }

  .button4 {
    margin-bottom: 1em;
    padding: 0.5em;
    width: 100%;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: .4s ease-in-out;
    background-color: white;
    color: black;
  }

  .button4:hover {
    background-color: black;
    color: white;
  }
`;

export default LoginModal;
