"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.replace("/Account/Profile");
    } else {
      router.replace("/Account/Signin");
    }
  }, [currentUser, router]);

  return null;
}
