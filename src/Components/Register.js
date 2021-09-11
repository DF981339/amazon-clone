import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { auth } from "../firebase";
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
    <RegisterBody>
      <Link to="/">
        <Logo
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1920px-Amazon_logo.svg.png"
          alt="amazonLogo"
        />
      </Link>

      <div>
        <Container>
          <Title>Create account</Title>
          <form>
            <FormLabel>Your name</FormLabel>
            <FormInput
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <FormLabel>Email</FormLabel>
            <FormInput
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <FormLabel>Password</FormLabel>
            <FormInput
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 6 characters"
            />
            <Alert>
              <InfoOutlinedIcon style={{ transform: "scale(0.7)" }} />
              Passwords must be at least 6 characters.
            </Alert>

            <FormLabel>Re-enter password</FormLabel>
            <FormInput
              type="password"
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
            />

            <SignUpButton variant="warning" type="submit" onClick={signUp}>
              Create your Amazon account
            </SignUpButton>
          </form>

          <AgreeSection>
            By creating an account, you agree to
            Amazon-Clone-Ecommerce-Website's{" "}
            <span style={{ color: "rgb(2,104,193)" }}>Conditions of Use</span>{" "}
            and <span style={{ color: "rgb(2,104,193)" }}>Privacy Notice</span>.
          </AgreeSection>

          <Divider></Divider>

          <BackToSignIn>
            Already have an account?{" "}
            <BackToSignInLink to="/login">
              <span>Sign-In</span>
            </BackToSignInLink>
          </BackToSignIn>
        </Container>
      </div>
    </RegisterBody>
  );
}

export default Register;

const RegisterBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const Logo = styled.img`
  margin: 15px auto;
  object-fit: contain;
  width: 103px;
  height: 31px;
`;

const Container = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 14px 18px !important;
  width: 350px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  border: 1px solid lightgray;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 28px;
  line-height: 1.2;
  padding-bottom: 4px;
`;

const FormLabel = styled.div`
  font-size: 13px;
  font-weight: 800;
  line-height: 19px;
  padding-left: 2px;
  padding-bottom: 2px;
  margin-top: 10px;
`;

const FormInput = styled.input`
  height: 31px;
  padding: 3px 7px;
  line-height: normal;
  width: 100%;
  border-radius: 3px;
  border: 1px solid #a6a6a6;
  border-top-color: #949494;
  box-shadow: 0 1px 0 rgb(255 255 255 / 50%), 0 1px 0 rgb(0 0 0 / 7%) inset;
  outline: 0;
  color: black;
  font-size: 100%;
  vertical-align: middle;

  &::placeholder {
    font-size: 13px;
    font-weight: 500;
  }
`;

const Alert = styled.div`
  margin-top: 3px;
  margin-bottom: 10px;
  text-align: left;
  font-size: 11px;
  font-weight: 500;
  line-height: 15px;
  color: #2b2b2b;
`;

const AgreeSection = styled.div`
  margin-top: 18px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.5;
  width: 100%;
`;

const SignUpButton = styled(Button)`
  background-image: linear-gradient(
    to bottom,
    rgb(250, 236, 200),
    rgb(239, 194, 78)
  );
  color: black;
  border-color: rgb(189, 168, 115);
  width: 100%;
  font-size: small;
  font-weight: 400;
  margin-top: 13px;

  &:hover {
    background-image: linear-gradient(
      to bottom,
      rgb(250, 236, 200),
      rgb(240, 193, 76)
    );
    color: black;
    border-color: rgb(167, 135, 52);
  }

  &:focus {
    outline-color: rgb(238, 182, 40);
  }
`;

const Divider = styled.div`
  line-height: 1;
  font-size: 11px;
  color: #656464;
  font-weight: 400;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 25px;
  margin-bottom: 3px;

  &::before {
    content: "";
    flex: 1;
    border-top: 1px solid #e3e3e3;
  }

  &::after {
    content: "";
    flex: 1;
    border-top: 1px solid #e3e3e3;
  }

  &:not(:empty)::before {
    margin-right: 0.25em;
  }

  &:not(:empty)::after {
    margin-left: 0.25em;
  }
`;

const BackToSignIn = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  margin-top: 18px;
  margin-bottom: 8px;
`;

const BackToSignInLink = styled(Link)`
  color: rgb(2, 104, 193);
  text-decoration: none;

  &:hover {
    border-bottom: 1px solid rgb(2, 104, 193);
  }
`;
