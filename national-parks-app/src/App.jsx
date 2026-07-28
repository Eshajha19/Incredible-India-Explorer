import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const ParkDetailsPage = React.lazy(() => import('./pages/ParkDetailsPage'));

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#05110b] text-white selection:bg-amber-400 selection:text-[#05110b] flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-grow w-full">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/parks/:id" element={<ParkDetailsPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
