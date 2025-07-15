import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import { DocsPage } from './pages/Docs/Docs.page';
import { AppFocusContextProvider } from './contexts/AppFocus.context';

function App() {
  console.log('App loaded');
  return (
    <BrowserRouter>
      <AppFocusContextProvider>
        <Routes>
          <Route path="/" element={ <DocsPage /> } />
        </Routes>
      </AppFocusContextProvider>
    </BrowserRouter>
  );
}

export default App;
