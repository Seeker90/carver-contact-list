import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { updatedContact } from "../lib/Fetch";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const UpdateContact = () => {
  const [contactName, setContactName] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer(); 

  useEffect(() => {
    const existingContact = store.contacts?.find(
      (contact) => contact.id === parseInt(id)
    );
    if (existingContact) {
      setContactName(existingContact.name || "");
      setContactAddress(existingContact.address || "");
      setContactPhone(existingContact.phone || "");
      setContactEmail(existingContact.email || "");
    }
  }, [id, store.contacts]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!contactName || !contactAddress || !contactPhone || !contactEmail) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      await updatedContact(id, contactName, contactAddress, contactPhone, contactEmail, dispatch);
      alert("Contact updated successfully!");
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("Failed to update contact. Please try again.");
    }
  };

  return (
    <>
      <div className="row header mt-3">
        <div className="col-12 text-center">
          <h1>Update a Contact</h1>
        </div>
      </div>

      <div className="row add-contact-row">
        <div className="col-2"></div>
        <div className="col-8">
          <form className="contact-name" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="contactName" className="form-label">Full Name:</label>
              <input
                type="text"
                className="form-control"
                id="contactName"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contactAddress" className="form-label">Address:</label>
              <input
                type="text"
                className="form-control"
                id="contactAddress"
                value={contactAddress}
                onChange={(e) => setContactAddress(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contactPhone" className="form-label">Phone Number:</label>
              <input
                type="text"
                className="form-control"
                id="contactPhone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contactEmail" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="contactEmail"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success w-100 py-2">
              Submit
            </button>
          </form>

          <div className="mt-4">
            <Link to="/">Go Back Home</Link>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
};
