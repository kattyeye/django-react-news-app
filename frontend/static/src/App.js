import "./App.css";
import CustomUser from "./custom-user/CustomUser";
import ArticleList from "./articles/ArticleList";
import ArticleForm from "./articles/ArticleForm";
import RegistrationForm from "./registration/RegistrationForm";
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
      <RegistrationForm />
    </div>
  );
}

export default App;
