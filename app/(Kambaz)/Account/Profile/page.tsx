"use client";
import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";


interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);

  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  useEffect(() => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  }, [currentUser]);

  if (!profile) return null;

  return (
    <div className="d-flex justify-content-center align-items-start vh-100">
      <div className="w-100" style={{ maxWidth: "350px", marginTop: "100px" }}>
        <h3 className="text-center mb-4">Profile</h3>
        <FormControl
          id="wd-username"
          className="mb-2"
          defaultValue={profile.username}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        />
        <FormControl
          id="wd-password"
          className="mb-2"
          defaultValue={profile.password}
          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        />
        <FormControl
          id="wd-firstname"
          className="mb-2"
          defaultValue={profile.firstName}
          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        />
        <FormControl
          id="wd-lastname"
          className="mb-2"
          defaultValue={profile.lastName}
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        />
        <FormControl
          id="wd-dob"
          className="mb-2"
          type="date"
          defaultValue={profile.dob}
          onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
        />
        <FormControl
          id="wd-email"
          className="mb-2"
          defaultValue={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
        <select
          className="form-control mb-2"
          id="wd-role"
          value={profile.role}
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
        <Button
          onClick={signout}
          className="w-100 mb-2"
          id="wd-signout-btn"
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
