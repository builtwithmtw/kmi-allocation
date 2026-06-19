import { useState } from "react";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import "./ProfileManager.css";

export default function ProfileManager({
  profiles,
  activeProfile,
  onCreateProfile,
  onSwitchProfile,
  onDeleteProfile,
  onRenameProfile,
}) {
  const [showNewProfile, setShowNewProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const handleCreateProfile = () => {
    if (newProfileName.trim()) {
      onCreateProfile(newProfileName);
      setNewProfileName("");
      setShowNewProfile(false);
    }
  };

  const handleRenameProfile = (profileId, newName) => {
    if (newName.trim()) {
      onRenameProfile(profileId, newName);
      setEditingId(null);
      setEditingName("");
    }
  };

  const handleDeleteProfile = (profileId) => {
    if (window.confirm("Delete this profile? This action cannot be undone.")) {
      onDeleteProfile(profileId);
    }
  };

  return (
    <div className="profile-manager">
      <div className="profile-header">
        <h3>Allocation Profiles</h3>
      </div>

      <div className="profile-list">
        {profiles.length === 0 ? (
          <div className="no-profiles">No profiles yet. Create one to get started.</div>
        ) : (
          profiles.map((profile) => (
            <div
              key={profile.id}
              className={`profile-item ${activeProfile === profile.id ? "active" : ""}`}
            >
              {editingId === profile.id ? (
                <div className="profile-edit">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleRenameProfile(profile.id, editingName);
                      }
                    }}
                    autoFocus
                    className="profile-input"
                  />
                  <button
                    onClick={() => handleRenameProfile(profile.id, editingName)}
                    className="icon-btn confirm-btn"
                    title="Confirm"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingName("");
                    }}
                    className="icon-btn cancel-btn"
                    title="Cancel"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => onSwitchProfile(profile.id)}
                    className="profile-btn"
                    title={`Switch to ${profile.name}`}
                  >
                    <span className="profile-name">{profile.name}</span>
                    <span className="stock-count">({profile.stocks?.length || 0})</span>
                  </button>
                  <div className="profile-actions">
                    <button
                      onClick={() => {
                        setEditingId(profile.id);
                        setEditingName(profile.name);
                      }}
                      className="icon-btn edit-btn"
                      title="Rename"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="icon-btn delete-btn"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {!showNewProfile ? (
        <button onClick={() => setShowNewProfile(true)} className="new-profile-btn">
          <Plus size={16} />
          New Profile
        </button>
      ) : (
        <div className="new-profile-form">
          <input
            type="text"
            placeholder="Profile name"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateProfile();
              } else if (e.key === "Escape") {
                setShowNewProfile(false);
                setNewProfileName("");
              }
            }}
            autoFocus
            className="profile-input"
          />
          <button onClick={handleCreateProfile} className="icon-btn confirm-btn">
            <Check size={14} />
          </button>
          <button
            onClick={() => {
              setShowNewProfile(false);
              setNewProfileName("");
            }}
            className="icon-btn cancel-btn"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
