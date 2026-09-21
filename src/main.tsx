import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// ID root — nilai sama, diekstrak + pesan error lebih jelas. Tanpa ubah render.
const ROOT_ELEMENT_ID = 'root';

const rootEl = document.getElementById(ROOT_ELEMENT_ID);

if (!rootEl) {
  throw new Error(`Root element #${ROOT_ELEMENT_ID} tidak ditemukan`);
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
