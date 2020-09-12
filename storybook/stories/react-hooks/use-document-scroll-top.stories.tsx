import React from "react";
import README from "@wbe/use-document-scroll-top/README.md";
import useDocumentScrollTop from "@wbe/use-document-scroll-top";
import "../../global-style.css";

const storyName = "use-document-scroll-top";

export const App = () => {
  const documentScrollTop: number = useDocumentScrollTop();
  return (
    <div>
      <div style={{ height: "1000vh" }} />
      <p style={{ position: "fixed", top: "1rem" }}>
        Scroll & check document scrollTop change. <br />
        <strong>{documentScrollTop}</strong>
      </p>
    </div>
  );
};

App.storyName = "basic example";

export default {
  title: `react-hooks/${storyName}`,
  component: App,
  parameters: {
    readme: {
      sidebar: README
    }
  }
};
