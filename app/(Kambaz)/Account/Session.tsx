import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
  const currentUser = await client.profile();
  if (currentUser) {
    dispatch(setCurrentUser(currentUser));
  } else {
    dispatch(setCurrentUser(null)); 
  }
} catch (err) {
  console.error(err);
  dispatch(setCurrentUser(null)); 
}
      setPending(false);
    };
    fetchProfile();
  }, [dispatch]);
  
  if (!pending) {
    return children;
  }
}