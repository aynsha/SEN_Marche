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
    product: [{ productName: "",productPrice: 0, imageProduct:"", quantity: 0, isAvailable: false}]
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
        product: [{ productName: "",productPrice: 0, imageProduct:"", quantity: 0, isAvailable: false}]
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
    } else if (name === "productName" || name === "quantity" || name=== "productPrice"  ) {
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
        { productName: "", productPrice: 0, imageProduct: "", quantity: 0, isAvailable: false }
      ]
    });
};

const removeProduct = (index) => {
    const updatedProduct = [...producer.product];
    updatedProduct.splice(index, 1);
    setProducer({ ...producer, product: updatedProduct });
};

  return (
    <div className="mt-10 mx-auto w-[70%] ml-[25%]  ">
    <h2 className="text-[30px] font-bold mb-5">Producers</h2>
    {error && <p className="text-red-500">{error}</p>}
    <div className="block justify-between">
      <div className="w-1/2 mr-5">
        <h3 className="text-2xl mb-3">{editing ? "Edit Producer" : "Add Producer"}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            name="imageProducer"
            onChange={(e) => handleImageChange(e, "imageProducer")}
            accept="image/*"
            required={!editing}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="producerName"
            value={producer.producerName}
            onChange={handleChange}
            placeholder="Producer Name"
            className="border p-2 rounded-md"
          />
          <input
            type="email"
            name="email"
            value={producer.email}
            onChange={handleChange}
            placeholder="Producer Email"
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="phoneNumber"
            value={producer.phoneNumber}
            onChange={handleChange}
            placeholder="Producer Phone Number"
            className="border p-2 rounded-md"
          />
          <input
            type="password"
            name="password"
            value={producer.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            id="addressRue"
            name="address.addressRue"
            value={producer.address.addressRue}
            onChange={handleChange}
            placeholder="Rue"
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            id="city"
            name="address.ville"
            value={producer.address.ville}
            onChange={handleChange}
            placeholder="ville"
            className="border p-2 rounded-md"
          />
          <input
            type="number"
            id="codePostal"
            name="address.codePostal"
            value={producer.address.codePostal}
            onChange={handleChange}
            placeholder="Postal Code"
            className="border p-2 rounded-md"
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
                  className="border p-2 rounded-md"
                />
                <input
                  type="text"
                  name="productPrice"
                  value={product.productPrice}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Prix"
                  className="border p-2 rounded-md"
                />
                <input
                  type="file"
                  name="imageProduct"
                  onChange={(e) => handleImageChange(e, "imageProduct")}
                  accept="image/*"
                  required={!editing}
                  className="border p-2 rounded-md"
                />
                <input
                  type="text"
                  name="quantity"
                  value={product.quantity}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Product Quantity"
                  className="border p-2 rounded-md"
                />
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={product.isAvailable}
                  onChange={(e) => handleChange(e, index)}
                  className="border m-2 p-2 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="bg-[red] text-white px-2 py-1 rounded-md"
                >
                  Remove Product
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addProduct}
              className="bg-[green] text-white px-2 py-1 rounded-md mr-4"
            >
              Add Product
            </button>
            <button
              type="submit"
              className="bg-[blue] text-white  px-2 py-1 rounded-md"
            >
              {editing ? "Edit" : "Add"}
            </button>
          </form>
        </div>
        <div>
          <h3 className="font-semibold text-[30px] m-10">List of Producers</h3>
          <ul className="w-full grid grid-cols-3 gap-5">
            {producers.map((prod) => (
              <li key={prod._id} className="border p-4">
                <img
                  src={prod.imageProducer}
                  alt="Producer"
                  className="w-20 h-auto mb-2"
                />
                <p>Name: {prod.producerName}</p>
                <p>Email: {prod.email}</p>
                <p>Phone Number: {prod.phoneNumber}</p>
                <p>
                  Address: {prod.address.addressRue}, {prod.address.ville},{" "}
                  {prod.address.codePostal}
                </p>
                <ul>
                  {prod.product.map((product, index) => (
                    <li key={index} className="border p-2 my-2">
                      <p>Product Name: {product.productName}</p>
                      <img
                        src={product.imageProduct}
                        alt="Product"
                        className="w-32 h-auto"
                      />
                      <p>Product Quantity: {product.quantity}</p>
                      <p>Prix: {product.productPrice} Fcf</p>
                      <p>
                        Available Product:{" "}
                        {product.isAvailable ? "Yes" : "No"}
                      </p>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => editProducer(prod._id)}
                  className="bg-primary text-white px-2 py-1 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProducer(prod._id)}
                  className="bg-[red] text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Producer;
