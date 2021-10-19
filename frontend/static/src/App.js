import logo from "./logo.svg";
import "./App.css";
import CustomUser from "./custom-user/CustomUser";
import ArticleList from "./articles/ArticleList";

function App() {
  return (
    <div className="App">
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
      <CustomUser />
      <ArticleList />
    </div>
  );
}

export default App;
