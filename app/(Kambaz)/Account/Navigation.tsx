"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const pathname = usePathname() || "";


  const links = currentUser
    ? [{ label: "Profile", href: "/Account/Profile" }]
    : [
        { label: "Signin", href: "/Account/Signin" },
        { label: "Signup", href: "/Account/Signup" }
      ];

  
  if (currentUser && currentUser.role === "ADMIN") {
    links.push({ label: "Users", href: "/Account/Users" });
  }

  return (
    <>
      <style jsx>{`
        :global(.account-nav .nav-link) {
          color: #000;
          background-color: transparent !important;
          border-left: 4px solid transparent;
          border-radius: 0;
          padding-left: 1rem;
        }
        
        :global(.account-nav .nav-link:hover) {
          background-color: #f8f9fa !important;
        }
        
        :global(.account-nav .nav-link.active) {
          color: #000 !important;
          background-color: transparent !important;
          border-left: 4px solid #000;
          font-weight: 600;
        }
      `}</style>

      <Nav variant="pills" className="flex-column account-nav">
        {links.map((link) => (
          <NavItem key={link.href}>
            <NavLink
              as={Link}
              href={link.href}
              active={pathname.toLowerCase().endsWith(
                link.href.toLowerCase().replace("/account/", "")
              )}
            >
              {link.label}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </>
  );
}
