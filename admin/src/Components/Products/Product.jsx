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
    <div className="container w-[75%] ml-[20%] mx-auto p-4">
      <h2 className="text-[35px] font-semibold mb-6">Produits</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-8">
        <h3 className="text-2xl mb-4">{editing ? "Modifier le produit" : "Ajouter un produit"}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="imageProduct">Image du produit</label>
            <input
              type="file"
              name="imageProduct"
              onChange={(e) => handleImageChange(e, "imageProduct")}
              accept="image/*"
              required={!editing}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="productName">Nom du produit</label>
            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              placeholder="Nom du produit"
              required
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="producerName">Producteur</label>
            <input
              type="text"
              name="producerName"
              value={product.producer.producerName}
              onChange={handleProducerChange}
              placeholder="Producteur"
              required
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="imageProducer">Image du producteur</label>
            <input
              type="file"
              name="imageProducer"
              onChange={(e) => handleImageChange(e, "imageProducer")}
              accept="image/*"
              required={!editing}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="productType">Type de Produit</label>
            <input
              type="text"
              name="productType"
              value={product.productType}
              onChange={handleChange}
              placeholder="Type de Produit"
              required
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="productPrice">Prix</label>
            <input
              type="number"
              name="productPrice"
              value={product.productPrice}
              onChange={handleChange}
              placeholder="Prix"
              required
              className="border p-2 rounded"
            />
          </div>
          <button type="submit" className=" bg-hover text-white p-2 rounded">{editing ? "Modifier" : "Ajouter"}</button>
        </form>
      </div>
      <h3 className="text-[30px] font-semibold mb-4">Liste des produits</h3>
      <ul className="grid grid-cols-1 h-auto sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((prod) => (
          <li key={prod._id} className="border p-4 rounded shadow">
            <img src={prod.imageProduct} alt="Product" className="w-32 h-auto " />
            <p><strong>Nom:</strong> {prod.productName}</p>
            <p><strong>Prix:</strong> {prod.productPrice} Fcf</p>
            <p><strong>Type:</strong> {prod.productType}</p>
            {prod.producer && (
              <div className="mt-4">
                <p><strong>Nom du producteur:</strong> {prod.producer.producerName}</p>
                <img src={prod.producer.imageProducer} alt="Producer" className="w-32 h-auto mt-2" />
              </div>
            )}
            <div className="mt-4 space-x-2">
              <button onClick={() => editProduct(prod._id)} className=" bg-primary text-white p-2 rounded">Modifier</button>
              <button onClick={() => deleteProduct(prod._id)} className="bg-[red] text-white p-2 rounded">Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;

