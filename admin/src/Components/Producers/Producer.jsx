import React, { useState, useEffect } from "react";
import axios from "axios";

const Producer = () => {
  const [producers, setProducers] = useState([]);
  const [producer, setProducer] = useState({
    producerName: "",
    email: "",
    password: "",
    phoneNumber: 0,
    address: {
      addressRue: "",
      ville: "", 
      codePostal: 0
    },
    productName: [{ product: "", quantity: 0, isAvailable: false}]
  });
  const [editing, setEditing] = useState();
  const [producerId, setProducerId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducers();
  }, []);

  const fetchProducers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/all-producers");
      setProducers(response.data);
    } catch (error) {
      console.error("Error fetching producers:", error);
      setError("Error fetching producers");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:5000/api/update-producer/${producerId}`, producer);
      } else {
        await axios.post("http://localhost:5000/api/new-producer", producer);
      }
      fetchProducers();
      setEditing(false);
      setProducerId(null);
      setProducer({
        producerName: "",
        email: "",
        password: "",
        phoneNumber: 0,
        address: {
          addressRue: "",
          ville: "",
          codePostal: 0
        },
        productName: [{ product: "", quantity: 0, isAvailable: false}]
      });
    } catch (error) {
      console.error("Erreur lors de la soumission du producteur:", error);
      setError("Erreur lors de la soumission du producteur");
    }
  };

  const editProducer = (id) => {
    const editedProducer = producers.find((prod) => prod._id === id);
    setEditing(true);
    setProducerId(id);
    setProducer({
      producerName: editedProducer.producerName,
      email: editedProducer.email,
      password: editedProducer.password,
      phoneNumber: editedProducer.phoneNumber,
      address: { ...editedProducer.address },
      productName: [...editedProducer.productName]
    });
  };

  const deleteProducer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-producer/${id}`);
      fetchProducers();
    } catch (error) {
      console.error("Error deleting producer:", error);
      setError("Error deleting producer");
    }
  };


  const handleChange = (e, index) => {
    const { name, value, checked } = e.target;
    if (name === "isAvailable") {
      const updatedProductName = [...producer.productName];
      updatedProductName[index][name] = checked;
      setProducer({ ...producer, productName: updatedProductName });
    } else if (name === "product" || name === "quantity") {
      const updatedProductName = [...producer.productName];
      updatedProductName[index][name] = value;
      setProducer({ ...producer, productName: updatedProductName });
    } else if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setProducer({
        ...producer,
        address: {
          ...producer.address,
          [addressField]: value
        }
      });
    } else {
      setProducer({ ...producer, [name]: value });
    }
  };
  

  const addProduct = () => {
    setProducer({
      ...producer,
      productName: [...producer.productName, { product: "", quantity: 0, isAvailable: false }]
    });
  };

  const removeProduct = (index) => {
    const updatedProductName = producer.productName.filter((item, i) => i !== index);
    setProducer({ ...producer, productName: updatedProductName });
  };

  return (
    <div>
      <h2>Producers</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h3>{editing ? "Edit Producer" : "Add Producer"}</h3>
        <form onSubmit={handleSubmit}>
        <input
    type="text"
    name="producerName"
    value={producer.producerName}
    onChange={handleChange}
    placeholder="Producer Name"
  />
  <input
    type="email"
    name="email"
    value={producer.email}
    onChange={handleChange}
    placeholder="Producer Email"
  />
  <input
    type="text"
    name="phoneNumber"
    value={producer.phoneNumber}
    onChange={handleChange}
    placeholder="Producer Phone Number"
  />
  <input
    type="password"
    name="password"
    value={producer.password}
    onChange={handleChange}
    placeholder="Password"
  />
  <input
    type="text"
    id="addressRue"
    name="address.addressRue"
    value={producer.address.addressRue}
    onChange={handleChange}
    placeholder="Rue"
  />
  <input
    type="text"
    id="city"
    name="address.ville"
    value={producer.address.ville}
    onChange={handleChange}
    placeholder="ville"
  />
  <input
    type="number"
    id="codePostal"
    name="address.codePostal"
    value={producer.address.codePostal}
    onChange={handleChange}
    placeholder="Postal Code"
  />
  {/* Available Products */}
  {producer.productName.map((product, index) => (
    <div key={index}>
      <input
        type="text"
        name="product"
        value={product.product}
        onChange={(e) => handleChange(e, index)}
        placeholder="Product Name"
      />
      <input
        type="text"
        name="quantity"
        value={product.quantity}
        onChange={(e) => handleChange(e, index)}
        placeholder="Product Quantity"
      />
      <input
        type="checkbox"
        name="isAvailable"
        checked={product.isAvailable}
        onChange={(e) => handleChange(e, index)}
      />
      <button onClick={() => removeProduct(index)}>Remove Product</button>
    </div>
  ))}
  <button onClick={addProduct}>Add Product</button>
          <button type="submit">{editing ? "Edit" : "Add"}</button>
        </form>
      </div>
      <div>
        <h3>List of Producers</h3>
        <ul>
          {producers.map((prod) => (
            <li key={prod._id}>
             <p>Name: {prod.producerName}</p>
      <p>Email: {prod.email}</p>
      <p>Phone Number: {prod.phoneNumber}</p>
      <p>Address: {prod.address.addressRue}, {prod.address.ville}, {prod.address.codePostal}</p>
      <ul>
        {prod.productName.map((product, index) => (
          <li key={index}>
            <p>Product Name: {product.product}</p>
            <p>Product Quantity: {product.quantity}</p>
            <p>Available Product: {product.isAvailable ? "Yes" : "No"}</p>
          </li>
        ))}
      </ul>
              <button onClick={() => editProducer(prod._id)}>Edit</button>
              <button onClick={() => deleteProducer(prod._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Producer;
