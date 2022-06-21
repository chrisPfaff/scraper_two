import Search from "./Search";
import Results from "./Results";
import SignUp from "./SignUp";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import "./styles/app.scss";

export default function MyApp() {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const item = localStorage.getItem("token");
    if (item) {
      setLoading(false);
    }
  }, []);

  toggleModal = () => {
    setShowModal(!showModal);
    setLoading(!loading);
  };

  return (
    <main>
      {loading ? (
        <Modal>
          <SignUp closeModal={toggleModal} />
        </Modal>
      ) : null}
      {loading ? null : (
        <div className="container">
          <h1 className="h1-heading">Scraper Two</h1>
          <Search />
          <Results />
        </div>
      )}
    </main>
  );
}
