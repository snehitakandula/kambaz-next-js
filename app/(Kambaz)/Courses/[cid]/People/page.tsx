"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as coursesClient from "../../client";


export default function PeoplePage() {
  const params = useParams();
  const cid = params.cid as string;

  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (!cid) return;
    try {
      const data = await coursesClient.findUsersForCourse(cid);
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div className="p-3">
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
