import { useState, useRef, useEffect } from "react";
import { Plus, Check, X, ChevronDown } from "lucide-react";
import "./ProfileSelector.css";

export default function ProfileSelector({
  profiles,
  activeProfile,
  onSwitchProfile,
  onCreateProfile,
  onDeleteProfile,
  onSaveProfile,
  currentStocks,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const dropdownRef = useRef(null);

  const activeProfileData = profiles.find(p => p.id === activeProfile);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateProfile = () => {
    if (newProfileName.trim()) {
      onCreateProfile(newProfileName, currentStocks);
      setNewProfileName("");
      setShowCreateModal(false);
      setIsOpen(false);
    }
  };

  const handleSaveProfile = (profileId) => {
    onSaveProfile(profileId, currentStocks);
  };

  const handleDeleteProfile = (profileId, e) => {
    e.stopPropagation();
    if (window.confirm("Delete this profile and all its stocks?")) {
      onDeleteProfile(profileId);
    }
  };

  const handleSwitchProfile = (profileId, e) => {
    e.stopPropagation();
    onSwitchProfile(profileId);
    setIsOpen(false);
  };

  return (
    <div className="profile-selector-container" ref={dropdownRef}>
      <button
        className="profile-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
        title={`Active: ${activeProfileData?.name || "Default"}`}
      >
        <span>{activeProfileData?.name || "Default"}</span>
        <ChevronDown
          size={16}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        />
      </button>

      {isOpen && (
        <div className="profile-dropdown">
          {profiles.length === 0 ? (
            <div className="no-profiles-msg">No profiles yet</div>
          ) : (
            <div className="profile-list">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className={`profile-item ${activeProfile === profile.id ? "active" : ""}`}
                  onClick={(e) => handleSwitchProfile(profile.id, e)}
                >
                  <div className="profile-info">
                    <span className="profile-name">{profile.name}</span>
                    <span className="stock-count">
                      {profile.stocks?.length || 0} stocks
                    </span>
                  </div>

                  <div className="profile-actions">
                    <button
                      className="icon-btn save-btn"
                      title="Save current stocks to this profile"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveProfile(profile.id);
                      }}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      className="icon-btn delete-btn"
                      title="Delete profile"
                      onClick={(e) => handleDeleteProfile(profile.id, e)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            className="create-profile-btn"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={16} />
            Create Profile
          </button>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Create New Profile</h3>
            <input
              type="text"
              placeholder="Profile name"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateProfile();
                } else if (e.key === "Escape") {
                  setShowCreateModal(false);
                  setNewProfileName("");
                }
              }}
              autoFocus
              className="profile-name-input"
            />

            <div className="modal-actions">
              <button
                className="btn-save"
                onClick={handleCreateProfile}
                disabled={!newProfileName.trim()}
              >
                <Check size={16} /> Save
              </button>
              <button
                className="btn-cancel"
                onClick={() => {
                  setShowCreateModal(false);
                  setNewProfileName("");
                }}
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
