import * as React from 'react';
import App from './App';
import WebviewApp from './WebviewApp';
export default function AppWrapper() {
  const [appMode, setAppMode] = React.useState('MAIN');

  return appMode === 'MAIN' ? (
    <App setAppMode={setAppMode} />
  ) : (
    <WebviewApp setAppMode={setAppMode} />
  );
}
