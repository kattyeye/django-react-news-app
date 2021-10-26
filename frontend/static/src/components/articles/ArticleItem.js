import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ArticleItem(props) {
  let article = props.article;
  return (
    <div>
      <section className="blog-hero-section">
        <h2 className="article-title">{article.title}</h2>
        {article.image && (
          <img id="hero-img" src={article.image} alt="image-for-news-article" />
        )}
      </section>
      <section className="text">
        <span style={{ fontStyle: "italic" }} className="author-name-text">
          submitted by <strong>@{article.author}</strong>
        </span>
        <p className="info">{article.body}</p>
      </section>
      <>
        <Button variant="primary" onClick={props.handleShow}>
          Read more
        </Button>

        <Modal
          size="lg"
          show={props.lgShow}
          onHide={() => props.setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {article.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{article.body}</Modal.Body>
        </Modal>
      </>
    </div>
  );
}
