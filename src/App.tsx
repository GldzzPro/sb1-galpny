import React from "react";
import DynamicComponentLoader from "./components/DynamicComponentLoader";

const App = () => {
  const componentUrl = "/standalone-project/dist/my-component.umd.js"; // URL for each school’s custom component
  const exampleProps = {
    title: "External Component",
    data: { foo: "bar" },
  };

  return (
    <div>
      <h1>Main App</h1>
      <DynamicComponentLoader
        url={componentUrl}
        componentProps={exampleProps}
      />
    </div>
  );
};

export default App;
