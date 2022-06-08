import Search from "./Search";
import Results from "./Results";
import SignUp from "./SignUp";
import Modal from "./Modal";
import { useState } from "react";
import "./styles/app.scss";

export default function MyApp() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // above render
  toggleModal = () => {
    setShowModal(!showModal);
    //this.setState({ showModal: !this.state.showModal })
  };

  // below description
  return (
    <main>
      <button
        onClick={this.toggleModal}
        style={{ backgroundColor: "black", color: "white" }}
      >
        Show Modal
      </button>
      {showModal ? (
        <Modal>
          <SignUp closeModal={setShowModal} />
        </Modal>
      ) : null}
      <div className="container">
        <h1 className="h1-heading">Scraper Two</h1>
        <Search />
        <Results />
      </div>
    </main>
  );
}
