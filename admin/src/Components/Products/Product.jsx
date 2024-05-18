import React, { useState, useEffect } from "react";
import axios from "axios";


const Product = () => {
  const initialProductState = {
    imageProduct: "",
    productName: "",
    producer: {
      producerName: "",
      imageProducer: ""
    },
    productType: "",
    productPrice: 0
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

  const handleProducerChange = (e) => {
    const { name, value } = e.target;
    setProduct({
        ...product,
        producer: {
            ...product.producer,
            [name]: value
        }
    });
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    // Extraire juste le nom du fichier sans le chemin
    const fileName = file.name;
    setProduct({ ...product, [field]: fileName });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const formData = new FormData();
      // formData.append("imageProduct", product.imageProduct);
      // formData.append("productName", product.productName);
      // formData.append("producerName", product.producer.producerName);
      // formData.append("imageProducer", product.producer.imageProducer);
      // formData.append("productType", product.productType);
      // formData.append("productPrice", product.productPrice);
    
    //const response = await axios.post("http://localhost:5000/api/new-product", product)
      const apiUrl = editing
      ? `http://localhost:5000/api/update-product/${productId}`
      : "http://localhost:5000/api/new-product";
    const response=
    editing
    ? await axios.put(apiUrl, product)
    : await axios.post(apiUrl, product);
      
      setEditing(false);
      setProductId(null);
      setProduct(response.data);
      fetchProducts();
    } catch (error) {
      console.log("Erreur lors de l'ajout/modification du produit:", error);
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

  return (
    <div>
      
      <div className=" mt-[5%] ml-[30%] w-[70%] ">
      <h2 className="text-[25px] font-semibold">Produits</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h3>{editing ? "Modifier le produit" : "Ajouter un produit"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            name="imageProduct"
            onChange={(e) => handleImageChange(e, "imageProduct")}
            accept="image/*"
            required={!editing}
          />
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
            value={product.producer.producerName}
            onChange={(e) => handleProducerChange(e, "producerName")}
            placeholder="Producteur"
            required
          />
          <input
            type="file"
            name="imageProducer"
            onChange={(e) => handleImageChange(e, "imageProducer")}
            accept="image/*"
            required={!editing}
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
          <button type="submit">{editing ? "Modifier" : "Ajouter"}</button>
        </form>
      </div>
      
        <h3>Liste des produits</h3>
        <div  >
        <ul  style={{ width:'97%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',gridGap: '10px' }}  >
          {products.map((prod) => (
            <li key={prod._id}>
              <img src={prod.imageProduct} alt="Product" style={{ width:'30%', height:'auto' }} />
              <p>Nom: {prod.productName}</p>
              <p>Prix: {prod.productPrice} €</p>
              <p>Type: {prod.productType}</p>
              {prod.producer && (
                <ul>
                  <li>
                    <p>Nom du producteur: {prod.producer.producerName}</p>
                    <img src={prod.producer.imageProducer} alt="Producer"  style={{ width:'30%', height:'auto' }}  />
                  </li>
                </ul>
              )}
              <button onClick={() => editProduct(prod._id)}>Modifier</button>
              <button onClick={() => deleteProduct(prod._id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
};

export default Product;

