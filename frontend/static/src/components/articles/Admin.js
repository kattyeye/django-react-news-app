import { withRouter } from "react-router";
import Cookies from "js-cookie";
function Admin(props) {
  async function changeToPublished(event) {
    event.preventDefault();
    const phase = props.article.phase;
    console.log({ article: props.article });
    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: phase,
    };
    const response = await fetch(
      `/api_v1/articles/${event.target.value}`,
      options
    );
    if (!response) {
      console.log(response);
    } else {
      const data = await response.json();
    }
  }

  return <div></div>;
}

export default withRouter(Admin);
