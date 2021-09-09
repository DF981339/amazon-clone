import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  document.title = "Amazon-Clone Sign-In";
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1920px-Amazon_logo.svg.png"
          alt="amazonLogo"
          className="login-logo"
        />
      </Link>

      <div className="login-body">
        <div className="login-container border border-1">
          <h1>Sign-In</h1>
          <form action="">
            <div className="label">Email</div>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <div className="label">Password</div>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <Button
              variant="warning"
              type="submit"
              className="login-signin-button"
              onClick={signIn}
            >
              Sign-In
            </Button>
          </form>

          <div className="agree-section">
            By signing-in, you agree to Amazon-Clone-Ecommerce-Website's{" "}
            <span style={{ color: "rgb(2,104,193)" }}>Conditions of Use</span>{" "}
            and <span style={{ color: "rgb(2,104,193)" }}>Privacy Notice</span>.
          </div>
        </div>
        <div className="divider">New to Amazon-Clone?</div>

        <Link to="/register">
          <Button
            variant="secondary"
            className="login-signup-button"
            type="button"
          >
            Create your Amazon-Clone account
          </Button>
        </Link>

        <div className="login-demo-info-box border border-1">
          <div className="login-demo-info-container">
            Please kindly use the pre-created account & password below for
            demoing purpose. (if you prefer not to create your new account)
            <span className="login-demo-credential">
              Email: demo.user@gmail.com <br />
              Password: Test123123
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
