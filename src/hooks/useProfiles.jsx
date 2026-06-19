import { useEffect, useState } from "react";

const PROFILES_KEY = "allocation_profiles";
const ACTIVE_PROFILE_KEY = "active_profile";

export function useProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [activeProfile, setActiveProfile] = useState(null);

  // Load profiles from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(PROFILES_KEY);
    const active = localStorage.getItem(ACTIVE_PROFILE_KEY);

    if (saved) {
      const parsedProfiles = JSON.parse(saved);
      setProfiles(parsedProfiles);

      if (active && parsedProfiles.find(p => p.id === active)) {
        setActiveProfile(active);
      } else if (parsedProfiles.length > 0) {
        setActiveProfile(parsedProfiles[0].id);
      }
    }
  }, []);

  // Save profiles to localStorage
  const syncProfiles = (updated) => {
    setProfiles(updated);
    localStorage.setItem(PROFILES_KEY, JSON.stringify(updated));
  };

  // Save active profile to localStorage
  const syncActiveProfile = (profileId) => {
    setActiveProfile(profileId);
    localStorage.setItem(ACTIVE_PROFILE_KEY, profileId);
  };

  // Create a new profile
  const createProfile = (name, stocks = []) => {
    const newProfile = {
      id: Date.now().toString(),
      name,
      stocks: Array.isArray(stocks) ? stocks : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...profiles, newProfile];
    syncProfiles(updated);
    syncActiveProfile(newProfile.id);

    return newProfile;
  };

  // Save stocks to a specific profile
  const saveProfile = (profileId, stocks) => {
    const updated = profiles.map(p =>
      p.id === profileId
        ? { ...p, stocks: Array.isArray(stocks) ? stocks : [], updatedAt: new Date().toISOString() }
        : p
    );
    syncProfiles(updated);
  };

  // Update active profile's stocks
  const updateProfileStocks = (stocks) => {
    const updated = profiles.map(p =>
      p.id === activeProfile
        ? { ...p, stocks, updatedAt: new Date().toISOString() }
        : p
    );
    syncProfiles(updated);
  };

  // Switch to a different profile
  const switchProfile = (profileId) => {
    if (profiles.find(p => p.id === profileId)) {
      syncActiveProfile(profileId);
    }
  };

  // Rename a profile
  const renameProfile = (profileId, newName) => {
    const updated = profiles.map(p =>
      p.id === profileId
        ? { ...p, name: newName, updatedAt: new Date().toISOString() }
        : p
    );
    syncProfiles(updated);
  };

  // Delete a profile
  const deleteProfile = (profileId) => {
    const updated = profiles.filter(p => p.id !== profileId);
    syncProfiles(updated);

    if (activeProfile === profileId) {
      if (updated.length > 0) {
        syncActiveProfile(updated[0].id);
      } else {
        setActiveProfile(null);
      }
    }
  };

  // Get active profile data
  const getActiveProfileData = () => {
    return profiles.find(p => p.id === activeProfile);
  };

  return {
    profiles,
    activeProfile,
    createProfile,
    saveProfile,
    switchProfile,
    renameProfile,
    deleteProfile,
    updateProfileStocks,
    getActiveProfileData,
  };
}

export default useProfiles;
