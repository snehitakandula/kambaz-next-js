import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signup() {
  return (
    <div
      id="wd-signup-screen"
      className="d-flex justify-content-center align-items-start vh-100"
    >
      <div className="w-100" style={{ maxWidth: "350px", marginTop: "100px" }}>
        <h1 className="text-center mb-4">Sign up</h1>
        <FormControl
          id="wd-username"
          placeholder="username"
          className="mb-2"
          defaultValue="Snehita"
        />
        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-2"
          defaultValue="123456"
        />
        <FormControl
          id="wd-password-verify"
          placeholder="verify password"
          type="password"
          className="mb-3"
          defaultValue="123456"
        />
        <Link
          id="wd-signup-btn"
          href="/Account/Profile"
          className="btn btn-primary w-100 mb-2"
        >
          Sign up
        </Link>
        <div className="text-center">
          <Link id="wd-signin-link" href="/Account/Signin">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
