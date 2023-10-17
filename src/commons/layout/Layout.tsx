"use client";
import React, { type FC } from "react";
import { type LayoutProps } from "./Layout.types";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <header className="flex justify-end bg-[#2e026d] p-5">
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton>
          <p className="cursor-pointer rounded-md border  px-4 py-2 text-white transition-colors hover:bg-violet12 ">
            Login
          </p>
        </SignInButton>
      </SignedOut>
    </header>
  );
}

const containerClassName = (xs?:string) =>{
  const defaultClass = "container flex flex-col items-center justify-center gap-12 px-4 py-16"
  if(xs) {
    return defaultClass + " " + xs
  }
  return defaultClass
}

const Layout: FC<LayoutProps> = ({ children, showHeader = true,xs }) => {
  return (
    <>
      {showHeader ? <Header /> : null}
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className={containerClassName(xs)}>
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
