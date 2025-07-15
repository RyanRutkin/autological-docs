import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import { DocsPage } from './pages/Docs/Docs.page';

function App() {
  console.log('App loaded');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <DocsPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
