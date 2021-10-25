export default function Footer(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <footer
        style={{
          display: "flex",
          bottom: "5px",
        }}
      >
        ©2021 made by
        <strong>
          <a
            style={{
              textDecoration: "none",
            }}
            href="https://github.com/kattyeye"
          >
            {" "}
            kattyeye
          </a>
        </strong>
      </footer>
    </div>
  );
}
