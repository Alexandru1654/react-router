import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${id}`)
            .then(response => {
                setArticle(response.data);
            })
            .catch(error => {
                console.error('Errore nel recuperare i dettagli dell\'articolo:', error);
            });
    }, [id]);

    if (!article) return <div>Loading...</div>;

    return (
        <div>
            <h1>{article.title}</h1>
            {article.image && <img src={article.image} alt="Immagine" width="300" />}
            <p><strong>Categoria:</strong> {article.category}</p>
            <p><strong>Contenuto:</strong> {article.content}</p>
            <p><strong>Tags:</strong> {Array.isArray(article.tags) ? article.tags.join(', ') : 'Nessun tag'}</p>
            <p><strong>Pubblicato:</strong> {article.isPublished ? 'Sì' : 'No'}</p>
        </div>
    );
}

export default PostDetail;


