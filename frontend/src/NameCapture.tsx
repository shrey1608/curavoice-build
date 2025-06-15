import { useState } from 'react';

interface NameCaptureProps {
    onNameSubmit: (name: string) => void;
}

const NameCapture: React.FC<NameCaptureProps> = ({ onNameSubmit }) => {
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Pass the name if provided, otherwise pass "Guest User"
        onNameSubmit(name.trim() || "Guest User");
    };

    const handleSkip = () => {
        onNameSubmit("Guest User");
    };

    return (
        <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 4000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'fadeIn 0.3s ease-in'
        }}>
            <div style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                padding: '40px',
                maxWidth: '500px',
                width: '90%',
                color: 'white',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
                border: '2px solid #27eab6'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ 
                        color: '#27eab6', 
                        margin: '0 0 10px 0', 
                        fontSize: '28px',
                        fontWeight: 'bold'
                    }}>
                        Welcome to CuraVoice
                    </h1>
                    <p style={{ 
                        color: '#ccc', 
                        margin: '0',
                        fontSize: '16px',
                        lineHeight: '1.5'
                    }}>
                        Your AI-powered pharmacy consultation assistant
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: '#27eab6',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>
                            What's your name? (Optional)
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name..."
                            disabled={isSubmitting}
                            style={{
                                width: '100%',
                                padding: '15px',
                                borderRadius: '8px',
                                border: '2px solid #333',
                                backgroundColor: '#2d2d2d',
                                color: 'white',
                                fontSize: '16px',
                                boxSizing: 'border-box',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#27eab6'}
                            onBlur={(e) => e.target.style.borderColor = '#333'}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        justifyContent: 'center'
                    }}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                backgroundColor: '#27eab6',
                                border: 'none',
                                color: 'black',
                                padding: '15px 30px',
                                borderRadius: '8px',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                opacity: isSubmitting ? 0.7 : 1,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {isSubmitting ? 'Starting...' : name.trim() ? 'Continue' : 'Continue as Guest'}
                        </button>
                        
                        <button
                            type="button"
                            onClick={handleSkip}
                            disabled={isSubmitting}
                            style={{
                                backgroundColor: 'transparent',
                                border: '2px solid #666',
                                color: '#ccc',
                                padding: '15px 30px',
                                borderRadius: '8px',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                opacity: isSubmitting ? 0.7 : 1,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Skip
                        </button>
                    </div>
                </form>

                {/* Privacy Note */}
                <div style={{
                    backgroundColor: '#2d2d2d',
                    padding: '15px',
                    borderRadius: '8px',
                    marginTop: '20px'
                }}>
                    <p style={{
                        margin: 0,
                        fontSize: '12px',
                        color: '#999',
                        textAlign: 'center',
                        lineHeight: '1.4'
                    }}>
                        🔒 Your privacy is important to us. Names are optional and used only for session tracking. No personal conversations are recorded or stored. You can use the app completely anonymously as a guest.
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default NameCapture; 