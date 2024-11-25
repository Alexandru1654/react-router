import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Errore nel recupero dei post:', error);
            });
    }, []);

    return (
        <div>
            <h1>Lista dei Post</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Posts;



