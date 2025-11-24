import { useState } from 'react';
import './pages.css';
import avatarPlaceholder from '../assets/unknownperson.png';

const initialProfile = {
  name: 'Alperen Coach',
  title: 'Product-Focused Full-Stack Developer',
  location: 'İstanbul · Remote friendly',
  website: 'https://alpi.dev',
  availability: 'Currently collaborating with early-stage teams',
  bio: `Fueled by curiosity and user empathy. I build lean products, automate boring work,
and write about what I’m learning on the way to becoming an applied AI engineer.`,
  skills: ['React', 'Node.js', 'Automation', 'N8N', 'Supabase', 'System Design'],
};

const quickStats = [
  { label: 'Shipped experiments', value: '28', accent: 'experiments' },
  { label: 'People mentored', value: '45+', accent: 'mentorship' },
  { label: 'Writing streak', value: '126 days', accent: 'writing' },
];

const highlightBadges = [
  'Indie maker · Night owl · Systems nerd',
  'Document everything',
  'Fail fast, write faster',
];

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [formState, setFormState] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    setProfile(formState);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormState(profile);
    setIsEditing(false);
  };

  return (
    <section className="page profilePage">
      <div className="profileCard">
        <div className="profileHeader">
          <div className="profileAvatar">
            <img src={avatarPlaceholder} alt="Profile avatar" />
          </div>
          <div className="profileHeaderContent">
            <div className="profileTitleRow">
              <h1>{profile.name}</h1>
              <span className="profileStatus">{profile.availability}</span>
            </div>
            <p className="profileRole">{profile.title}</p>
            <p className="profileLocation">{profile.location}</p>
            <div className="profileLinks">
              <a href={profile.website} target="_blank" rel="noreferrer">
                Visit website
              </a>
              <button type="button" className="ghost" onClick={() => setIsEditing(true)}>
                Edit profile
              </button>
            </div>
          </div>
        </div>

        <p className="profileBio">{profile.bio}</p>

        <div className="profileBadges">
          {highlightBadges.map((text) => (
            <span key={text}>{text}</span>
          ))}
        </div>

        <ul className="profileHighlights">
          {quickStats.map((item) => (
            <li key={item.label} className={`profileHighlight ${item.accent}`}>
              <span>{item.value}</span>
              <p>{item.label}</p>
            </li>
          ))}
        </ul>

        <div className="profileSkills">
          {profile.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>

      {isEditing && (
        <form className="profileEditForm" onSubmit={handleSave}>
          <div className="profileEditGrid">
            <label>
              Name
              <input name="name" value={formState.name} onChange={handleChange} />
            </label>
            <label>
              Title
              <input name="title" value={formState.title} onChange={handleChange} />
            </label>
            <label>
              Location
              <input name="location" value={formState.location} onChange={handleChange} />
            </label>
            <label>
              Website
              <input name="website" value={formState.website} onChange={handleChange} />
            </label>
          </div>

          <label>
            Availability headline
            <input name="availability" value={formState.availability} onChange={handleChange} />
          </label>

          <label>
            Bio
            <textarea
              name="bio"
              rows={4}
              value={formState.bio}
              onChange={handleChange}
            />
          </label>

          <label>
            Skills (comma separated)
            <input
              name="skills"
              value={formState.skills.join(', ')}
              onChange={(event) => {
                const tokens = event.target.value
                  .split(',')
                  .map((token) => token.trim())
                  .filter(Boolean);
                setFormState((prev) => ({ ...prev, skills: tokens }));
              }}
            />
          </label>

          <div className="profileEditActions">
            <button type="submit">Save changes</button>
            <button type="button" className="ghost" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}