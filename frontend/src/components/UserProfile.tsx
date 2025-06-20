import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth()
  const [showProfile, setShowProfile] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const userName = user?.user_metadata?.full_name || 'User'
  const healthcareDomain = user?.user_metadata?.healthcare_domain
  const displayInitial = userName.charAt(0).toUpperCase()

  const formatHealthcareDomain = (domain: string) => {
    if (!domain) return null
    return domain.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      zIndex: 1000,
    }}>
      <button
        onClick={() => setShowProfile(!showProfile)}
        style={{
          backgroundColor: '#5352ed',
          color: 'white',
          border: 'none',
          padding: '12px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: '#27eab6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          color: 'white',
        }}>
          {displayInitial}
        </div>
        {userName}
      </button>

      {showProfile && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          marginTop: '8px',
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '20px',
          minWidth: '280px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}>
          <div style={{
            marginBottom: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid #333',
          }}>
            <div style={{
              color: '#27eab6',
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}>
              {userName}
            </div>
            {healthcareDomain && (
              <div style={{
                color: '#ffa502',
                fontSize: '14px',
                marginBottom: '8px',
                fontWeight: '500',
              }}>
                {formatHealthcareDomain(healthcareDomain)}
              </div>
            )}
            <div style={{
              color: '#ccc',
              fontSize: '12px',
              wordBreak: 'break-all',
            }}>
              {user?.email}
            </div>
          </div>

          <button
            onClick={handleSignOut}
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: '#ff4757',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#ff3742'}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#ff4757'}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default UserProfile 