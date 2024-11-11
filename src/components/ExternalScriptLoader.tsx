import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface ExternalScriptLoaderProps {
  scriptUrl: string;
  componentName: string;
  props?: Record<string, unknown>;
}

const ExternalScriptLoader: React.FC<ExternalScriptLoaderProps> = ({
  scriptUrl,
  componentName,
  props = {},
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set props on window object for external component
    window.__EXTERNAL_COMPONENT_PROPS__ = props;

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;

    const handleLoad = () => {
      setLoading(false);
    };

    const handleError = () => {
      setError('Failed to load external component');
      setLoading(false);
    };

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
      document.body.removeChild(script);
      delete window.__EXTERNAL_COMPONENT_PROPS__;
    };
  }, [scriptUrl, props]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <DefaultFallback error={error} />;
  }

  const ExternalComponent = (window as any)[componentName];
  return ExternalComponent ? <ExternalComponent {...props} /> : <DefaultFallback />;
};

const DefaultFallback: React.FC<{ error?: string }> = ({ error }) => {
  return (
    <div className="rounded-lg bg-red-50 p-6 border border-red-100">
      <div className="flex items-center gap-3 text-red-800">
        <AlertCircle className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Component Load Error</h3>
      </div>
      <p className="mt-2 text-red-700">
        {error || 'The external component could not be loaded.'}
      </p>
      <p className="mt-1 text-sm text-red-600">
        Please check the component URL and try again later.
      </p>
    </div>
  );
};

export default ExternalScriptLoader;