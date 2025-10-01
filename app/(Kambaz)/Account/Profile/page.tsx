import Link from "next/link";
import FormControl from "react-bootstrap/FormControl";

export default function Profile() {
  return (
    <div
      id="wd-profile-screen"
      className="d-flex justify-content-center align-items-start vh-100"
    >
      <div className="w-100" style={{ maxWidth: "400px", marginTop: "100px" }}>
        <h1 className="text-center mb-4">Profile</h1>

        <FormControl defaultValue="Snehita" className="mb-2" />
        <FormControl defaultValue="123456" className="mb-2" type="password" />
        <FormControl defaultValue="Snehita" className="mb-2" />
        <FormControl defaultValue="Kandula" className="mb-2" />
        <FormControl
          defaultValue="1999-10-29"
          type="date"
          className="mb-2"
        />
        <FormControl
          defaultValue="kandula.sne@northeastern.edu"
          className="mb-2"
          type="email"
        />
        <FormControl defaultValue="student" className="mb-3" />

        <Link
          id="wd-signout-btn"
          href="/Account/Signin"
          className="btn btn-danger w-100"
        >
          Sign out
        </Link>
      </div>
    </div>
  );
}
