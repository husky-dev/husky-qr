import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { MainPage } from './pages';

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(<MainPage />);
}
