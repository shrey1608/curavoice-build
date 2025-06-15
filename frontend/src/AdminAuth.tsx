import { useState } from 'react';

interface AdminAuthProps {
    onAuthSuccess: () => void;
    onClose: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthSuccess, onClose }) => {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simple password check (in production, use proper authentication)
        const adminPassword = 'CuraVoice@Admin2024!';
        
        setTimeout(() => {
            if (password === adminPassword) {
                onAuthSuccess();
            } else {
                setError('Invalid admin password');
                setPassword('');
            }
            setIsLoading(false);
        }, 1000); // Add delay to prevent brute force
    };

    return (
        <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 5000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                padding: '40px',
                maxWidth: '400px',
                width: '90%',
                color: 'white',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
                border: '2px solid #ff4757'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{ 
                        color: '#ff4757', 
                        margin: '0 0 10px 0', 
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}>
                        🔒 Admin Access Required
                    </h2>
                    <p style={{ 
                        color: '#ccc', 
                        margin: '0',
                        fontSize: '14px'
                    }}>
                        Enter admin password to access analytics dashboard
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: '#ff4757',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}>
                            Admin Password:
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password..."
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '15px',
                                borderRadius: '8px',
                                border: error ? '2px solid #ff4757' : '2px solid #333',
                                backgroundColor: '#2d2d2d',
                                color: 'white',
                                fontSize: '16px',
                                boxSizing: 'border-box',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => {
                                if (!error) e.target.style.borderColor = '#27eab6';
                            }}
                            onBlur={(e) => {
                                if (!error) e.target.style.borderColor = '#333';
                            }}
                            autoFocus
                        />
                        {error && (
                            <p style={{
                                color: '#ff4757',
                                fontSize: '12px',
                                margin: '5px 0 0 0'
                            }}>
                                {error}
                            </p>
                        )}
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        justifyContent: 'center'
                    }}>
                        <button
                            type="submit"
                            disabled={isLoading || !password.trim()}
                            style={{
                                backgroundColor: isLoading || !password.trim() ? '#666' : '#27eab6',
                                border: 'none',
                                color: isLoading || !password.trim() ? '#ccc' : 'black',
                                padding: '15px 30px',
                                borderRadius: '8px',
                                cursor: isLoading || !password.trim() ? 'not-allowed' : 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {isLoading ? 'Authenticating...' : 'Access Dashboard'}
                        </button>
                        
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            style={{
                                backgroundColor: 'transparent',
                                border: '2px solid #666',
                                color: '#ccc',
                                padding: '15px 30px',
                                borderRadius: '8px',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                opacity: isLoading ? 0.5 : 1,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                {/* Security Notice */}
                <div style={{
                    backgroundColor: '#2d2d2d',
                    padding: '15px',
                    borderRadius: '8px',
                    marginTop: '20px',
                    border: '1px solid #ff4757'
                }}>
                    <p style={{
                        margin: 0,
                        fontSize: '11px',
                        color: '#ff4757',
                        textAlign: 'center',
                        lineHeight: '1.4'
                    }}>
                        ⚠️ This dashboard contains sensitive user analytics data. Access is restricted to authorized administrators only.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminAuth; 