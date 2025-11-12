"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button, Alert } from "react-bootstrap";

interface User {
  username: string;
  password: string;
}

interface Credentials {
  username: string;
  password: string;
}

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const signin = () => {
    const user = db.users.find(
      (u: User) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) {
      setError("Invalid username or password");
      return;
    }
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  return (
    <div
      id="wd-signin-screen"
      className="d-flex justify-content-center align-items-start vh-100"
    >
      <div className="w-100" style={{ maxWidth: "350px", marginTop: "100px" }}>
        <h1 className="text-center mb-4">Sign in</h1>
         {error && <Alert variant="danger">{error}</Alert>}
        <FormControl
          id="wd-username"
          placeholder="username"
          className="mb-2"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />

        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-3"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />

        <Button
          onClick={signin}
          id="wd-signin-btn"
          className="btn btn-primary w-100 mb-2"
        >
          Sign in
        </Button>

        <div className="text-center">
          <Link id="wd-signup-link" href="/Account/Signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
