import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    content: '',
    category: '',
    tags: [],
    isPublished: false,
  });

  const [articles, setArticles] = useState([]);

  const categories = ['Tecnologia', 'Sport', 'Salute', 'Moda', 'Cucina'];
  const availableTags = ['React', 'JavaScript', 'CSS', 'HTML', 'Node.js'];

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error('Errore durante il recupero degli articoli:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'tags') {
        setFormData((prevData) => {
          const updatedTags = checked
            ? [...prevData.tags, value]
            : prevData.tags.filter((tag) => tag !== value);
          return { ...prevData, tags: updatedTags };
        });
      } else {
        setFormData((prevData) => ({ ...prevData, isPublished: checked }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.title.trim() === '') return;

    axios.post('http://localhost:5000/api/posts', formData)
      .then((response) => {
        setArticles((prevArticles) => [...prevArticles, response.data]);
      })
      .catch((error) => {
        console.error('Errore durante l\'aggiunta dell\'articolo:', error);
      });

    setFormData({
      title: '',
      image: '',
      content: '',
      category: '',
      tags: [],
      isPublished: false,
    });
  };

  const handleDelete = (index) => {
    const articleToDelete = articles[index];

    axios.delete(`http://localhost:5000/api/posts/${articleToDelete.id}`)
      .then(() => {
        const newArticles = articles.filter((_, i) => i !== index);
        setArticles(newArticles);
      })
      .catch((error) => {
        console.error('Errore durante l\'eliminazione dell\'articolo:', error);
      });
  };

  return (
    <div>
      <h1>Blog Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titolo dell'articolo:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="image">URL Immagine:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="content">Contenuto dell'articolo:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="category">Categoria:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Seleziona una categoria</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Tags:</label>
          {availableTags.map((tag) => (
            <div key={tag}>
              <input
                type="checkbox"
                id={tag}
                name="tags"
                value={tag}
                checked={formData.tags.includes(tag)}
                onChange={handleChange}
              />
              <label htmlFor={tag}>{tag}</label>
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="isPublished">Pubblica l'articolo:</label>
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Aggiungi Articolo</button>
      </form>

      <h2>Articoli Inseriti:</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            {article.image && <img src={article.image} alt="Immagine" width="200" />}
            <p>{article.content}</p>
            <p><strong>Categoria:</strong> {article.category}</p>
            <p><strong>Tags:</strong> {Array.isArray(article.tags) ? article.tags.join(', ') : 'Nessun tag'}</p>
            <p><strong>Pubblicato:</strong> {article.isPublished ? 'Sì' : 'No'}</p>
            <button onClick={() => handleDelete(index)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;