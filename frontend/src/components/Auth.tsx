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

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '40px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid #333',
      }}>
        <h2 style={{
          color: '#27eab6',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '28px',
          fontWeight: 'bold',
        }}>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: '#fff',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
              }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#2d2d2d',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#27eab6'}
                onBlur={(e) => e.target.style.borderColor = '#444'}
              />
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#fff',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#2d2d2d',
                border: '1px solid #444',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#27eab6'}
              onBlur={(e) => e.target.style.borderColor = '#444'}
            />
          </div>

          <div style={{ marginBottom: !isLogin ? '20px' : '24px' }}>
            <label style={{
              display: 'block',
              color: '#fff',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#2d2d2d',
                border: '1px solid #444',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#27eab6'}
              onBlur={(e) => e.target.style.borderColor = '#444'}
            />
          </div>

          {!isLogin && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                color: '#fff',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
              }}>
                Healthcare Domain
              </label>
              <select
                value={healthcareDomain}
                onChange={(e) => setHealthcareDomain(e.target.value)}
                required={!isLogin}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#2d2d2d',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#27eab6'}
                onBlur={(e) => e.target.style.borderColor = '#444'}
              >
                <option value="">Select your domain</option>
                <option value="physician">Physician</option>
                <option value="nurse">Nurse</option>
                <option value="therapist">Therapist</option>
                <option value="dentist">Dentist</option>
                <option value="pharmacist">Pharmacist</option>
                <option value="psychologist">Psychologist</option>
                <option value="healthcare_admin">Healthcare Administrator</option>
                <option value="medical_student">Medical Student</option>
                <option value="researcher">Healthcare Researcher</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: loading ? '#666' : '#27eab6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              marginBottom: '16px',
            }}
          >
            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        {message && (
          <div style={{
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: message.includes('error') || message.includes('Error') ? '#ff4757' : '#27eab6',
            color: 'white',
            fontSize: '14px',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            {message}
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              resetForm()
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#27eab6',
              cursor: 'pointer',
              fontSize: '14px',
              textDecoration: 'underline',
            }}
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth 