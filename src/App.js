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
    const fetchUserData = async () => {
      const item = await localStorage.getItem("token");
      await fetch(`http://127.0.0.1:3000/protected`, {
        method: "POST",
        body: JSON.stringify({
          token: item,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((item) => {
          if (item.user == true) {
            setLoading(false);
          }
        });
      });
    };
    fetchUserData();
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
