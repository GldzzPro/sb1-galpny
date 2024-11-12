export {};

declare global {
  interface MyComponentProps {
    title: string;
    data: { foo: string };
  }
  interface Window {
    MyComponent: React.FC<MyComponentProps>;
  }
}
