import { useDidUpdate } from "../src/useDidUpdate";
import React, { useState } from "react";

const storyName = "use-did-update";

export const App = ({ changed }: { changed: boolean }) => {
  const [updateRender, setUpdateRender] = useState(false);

  useDidUpdate(() => {
    setUpdateRender(true);
  }, [changed]);

  return (
    <div>
      <p>I appear on initial render. Update "changed" state.</p>
      {updateRender && <p>I appear after render is updated.</p>}
    </div>
  );
};
App.storyName = "basic example";

export default {
  title: `react-hooks/${storyName}`,
  component: App,
  args: {
    changed: false
  }
};
