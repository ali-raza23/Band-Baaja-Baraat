import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import SearchVenue from './components/searchvenue';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/search" element={<SearchVenue />} />
        <Route path="/" element={<Navigate to="/search" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;