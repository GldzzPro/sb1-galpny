import React from 'react';
import ExternalScriptLoader from './components/ExternalScriptLoader';

function App() {
  // Example props to pass to external component
  const exampleProps = {
    title: 'External Component',
    data: { foo: 'bar' },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          External Component Demo
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ExternalScriptLoader
            scriptUrl="https://example.com/external-component.js"
            componentName="ExternalComponent"
            props={exampleProps}
          />
        </div>
      </div>
    </div>
  );
}

export default App;