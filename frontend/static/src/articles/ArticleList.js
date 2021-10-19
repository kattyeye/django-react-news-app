import { useState, useEffect } from "react";
export default function ArticleList() {
  const [article, setArticle] = useState({
    title: "",
    author: "",
    body: "",
    image: null,
  });
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
    <div>
      {articleList.map((article) => (
        <article key={article.id} className="articleholder">
          <h2>{article.title}</h2>
          <span>{article.author}</span>
          <img>{article.image}</img>
          <p>{article.body}</p>
        </article>
      ))}
    </div>
  );
}
