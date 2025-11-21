"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { redirect } from "next/navigation";
import * as client from "../client";
import { setCurrentUser } from "../reducer";

interface Credentials {
  username: string;
  password: string;
}

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  return (
    <div>

      
      <h2>Sign In</h2>

      <input
        className="form-control mb-2"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />

      <input
        className="form-control mb-2"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />

      <button className="btn btn-primary" onClick={signin}>
        Sign In
      </button><br/>
      <Link href="/Account/Signup" className="wd-signup-link">Sign up</Link>
    </div>
  );
}

