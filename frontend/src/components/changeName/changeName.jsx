import React, { useState } from "react";
import classes from "./changeName.module.css";
import logo from "../../assets/imerologio-logo.png";
import {jwtDecode} from "jwt-decode"; // Corrected import
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
const API_URL = BACKEND_URI+'/user';

export default function ChangeName() {
  const [password, setPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getToken = () => {
    let token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      return userData;
    } else {
      alert("You are not logged in");
      navigate("/login");
      return null;
    }
  };

  const handleChangeName = async (e) => {
    console.log ("change button is here!!")
    e.preventDefault();

    const newDetails = {
      password: password,
      newName: newName,
      newLastname: newLastname,
    };

    try {
      await axios.put(
        `${API_URL}/update/${getToken().user.userId}`,
        newDetails,
            {headers: { "x-auth-token": `${localStorage.getItem("token")}` }
        
      }).then((res) => {
        if (res.status === 200) {
          alert("Name changed successfully");
          setPassword("");
          setNewLastname("");
          setNewName("");
          navigate("/")
          }
      });
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleCancel = () => {
    setPassword("");
    setNewName("");
    setNewLastname("");
    navigate("/");
  };

  return (
    <>
    <div className={classes.container}>
      <form className={classes.wrapper} onSubmit={handleChangeName}>
        <img src={logo} alt="Imerologio" />
        <h3 className={classes.username}>{getToken()?.userEmail}</h3>
        <h1 className={classes.h1}>Change your details</h1>
        <div className={classes.inputWrapper}>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            // minLength={8}
          />
          <input
            type="text"
            id="newName"
            value={newName}
            placeholder="New Name"
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <input
            type="text"
            id="newLastName"
            value={newLastname}
            placeholder="New Last Name"
            onChange={(e) => setNewLastname(e.target.value)}
            required
          />
          {error && (
            <div className={classes.errorMessage}>
              {error}
            </div>
          )}
        </div>
        <div className={classes.btnWrapper}>
          <button className={classes.CHbtn} type="submit">
            Change
          </button>
          <button
            className={classes.CHbtn}
            type="button"
            onClick={handleCancel} // Corrected to call handleCancel
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
}
