import React, { useState, useEffect } from "react";
import axios from "axios";
import Upload from "../Upload";

const Product = () => {
  const initialProductState = {
    productName: "",
    producerName :"",
    productType : "",
    productPrice: 0,
  };

  const [product, setProduct] = useState(initialProductState);
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [productId, setProductId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/all-products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
      setError("Erreur lors de la récupération des produits");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!editing) {
        await axios.post("http://localhost:5000/api/new-product", product);
      } else {
        await axios.put(`http://localhost:5000/api/update-product/${productId}`, product);
        setEditing(false);
        setProductId(null);
      }
      setProduct(initialProductState);
      fetchProducts();
    } catch (error) {
      console.error("Erreur lors de l'ajout/modification du produit:", error);
      setError("Erreur lors de l'ajout/modification du produit");
    }
  };

  const editProduct = (id) => {
    const productToEdit = products.find((product) => product._id === id);
    setEditing(true);
    setProductId(id);
    setProduct(productToEdit);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-product/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      setError("Erreur lors de la suppression du produit");
    }
  };
    console.log(products);

  //   const handleClick=()=>{
  //     localStorage.removeItem("token")
  //     window.location = "/upload"
  // }
  return (
    <div>
      <h2>Produits</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h3>{editing ? "Modifier le produit" : "Ajouter un produit"}</h3>
        <form onSubmit={handleSubmit}>
          <Upload/>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            placeholder="Nom du produit"
            required
          />
          <input
            type="text"
            name="producerName"
            value={product.producerName}
            onChange={handleChange}
            placeholder="Producteur"
            required
          />
          <input
            type="text"
            name="productType"
            value={product.productType}
            onChange={handleChange}
            placeholder="Type de Produit"
            required
          />
          <input
            type="number"
            name="productPrice"
            value={product.productPrice}
            onChange={handleChange}
            placeholder="Prix"
            required
          />
          {/* <textarea
            name="description"
            value=''
            onChange={handleChange}
            placeholder="Description"
            required
          /> */}
          <button type="submit">{editing ? "Modifier" : "Ajouter"}</button>
        </form>
      </div>
      <div>
        <h3>Liste des produits</h3>
        <ul>
          {products.map((prod) => (
            <li key={prod._id}>
              {prod.productName} - {prod.productPrice} €
              {prod.productType}-{ prod.producerName}  
              
              <button onClick={() => editProduct(prod._id)}>Modifier</button>
              <button onClick={() => deleteProduct(prod._id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
      {/* <button onClick={handleClick} >Upload img</button> */}
    </div>
  );
};

export default Product;
