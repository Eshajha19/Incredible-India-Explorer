import React, { useState } from 'react';
import Hero from '../components/Hero';
import Introduction from '../components/Introduction';
import StatCard from '../components/StatCard';
import FeaturedParks from '../components/FeaturedParks';
import IndiaMap from '../components/IndiaMap';
import DidYouKnow from '../components/DidYouKnow';
import { Trees, PawPrint, Award, MapPin } from 'lucide-react';

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const handleReset = () => {
    setSearchTerm('');
    setSelectedState('all');
    setSelectedRegion('all');
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* Introduction Section */}
      <Introduction />

      {/* Animated Statistics Section */}
      <section id="stats-section" className="py-16 px-6 md:px-10 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard icon={Trees} targetValue={106} suffix="+" label="National Parks" delay={1} />
          <StatCard icon={PawPrint} targetValue={54} suffix="+" label="Tiger Reserves" delay={2} />
          <StatCard icon={Award} targetValue={8} suffix="+" label="UNESCO Sites" delay={3} />
          <StatCard icon={MapPin} targetValue={28} suffix="+" label="States Covered" delay={4} />
        </div>
      </section>

      {/* Interactive India Map */}
      <IndiaMap
        selectedState={selectedState}
        onSelectState={(st) => {
          setSelectedState(st);
          setSelectedRegion('all');
        }}
      />

      {/* Featured National Parks Hub */}
      <FeaturedParks
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedState={selectedState}
        onStateChange={setSelectedState}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        onReset={handleReset}
      />

      {/* Did You Know Section */}
      <DidYouKnow />
    </div>
  );
}
