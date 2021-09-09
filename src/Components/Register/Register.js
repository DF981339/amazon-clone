import React, { useState } from "react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function Register() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const signUp = (event) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      alert(
        "Please make sure your re-enter password is the same as your password!"
      );
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (userCredential) {
            updateProfile(auth.currentUser, {
              displayName: name,
            });
            history.push("/");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="register">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1920px-Amazon_logo.svg.png"
          alt="amazonLogo"
          className="register-logo"
        />
      </Link>

      <div className="register-body">
        <div className="register-container border border-1">
          <h1>Create account</h1>
          <form action="">
            <div className="register-label">Your name</div>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <div className="register-label">Email</div>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <div className="register-label">Password</div>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 6 characters"
            />
            <div className="password-alert">
              <InfoOutlinedIcon style={{ transform: "scale(0.7)" }} />
              Passwords must be at least 6 characters.
            </div>
            <div className="register-label">Re-enter password</div>
            <input
              type="password"
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
            />

            <Button
              variant="warning"
              type="submit"
              className="register-signin-button"
              onClick={signUp}
            >
              Create your Amazon account
            </Button>
          </form>

          <div className="register-agree-section">
            By creating an account, you agree to
            Amazon-Clone-Ecommerce-Website's{" "}
            <span style={{ color: "rgb(2,104,193)" }}>Conditions of Use</span>{" "}
            and <span style={{ color: "rgb(2,104,193)" }}>Privacy Notice</span>.
          </div>

          <div className="divider"></div>

          <div className="go-back-signin">
            Already have an account?{" "}
            <Link to="/login" className="go-back-signin-link">
              <span>Sign-In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
