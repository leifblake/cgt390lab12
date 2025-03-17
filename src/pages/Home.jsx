import React from 'react';
import Card from '../components/Card';
import Wrapper from '../components/Wrapper';

const Home = ({ profiles, searchTerm, setSearchTerm, selectedRole, setSelectedRole }) => {
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole ? profile.role === selectedRole : true;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="container">
      <h1 className="profile-title">Profile App</h1>
      
      <div className="filter-container">
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <select 
          value={selectedRole} 
          onChange={(e) => setSelectedRole(e.target.value)} 
        >
          <option value="">Filter by role</option>
          <option value="Web Developer">Web Developer</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
          <option value="Sound Designer">Sound Designer</option>
          <option value="Animation and VFX">Animation and VFX</option>
          <option value="Illustrator">Illustrator</option>
        </select>
        <button onClick={() => { setSearchTerm(''); setSelectedRole(''); }}>Reset</button>
      </div>

      <Wrapper>
        {filteredProfiles.map((profile, index) => (
          <Card 
            key={index} 
            name={profile.name} 
            role={profile.role} 
            image={profile.image} 
          />
        ))}
      </Wrapper>
    </div>
  );
};

export default Home;
