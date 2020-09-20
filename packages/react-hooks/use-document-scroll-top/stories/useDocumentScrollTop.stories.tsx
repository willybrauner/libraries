// @ts-ignore
import { useDocumentScrollTop } from "../src/useDocumentScrollTop";
import React from "react";
import "../../../../storybook/global-style.css";

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
  component: App
};
