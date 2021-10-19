import logo from "./logo.svg";
import "./App.css";
import CustomUser from "./custom-user/CustomUser";
import ArticleList from "./articles/ArticleList";
import ArticleForm from "./articles/ArticleForm";
function App() {
  return (
    <div className="articleapp">
      <nav>
        <ul>
          <li>
            <button type="button">Current News</button>
          </li>
          <li>
            <button type="button">Some News</button>
          </li>
          <li>
            <button type="button">Global News</button>
          </li>
        </ul>
      </nav>
      <header className="titleofpage">
        <h2>The Debra Chronicles</h2>
      </header>
      <CustomUser />
      <ArticleForm />
      <ArticleList />
      <ArticleList />
    </div>
  );
}

export default App;
