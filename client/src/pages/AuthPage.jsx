import React from "react";
import LoginModal from "../components/LoginModal";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

function AuthPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div>
          <NavBar />
        </div>
        <main className="flex-grow pt-4">
          <div className="flex justify-center mt-20">
            <LoginModal />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default AuthPage;
