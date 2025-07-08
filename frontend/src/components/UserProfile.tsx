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
      position: 'relative',
      zIndex: 1000,
    }}>
      <button
        onClick={() => setShowProfile(!showProfile)}
        style={{
          backgroundColor: '#1A1F71',
          color: '#F9F9F9',
          border: '2px solid rgba(26, 31, 113, 0.2)',
          padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px)',
          borderRadius: 'clamp(8px, 2vw, 12px)',
          cursor: 'pointer',
          fontSize: 'clamp(12px, 3vw, 14px)',
          fontWeight: '600',
          fontFamily: 'Montserrat, sans-serif',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(6px, 1.5vw, 8px)',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(26, 31, 113, 0.15)',
          minHeight: '44px' // Touch-friendly minimum
        }}
        onMouseEnter={(e) => {
          const target = e.target as HTMLButtonElement
          target.style.backgroundColor = '#2A2F81'
          target.style.borderColor = '#2A2F81'
          target.style.transform = 'translateY(-1px)'
          target.style.boxShadow = '0 4px 12px rgba(42, 47, 129, 0.25)'
        }}
        onMouseLeave={(e) => {
          const target = e.target as HTMLButtonElement
          target.style.backgroundColor = '#1A1F71'
          target.style.borderColor = 'rgba(26, 31, 113, 0.2)'
          target.style.transform = 'translateY(0)'
          target.style.boxShadow = '0 2px 8px rgba(26, 31, 113, 0.15)'
        }}
      >
        <div style={{
          width: 'clamp(24px, 6vw, 28px)',
          height: 'clamp(24px, 6vw, 28px)',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'clamp(11px, 2.5vw, 13px)',
          fontWeight: 'bold',
          color: '#1A1F71',
          letterSpacing: '0.5px'
        }}>
          {displayInitial}
        </div>
        <span style={{
          display: window.innerWidth < 480 ? 'none' : 'block',
          maxWidth: 'clamp(60px, 15vw, 120px)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {userName}
        </span>
        <div style={{
          fontSize: 'clamp(10px, 2.5vw, 12px)',
          transform: showProfile ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.3s ease'
        }}>
          ▼
        </div>
      </button>

      {showProfile && (
        <>
          {/* Mobile Overlay */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
              display: window.innerWidth < 768 ? 'block' : 'none'
            }}
            onClick={() => setShowProfile(false)}
          />
          
          <div style={{
            position: window.innerWidth < 768 ? 'fixed' : 'absolute',
            top: window.innerWidth < 768 ? '50%' : '100%',
            left: window.innerWidth < 768 ? '50%' : 'auto',
            right: window.innerWidth < 768 ? 'auto' : '0',
            transform: window.innerWidth < 768 ? 'translate(-50%, -50%)' : 'none',
            marginTop: window.innerWidth < 768 ? '0' : '12px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(26, 31, 113, 0.1)',
            borderRadius: 'clamp(12px, 3vw, 16px)',
            padding: 'clamp(20px, 5vw, 24px)',
            minWidth: window.innerWidth < 768 ? '90vw' : '300px',
            maxWidth: window.innerWidth < 768 ? '90vw' : '350px',
            boxShadow: window.innerWidth < 768 
              ? '0 20px 60px rgba(26, 31, 113, 0.3)' 
              : '0 8px 24px rgba(26, 31, 113, 0.15)',
            zIndex: 1001,
            animation: 'slideIn 0.3s ease-out'
          }}>
            {/* Close button for mobile */}
            {window.innerWidth < 768 && (
              <button
                onClick={() => setShowProfile(false)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#4B4B4B',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            )}

            <div style={{
              marginBottom: '20px',
              paddingBottom: '20px',
              borderBottom: '1px solid rgba(26, 31, 113, 0.1)',
              textAlign: 'center'
            }}>
              {/* Profile Avatar */}
              <div style={{
                width: 'clamp(60px, 15vw, 80px)',
                height: 'clamp(60px, 15vw, 80px)',
                borderRadius: '50%',
                backgroundColor: '#3DD6D0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(24px, 6vw, 32px)',
                fontWeight: 'bold',
                color: '#1A1F71',
                margin: '0 auto 16px auto',
                border: '3px solid rgba(26, 31, 113, 0.1)'
              }}>
                {displayInitial}
              </div>

              <div style={{
                fontFamily: 'Montserrat, sans-serif',
                color: '#1A1F71',
                fontSize: 'clamp(16px, 4vw, 18px)',
                fontWeight: '700',
                marginBottom: '8px',
                lineHeight: '1.2'
              }}>
                {userName}
              </div>
              
              {healthcareDomain && (
                <div style={{
                  backgroundColor: '#F0F8FF',
                  color: '#3DD6D0',
                  fontSize: 'clamp(12px, 3vw, 14px)',
                  fontWeight: '600',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  display: 'inline-block',
                  marginBottom: '12px',
                  border: '1px solid rgba(61, 214, 208, 0.2)'
                }}>
                  {formatHealthcareDomain(healthcareDomain)}
                </div>
              )}
              
              <div style={{
                color: '#4B4B4B',
                fontSize: 'clamp(11px, 2.5vw, 13px)',
                fontWeight: '500',
                wordBreak: 'break-all',
                opacity: 0.8
              }}>
                {user?.email}
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{
                backgroundColor: '#F9F9F9',
                padding: 'clamp(12px, 3vw, 16px)',
                borderRadius: 'clamp(8px, 2vw, 10px)',
                textAlign: 'center',
                border: '1px solid rgba(26, 31, 113, 0.05)'
              }}>
                <div style={{
                  fontSize: 'clamp(16px, 4vw, 20px)',
                  fontWeight: 'bold',
                  color: '#1A1F71',
                  marginBottom: '4px'
                }}>
                  12
                </div>
                <div style={{
                  fontSize: 'clamp(10px, 2.5vw, 12px)',
                  color: '#4B4B4B',
                  fontWeight: '500'
                }}>
                  Sessions
                </div>
              </div>
              <div style={{
                backgroundColor: '#F9F9F9',
                padding: 'clamp(12px, 3vw, 16px)',
                borderRadius: 'clamp(8px, 2vw, 10px)',
                textAlign: 'center',
                border: '1px solid rgba(26, 31, 113, 0.05)'
              }}>
                <div style={{
                  fontSize: 'clamp(16px, 4vw, 20px)',
                  fontWeight: 'bold',
                  color: '#3DD6D0',
                  marginBottom: '4px'
                }}>
                  85%
                </div>
                <div style={{
                  fontSize: 'clamp(10px, 2.5vw, 12px)',
                  color: '#4B4B4B',
                  fontWeight: '500'
                }}>
                  Accuracy
                </div>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              style={{
                width: '100%',
                padding: 'clamp(12px, 3vw, 16px)',
                backgroundColor: '#DC2626',
                color: '#F9F9F9',
                border: 'none',
                borderRadius: 'clamp(8px, 2vw, 10px)',
                cursor: 'pointer',
                fontSize: 'clamp(13px, 3vw, 14px)',
                fontWeight: '600',
                fontFamily: 'Montserrat, sans-serif',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement
                target.style.backgroundColor = '#B91C1C'
                target.style.transform = 'translateY(-1px)'
                target.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.35)'
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement
                target.style.backgroundColor = '#DC2626'
                target.style.transform = 'translateY(0)'
                target.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.25)'
              }}
            >
              🚪 Sign Out
            </button>
          </div>

          {/* Animation styles */}
          <style>
            {`
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: ${window.innerWidth < 768 
                    ? 'translate(-50%, -50%) scale(0.9)' 
                    : 'translateY(-10px)'};
                }
                to {
                  opacity: 1;
                  transform: ${window.innerWidth < 768 
                    ? 'translate(-50%, -50%) scale(1)' 
                    : 'translateY(0)'};
                }
              }
            `}
          </style>
        </>
      )}
    </div>
  )
}

export default UserProfile 