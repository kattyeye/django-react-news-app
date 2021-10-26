import Cookies from "js-cookie";
import { useState } from "react";

function DraftArticle(props) {
  const [state, setState] = useState({
    title: "",
    body: "",
    phase: "",
  });

  async function submitToAdmin(e) {
    e.preventDefault();

    const state = props.articleList.find(
      (item) => item.id === parseInt(e.target.value)
    );

    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("body", state.body);
    formData.append("phase", e.target.dataset.phase);

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch(
      `/api_v1/articles/${e.target.value}/`,
      options
    ).catch(props.handleError);
    if (!response) {
      console.log(response);
    } else {
      const data = await response.json();
      props.setArticleList(data);
    }
    if ("DRA") {
      props.history.push("/articles/drafts");
    } else {
      props.history.push("/");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className="content col-8" key={props.article.id}>
      <section className="">
        <input type="text" value={state.title} onChange={handleChange} />
        <input type="file" />
      </section>
      <section className="text">
        <p style={{ fontStyle: "italic" }}>
          by {props.article.author} <br></br> phase: {props.article.phase}
        </p>

        <textarea
          type="text"
          style={{ width: "80%" }}
          value={state.body}
          onChange={handleChange}
        />
        <button
          type="button"
          className="btn btn-success mt-3"
          name="DRA"
          value={props.article.id}
          data-phase="SUB"
          onClick={submitToAdmin}
        >
          Submit for Publishing
        </button>
        <button
          type="button"
          className="btn btn-success mt-3"
          name="DRA"
          value={props.article.id}
          data-phase="DRA"
          onClick={submitToAdmin}
        >
          Save
        </button>
      </section>
    </form>
  );
}
export default DraftArticle;
