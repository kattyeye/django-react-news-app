import { useState, useEffect } from "react";

export default function ArticleList(props) {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const response = await fetch(`/api_v1/articles/`);
      const data = await response.json();
      console.log("articles", data);
      setArticleList(data);
    }
    fetchArticles();
  }, []);

  return (
    <div className="container mt-5">
      <div className="articleholder">
        {articleList.map((article) => (
          <article key={article.id}>
            <h2>{article.title}</h2>
            <p style={{ fontStyle: "italic" }}>{article.author}</p>
            <img src={article.image} alt="article-related-image" />
            <p>{article.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
