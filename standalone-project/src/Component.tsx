const MyComponent =
  (React: typeof import("react")): React.FC<MyComponentProps> =>
  ({ title, data }) =>
    (
      <div>
        <h2>{title}</h2>
        <p>{data.foo}</p>
      </div>
    );

export default MyComponent;
