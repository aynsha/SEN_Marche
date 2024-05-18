import React, { useState, useEffect } from "react";
import axios from "axios";

const Producer = () => {
  const [producers, setProducers] = useState([]);
  const [producer, setProducer] = useState({
    imageProducer:"",
    producerName: "",
    email: "",
    password: "",
    phoneNumber: 0,
    address: {
      addressRue: "",
      ville: "", 
      codePostal: 0
    },
    product: [{ productName: "", imageProduct:"", quantity: 0, isAvailable: false}]
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
  
  // const handleProducerChange = (e) => {
  //   const { name, value } = e.target;
  //   setProducer({
  //       ...producer,
  //       product: {
  //           ...producer.product,
  //           [name]: value
  //       }
  //   });
  // };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    // Extraire juste le nom du fichier sans le chemin
    const fileName = file.name;
    setProducer({ ...producer, [field]: fileName });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = editing
      ? `http://localhost:5000/api/update-producer/${producerId}`
      : "http://localhost:5000/api/new-producer";

    editing
    ? await axios.put(apiUrl, producer)
    : await axios.post(apiUrl, producer);
      fetchProducers();
      setEditing(false);
      setProducerId(null);
      //setProducer(response.data);
      setProducer({
        imageProducer:"",
        producerName: "",
        email: "",
        password: "",
        phoneNumber: 0,
        address: {
          addressRue: "",
          ville: "",
          codePostal: 0
        },
        product: [{ productName: "", imageProduct:"", quantity: 0, isAvailable: false}]
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
    //setProducer(editedProducer);
    setProducer({
      imageProducer: editedProducer.imageProducer,
      producerName: editedProducer.producerName,
      email: editedProducer.email,
      password: editedProducer.password,
      phoneNumber: editedProducer.phoneNumber,
      address: { ...editedProducer.address },
      product: [...editedProducer.product]
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
        const updatedProduct = [...producer.product];
        updatedProduct[index][name] = checked;
        setProducer({ ...producer, product: updatedProduct });
    } else if (name === "productName" || name === "quantity"  ) {
        const updatedProduct = [...producer.product];
        updatedProduct[index][name] = value;  
        setProducer({ ...producer, product: updatedProduct });
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
      product: [
        ...producer.product,
        { productName: "", imageProduct: "", quantity: 0, isAvailable: false }
      ]
    });
};

const removeProduct = (index) => {
    const updatedProduct = [...producer.product];
    updatedProduct.splice(index, 1);
    setProducer({ ...producer, product: updatedProduct });
};

  return (
    <div className=" mt-[5%] ml-[30%] w-[70%] ">
      <h2>Producers</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div >
        <h3>{editing ? "Edit Producer" : "Add Producer"}</h3>
        <form onSubmit={handleSubmit}>
        <input
            type="file"
            name="imageProducer"
            onChange={(e) => handleImageChange(e, "imageProducer")}
            accept="image/*"
            required={!editing}
          />
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
  {producer.product.map((product, index) => (
    <div key={index} >
      <input
        type="text"
        name="productName"
        value={product.productName}
        onChange={(e) => handleChange(e, index)}
        placeholder="Product Name"
      />
      <input
            type="file"
            name="imageProduct"
            onChange={(e) => handleImageChange(e, "imageProduct")}
            accept="image/*"
            required={!editing}
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
        <ul style={{ width:'97%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',gridGap: '10px' }}>
          {producers.map((prod) => (
            <li key={prod._id}>
              <img src={prod.imageProducer} alt="Producer" style={{ width:'20%', height:'auto' }} />
             <p>Name: {prod.producerName}</p>
            <p>Email: {prod.email}</p>
            <p>Phone Number: {prod.phoneNumber}</p>
            <p>Address: {prod.address.addressRue}, {prod.address.ville}, {prod.address.codePostal}</p>
      <ul>
        {prod.product.map((product, index) => (
          <li key={index}>
            <p>Product Name: {product.productName}</p>
            <img src={product.imageProduct} alt="Product"  style={{ width:'30%', height:'auto' }}  />
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
