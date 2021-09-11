import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { auth } from "../firebase";
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
    <LoginBody>
      <Link to="/">
        <Logo
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1920px-Amazon_logo.svg.png"
          alt="amazonLogo"
        />
      </Link>

      <div>
        <Container>
          <Title>Sign-In</Title>
          <form>
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
            />

            <SignInButton variant="warning" type="submit" onClick={signIn}>
              Sign-In
            </SignInButton>
          </form>

          <AgreeSection>
            By signing-in, you agree to Amazon-Clone-Ecommerce-Website's{" "}
            <span style={{ color: "rgb(2,104,193)" }}>Conditions of Use</span>{" "}
            and <span style={{ color: "rgb(2,104,193)" }}>Privacy Notice</span>.
          </AgreeSection>
        </Container>

        <Divider>New to Amazon-Clone?</Divider>

        <Link to="/register">
          <SignUpButton variant="secondary" type="button">
            Create your Amazon-Clone account
          </SignUpButton>
        </Link>

        <DemoInfo>
          <DemoInfoContainer>
            Please kindly use the pre-created account & password below for
            demoing purpose. (if you prefer not to create your new account)
            <DemoCredential>
              Email: demo.user@gmail.com <br />
              Password: Test123123
            </DemoCredential>
          </DemoInfoContainer>
        </DemoInfo>
      </div>
    </LoginBody>
  );
}

export default Login;

const LoginBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const Logo = styled.img`
  margin: 20px auto;
  object-fit: contain;
  width: 100px;
`;

const Container = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 20px 26px;
  width: 350px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 28px;
  line-height: 1.2;
  margin-bottom: 10px;
  padding-bottom: 4px;
`;

const FormLabel = styled.div`
  font-size: 13px;
  font-weight: 700;
  line-height: 19px;
`;

const FormInput = styled.input`
  height: 30px;
  margin-bottom: 10px;
  width: 100%;
`;

const AgreeSection = styled.div`
  margin-top: 18px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  width: 100%;
`;

const SignInButton = styled(Button)`
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
  margin-top: 10px;

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

const SignUpButton = styled(Button)`
  background-image: linear-gradient(
    to bottom,
    rgb(251, 251, 252),
    rgb(232, 233, 236)
  );
  color: black;
  border-radius: 2px;
  width: 100%;
  border: 1px solid darkgray;
  margin-top: 10px;
  font-size: 13px;
  font-weight: 500;
  line-height: 29px;
  padding: 0 10px 0 11px;
  margin-bottom: 25px;

  &:hover {
    background-image: linear-gradient(
      to bottom,
      rgb(232, 232, 232),
      rgb(213, 213, 213)
    );
    color: black;
    border-color: darkgray;
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

const DemoInfo = styled.div`
  width: 350px;
  border-radius: 8px;
  margin-bottom: 30px;
  border: 1px solid lightgray;
`;

const DemoInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  width: 100%;
  color: grey;
`;

const DemoCredential = styled.div`
  background-color: rgb(234, 237, 237);
  color: grey;
  margin-top: 5px;
  padding: 5px;
  line-height: 18px;
`;
