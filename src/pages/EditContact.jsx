import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { updateContact } from "../lib/Fetch";

export const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    if (store && store.contacts) {
      const contact = store.contacts.find(c => c.id === parseInt(id));
      if (contact) {
        setFormData({
          name: contact.name,
          address: contact.address,
          phone: contact.phone,
          email: contact.email
        });
      }
    }
  }, [id, store]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateContact(
      id,
      formData.name,
      formData.address,
      formData.phone,
      formData.email,
      dispatch);
    if (result) {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <h1>Edit Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Contact</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
};