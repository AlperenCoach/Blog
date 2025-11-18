import './pages.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const fallbackStats = [
  { label: 'Drafts', value: '—' },
  { label: 'Published', value: '—' },
  { label: 'Followers', value: '—' },
];

export default function MyProfile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="page page--profile">
        <h1>My Profile</h1>
        <p className="myProfileEmpty">We couldn’t load your profile. Please sign in again.</p>
      </section>
    );
  }

  const stats = user.stats || fallbackStats;
  const infoItems = [
    { label: 'Email', value: user.email },
    { label: 'Username', value: user.username },
    user.fullName && { label: 'Full Name', value: user.fullName },
    user.phoneNumber && { label: 'Phone Number', value: user.phoneNumber },
    user.bio && { label: 'Bio', value: user.bio },
    { label: 'Status', value: user.isActive ? 'Active' : 'Inactive' },
    user.createdAt && { label: 'Member Since', value: new Date(user.createdAt).toLocaleDateString() },
    user.updatedAt && { label: 'Updated', value: new Date(user.updatedAt).toLocaleDateString() },
  ].filter(Boolean);

  return (
    <section className="page page--profile">
      <header className="profileHeader">
        <div className="profileIdentity">
          <img
            className="profileAvatar"
            src={
              user.profilePicture ||
              'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=facearea&w=300&q=80'
            }
            alt={user.fullName || user.username || 'Profile avatar'}
          />
          <div>
            <p className="profileEyebrow">Personal workspace</p>
            <h1>{user.fullName || user.username || 'My Profile'}</h1>
            <p className="profileSubtitle">{user.bio || 'Share a short bio to introduce yourself.'}</p>
          </div>
        </div>
        <div className="profileHeaderActions">
          <Link className="profileEditLink" to="/profile/edit">
            Edit profile
          </Link>
          <Link className="profileEditLink profileEditLink--ghost" to="/write">
            Write a post
          </Link>
        </div>
      </header>

      <section className="profileStats">
        {stats.map((stat) => (
          <article key={stat.label} className="profileStatCard">
            <p className="profileStatLabel">{stat.label}</p>
            <p className="profileStatValue">{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="profileInfoGrid">
        {infoItems.map((item) => (
          <div key={item.label} className="profileInfoItem">
            <p className="profileInfoLabel">{item.label}</p>
            <p className="profileInfoValue">{item.value}</p>
          </div>
        ))}
      </section>
    </section>
  );
}
