import React from "react";
import ExpenseTable from "../components/ExpenseTable";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Alert } from "flowbite-react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

function HomePage() {
  const location = useLocation();
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.alert) {
      setAlertData(location.state.alert);

      // Optional: Clear after a few seconds
      const timer = setTimeout(() => setAlertData(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* NavBar */}
        <div>
          <NavBar />
        </div>

        {/* Main Content */}
        <main className="flex-grow pt-4">
          {alertData && (
            <Alert
              color={alertData.type === "success" ? "success" : "warning"}
              rounded
            >
              <span className="font-medium">{alertData.message}</span>
            </Alert>
          )}
          <div className="flex justify-center mt-10">
            <ExpenseTable />
          </div>
        </main>

        {/* Footer pinned at bottom */}
        <Footer />
      </div>

    </>
  );
}

export default HomePage;
