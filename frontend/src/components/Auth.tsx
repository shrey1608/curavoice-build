import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [healthcareDomain, setHealthcareDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = isLogin
        ? await signIn(email, password)
        : await signUp(email, password, name, healthcareDomain)

      if (error) {
        setMessage(error.message)
      } else if (!isLogin) {
        setMessage('Check your email for the confirmation link!')
      }
    } catch (error) {
      setMessage('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setName('')
    setHealthcareDomain('')
    setMessage('')
  }

    // CuraVoice Logo Component - text only
  const CuraVoiceLogo = () => (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      marginBottom: 'clamp(16px, 4vw, 32px)',
      textAlign: 'center'
    }}>
      {/* Brand text */}
      <div>
        <h1 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '800',
          fontSize: 'clamp(26px, 7vw, 34px)',
          color: '#1A1F71',
          margin: '0 0 6px 0',
          lineHeight: '1.1',
          letterSpacing: '-0.5px'
        }}>
          Cura<span style={{ color: '#1A1F71' }}>Voice</span>
        </h1>
        <p style={{
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 'clamp(12px, 3.5vw, 16px)',
          color: '#4B4B4B',
          margin: '0',
          fontWeight: '600',
          lineHeight: '1.3'
        }}>
          AI-Powered Patient Simulation Training
        </p>
      </div>
    </div>
  )

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#F9F9F9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      fontFamily: 'Open Sans, sans-serif',
      padding: 'clamp(12px, 3vw, 20px)',
      overflowY: 'auto'
    }}>
      {/* Background Pattern - Mobile optimized */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(26, 31, 113, 0.08) 0%, transparent 30%),
          radial-gradient(circle at 80% 80%, rgba(26, 31, 113, 0.03) 0%, transparent 30%)
        `,
        zIndex: -1
      }} />

      <div style={{
        backgroundColor: '#FFFFFF',
        padding: 'clamp(20px, 5vw, 40px)',
        borderRadius: 'clamp(12px, 3vw, 20px)',
        width: '100%',
        maxWidth: '400px',
        minHeight: 'auto',
        boxShadow: '0 8px 32px rgba(26, 31, 113, 0.12), 0 4px 8px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(26, 31, 113, 0.08)',
        position: 'relative',
        margin: 'auto'
      }}>
        {/* Header Accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #1A1F71 0%, #2A2F81 100%)'
        }} />

        {/* Logo and Branding */}
        <CuraVoiceLogo />

                {/* Form Header - Mobile optimized */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 5vw, 28px)' }}>
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '700',
            fontSize: 'clamp(18px, 4.5vw, 24px)',
            color: '#1A1F71',
            margin: '0 0 6px 0',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            {isLogin ? 'Welcome Back' : 'Start Your Journey'}
          </h2>
          <p style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 'clamp(13px, 3.5vw, 15px)',
            color: '#4B4B4B',
            margin: '0',
            fontWeight: '400',
            textAlign: 'center',
            lineHeight: '1.4',
            maxWidth: '280px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {isLogin 
              ? 'Sign in to continue your healthcare training' 
              : 'Join thousands of healthcare students'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: 'clamp(16px, 4vw, 20px)' }}>
              <label style={{
                display: 'block',
                fontFamily: 'Open Sans, sans-serif',
                color: '#1A1F71',
                marginBottom: '6px',
                fontSize: 'clamp(13px, 3.5vw, 14px)',
                fontWeight: '600'
              }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  padding: 'clamp(12px, 3vw, 16px) clamp(14px, 3.5vw, 18px)',
                  backgroundColor: '#F9F9F9',
                  border: '1.5px solid rgba(75, 75, 75, 0.2)',
                  borderRadius: 'clamp(8px, 2vw, 10px)',
                  color: '#1A1F71',
                  fontSize: 'clamp(14px, 3.5vw, 16px)',
                  fontFamily: 'Open Sans, sans-serif',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement
                  target.style.borderColor = '#3DD6D0'
                  target.style.backgroundColor = '#FFFFFF'
                  target.style.boxShadow = '0 0 0 3px rgba(61, 214, 208, 0.1)'
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement
                  target.style.borderColor = 'rgba(75, 75, 75, 0.2)'
                  target.style.backgroundColor = '#F9F9F9'
                  target.style.boxShadow = 'none'
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontFamily: 'Open Sans, sans-serif',
              color: '#1A1F71',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '16px 20px',
                backgroundColor: '#F9F9F9',
                border: '2px solid #E0E7FF',
                borderRadius: '12px',
                color: '#1A1F71',
                fontSize: '16px',
                fontFamily: 'Open Sans, sans-serif',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3DD6D0'
                e.target.style.backgroundColor = '#FFFFFF'
                e.target.style.boxShadow = '0 0 0 4px rgba(61, 214, 208, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E0E7FF'
                e.target.style.backgroundColor = '#F9F9F9'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: !isLogin ? '24px' : '32px' }}>
            <label style={{
              display: 'block',
              fontFamily: 'Open Sans, sans-serif',
              color: '#1A1F71',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '16px 20px',
                backgroundColor: '#F9F9F9',
                border: '2px solid #E0E7FF',
                borderRadius: '12px',
                color: '#1A1F71',
                fontSize: '16px',
                fontFamily: 'Open Sans, sans-serif',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3DD6D0'
                e.target.style.backgroundColor = '#FFFFFF'
                e.target.style.boxShadow = '0 0 0 4px rgba(61, 214, 208, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E0E7FF'
                e.target.style.backgroundColor = '#F9F9F9'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          {!isLogin && (
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontFamily: 'Open Sans, sans-serif',
                color: '#1A1F71',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                Healthcare Domain
              </label>
              <select
                value={healthcareDomain}
                onChange={(e) => setHealthcareDomain(e.target.value)}
                required={!isLogin}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  backgroundColor: '#F9F9F9',
                  border: '2px solid #E0E7FF',
                  borderRadius: '12px',
                  color: '#1A1F71',
                  fontSize: '16px',
                  fontFamily: 'Open Sans, sans-serif',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3DD6D0'
                  e.target.style.backgroundColor = '#FFFFFF'
                  e.target.style.boxShadow = '0 0 0 4px rgba(61, 214, 208, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E0E7FF'
                  e.target.style.backgroundColor = '#F9F9F9'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <option value="">Select your specialization</option>
                <option value="medical">Medical</option>
                <option value="nursing">Nursing</option>
                <option value="pharmacy">Pharmacy</option>
              </select>
            </div>
          )}

                    <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: 'clamp(14px, 3.5vw, 18px) clamp(20px, 5vw, 24px)',
              background: loading 
                ? '#4B4B4B'
                : '#1A1F71',
              color: '#F9F9F9',
              border: 'none',
              borderRadius: 'clamp(8px, 2vw, 12px)',
              fontSize: 'clamp(14px, 3.5vw, 16px)',
              fontWeight: '700',
              fontFamily: 'Montserrat, sans-serif',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: 'clamp(16px, 4vw, 20px)',
              boxShadow: loading 
                ? 'none'
                : '0 4px 12px rgba(26, 31, 113, 0.25)',
              transform: loading ? 'none' : 'translateY(0)',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                const target = e.target as HTMLButtonElement
                target.style.transform = 'translateY(-1px)'
                target.style.backgroundColor = '#3DD6D0'
                target.style.boxShadow = '0 6px 16px rgba(61, 214, 208, 0.3)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                const target = e.target as HTMLButtonElement
                target.style.transform = 'translateY(0)'
                target.style.backgroundColor = '#1A1F71'
                target.style.boxShadow = '0 4px 12px rgba(26, 31, 113, 0.25)'
              }
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #ffffff40',
                  borderTop: '2px solid #ffffff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '8px'
                }} />
                Processing...
              </div>
            ) : (
              `${isLogin ? 'Sign In' : 'Create Account'} →`
            )}
          </button>
        </form>

        {message && (
          <div style={{
            padding: '16px 20px',
            borderRadius: '12px',
            backgroundColor: message.includes('error') || message.includes('Error') 
              ? '#FEF2F2' 
              : '#F0FDF4',
            border: `2px solid ${message.includes('error') || message.includes('Error') 
              ? '#FECACA' 
              : '#BBF7D0'}`,
            color: message.includes('error') || message.includes('Error') 
              ? '#DC2626' 
              : '#059669',
            fontSize: '14px',
            fontFamily: 'Open Sans, sans-serif',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {message}
          </div>
        )}

        <div style={{ 
          textAlign: 'center',
          paddingTop: '20px',
          borderTop: '1px solid #E0E7FF'
        }}>
          <p style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '14px',
            color: '#4B4B4B',
            margin: '0 0 8px 0'
          }}>
            {isLogin ? "New to CuraVoice?" : "Already have an account?"}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              resetForm()
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#3DD6D0',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: 'Open Sans, sans-serif',
              fontWeight: '600',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
                         onMouseEnter={(e) => {
               const target = e.target as HTMLButtonElement
               target.style.backgroundColor = 'rgba(61, 214, 208, 0.1)'
               target.style.color = '#1A1F71'
             }}
             onMouseLeave={(e) => {
               const target = e.target as HTMLButtonElement
               target.style.backgroundColor = 'transparent'
               target.style.color = '#3DD6D0'
             }}
          >
            {isLogin ? 'Create your account' : 'Sign in instead'}
          </button>
        </div>

                {/* Trust Indicators - Mobile optimized */}
        <div style={{
          marginTop: 'clamp(16px, 4vw, 20px)',
          padding: 'clamp(12px, 3vw, 16px)',
          backgroundColor: '#F9F9F9',
          borderRadius: 'clamp(8px, 2vw, 10px)',
          border: '1px solid rgba(26, 31, 113, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(11px, 2.5vw, 12px)',
            color: '#4B4B4B',
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: '500'
          }}>
            <span style={{ color: '#3DD6D0', marginRight: '6px', fontSize: 'clamp(12px, 3vw, 14px)' }}>✓</span>
            Secure & Encrypted
          </div>
        </div>
      </div>

      {/* Add CSS animation for loading spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}

export default Auth 