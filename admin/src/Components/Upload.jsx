import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Upload = () => {
    const [file, setFile] = useState();
    const [images, setImages] = useState([]);

    const upload = () => {
        const formData = new FormData();
        formData.append('file', file);
        axios.post('http://localhost:5000/api/upload', formData)
            .then(res => {
                // Mettre à jour le state avec les nouvelles images après le téléchargement
                setImages([...res.data]);
                // Afficher un message de succès
                return('Image successfully uploaded!');
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        // Récupérer les images depuis votre API lors du chargement du composant
        axios.get('http://localhost:5000/api/getImages')
            .then(res => {
                setImages([...res.data]); // Mettre à jour le state avec les images récupérées depuis l'API
            })
            .catch(err => console.log(err));
    }, []); // Utiliser une dépendance vide pour exécuter cet effet uniquement une fois lors du chargement initial

    return (
        <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button type='button' onClick={upload}>Upload</button>
            <h1>Liste des images</h1>
            <div style={{width:'70%'}}>
                {images.map((image, index) => (
                    <img key={index} 
                    src={`data:images/jpeg;base64,${image}`} alt="Uploaded" 
                    style={{ width: '15%', height: 'auto', marginRight: '10px' }} />
                ))}
            </div>
        </div>
    )
}

export default Upload;
