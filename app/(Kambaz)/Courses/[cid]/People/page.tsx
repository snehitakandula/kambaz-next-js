"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { findUsersForCourse } from "../../client";
import PeopleTable from "./Table";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
}

export default function PeoplePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    const users = await findUsersForCourse(cid as string);
    setUsers(users);
  }, [cid]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}
