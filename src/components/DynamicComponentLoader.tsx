import React, { useEffect, useState } from "react";
const load = (script: string) => {
  type Loader = (...args: unknown[]) => void;
  let module;
  const define = function (...args: [Loader] | [string[], Loader]) {
    module =
      args.length === 1
        ? args[0]()
        : (() => {
            throw new Error(`unknown deps : ${args[0]}`);
          })();
  };
  define.amd = true;
  console.log({ script });
  eval(script);
  return module;
};

const DynamicComponentLoader = ({
  url,
  componentProps,
}: {
  url: string;
  componentProps: MyComponentProps;
}) => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      // Load the script dynamically
      Object.assign(window, { React });
      const script = await fetch(url).then((res) => res.text());
      const module = load(script);
      const Component = module(React);
      console.log(Component);
      setComponent(Component);
    };

    loadComponent();
  }, [url]);

  console.log({ componentProps });
  if (!Component) return <div>Loading...</div>;
  return <Component title={78} data={{ foo: "hhh" }} />;
};

export default DynamicComponentLoader;
