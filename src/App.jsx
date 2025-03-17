import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddProfile from './pages/AddProfile';
import About from './pages/About';
import NotFound from './pages/NotFound';
import ProfileDetail from './pages/ProfileDetail';
import EditProfile from './pages/EditProfile';
import headshot1 from './assets/headshot1.png'; 
import headshot2 from './assets/headshot2.png';
import headshot3 from './assets/headshot3.png';
import headshot4 from './assets/headshot4.png';
import headshot5 from './assets/headshot5.png';
import headshot6 from './assets/headshot6.png';
import headshot7 from './assets/headshot7.png';
import headshot8 from './assets/headshot8.png';
import './index.css';


const App = () => {
  const [theme, setTheme] = useState('light');

  // Initial static profiles
  const initialProfiles = [
    { id: '1', name: 'Isabelle', role: 'Web Developer', image: headshot1 },
    { id: '2', name: 'Tom Nook', role: 'UI/UX Designer', image: headshot2 },
    { id: '3', name: 'KK Slider', role: 'Sound Designer', image: headshot3 },
    { id: '4', name: 'Celeste', role: 'Animation and VFX', image: headshot4 },
    { id: '5', name: 'Mabel', role: 'Animation and VFX', image: headshot5 },
    { id: '6', name: 'Rover', role: 'Web Developer', image: headshot6 },
    { id: '7', name: 'Harriet', role: 'UI/UX Designer', image: headshot7 },
    { id: '8', name: 'Kappn', role: 'Illustrator', image: headshot8 },
  ];

  const [profiles, setProfiles] = useState(initialProfiles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/profiles');
        const profilesData = await response.json();
        setProfiles([...initialProfiles, ...profilesData]); // Combine API data with initial ones
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
    fetchProfiles();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const addProfile = (profile) => {
    setProfiles([...profiles, profile]);
  };

  return (
    <div className={`app ${theme}`}>
      <header>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
      </header>
      <main>
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              profiles={profiles} 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              selectedRole={selectedRole} 
              setSelectedRole={setSelectedRole} 
            />
          } 
        />
        <Route path="/add-profile" element={<AddProfile addProfile={addProfile} theme={theme} />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:id" element={<ProfileDetail profiles={profiles}  theme={theme} />} />
        <Route path="/profile/:id/edit" element={<EditProfile profiles={profiles} setProfiles={setProfiles} theme={theme} />} />
        <Route path="*" element={<NotFound />} />
    </Routes>

      </main>
    </div>
  );
};

export default App;
