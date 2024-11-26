import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${id}`)
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => {
                console.error('Errore nel recupero dei dettagli del post:', error);
            });
    }, [id]);

    if (!post) {
        return <p>Caricamento...</p>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="Immagine" width="200" />}
            <p><strong>Categoria:</strong> {post.category}</p>
            <p><strong>Tags:</strong> {Array.isArray(post.tags) ? post.tags.join(', ') : 'Nessun tag'}</p>
            <p><strong>Pubblicato:</strong> {post.isPublished ? 'Sì' : 'No'}</p>
        </div>
    );
}

export default PostDetail;

