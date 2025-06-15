import { useState } from 'react';

const Instructions = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1500,
            backgroundColor: 'rgba(26, 26, 26, 0.95)',
            borderRadius: '12px',
            border: '2px solid #27eab6',
            color: 'white',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            maxWidth: '600px',
            width: '90%',
            transition: 'all 0.3s ease'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 20px',
                borderBottom: isMinimized ? 'none' : '1px solid #333'
            }}>
                <h3 style={{
                    margin: 0,
                    color: '#27eab6',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    🎤 Voice Commands
                </h3>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        style={{
                            backgroundColor: 'transparent',
                            border: '1px solid #666',
                            color: '#ccc',
                            borderRadius: '4px',
                            width: '30px',
                            height: '30px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        title={isMinimized ? 'Expand' : 'Minimize'}
                    >
                        {isMinimized ? '▲' : '▼'}
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        style={{
                            backgroundColor: 'transparent',
                            border: '1px solid #ff4757',
                            color: '#ff4757',
                            borderRadius: '4px',
                            width: '30px',
                            height: '30px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        title="Close"
                    >
                        ×
                    </button>
                </div>
            </div>

            {/* Content */}
            {!isMinimized && (
                <div style={{ padding: '20px' }}>
                    {/* Quick Start */}
                    <div style={{
                        backgroundColor: '#2d2d2d',
                        borderRadius: '8px',
                        padding: '15px',
                        marginBottom: '15px',
                        border: '1px solid #27eab6'
                    }}>
                        <h4 style={{
                            margin: '0 0 10px 0',
                            color: '#27eab6',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            🚀 Quick Start
                        </h4>
                        <p style={{
                            margin: '0',
                            color: '#ffa502',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            fontStyle: 'italic'
                        }}>
                            "What brings you to the pharmacy today?"
                        </p>
                    </div>

                    {/* Commands */}
                    <div style={{
                        display: 'grid',
                        gap: '12px'
                    }}>
                        <div style={{
                            backgroundColor: '#2d2d2d',
                            borderRadius: '8px',
                            padding: '12px 15px'
                        }}>
                            <div style={{
                                color: '#27eab6',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                marginBottom: '5px'
                            }}>
                                Change Scenario:
                            </div>
                            <div style={{
                                color: '#ffa502',
                                fontSize: '13px',
                                fontStyle: 'italic'
                            }}>
                                "Can you please change the scenario?"
                            </div>
                        </div>

                        <div style={{
                            backgroundColor: '#2d2d2d',
                            borderRadius: '8px',
                            padding: '12px 15px'
                        }}>
                            <div style={{
                                color: '#27eab6',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                marginBottom: '5px'
                            }}>
                                Get Evaluation:
                            </div>
                            <div style={{
                                color: '#ffa502',
                                fontSize: '13px',
                                fontStyle: 'italic'
                            }}>
                                "Can you please switch to the evaluation mode?"
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div style={{
                        marginTop: '15px',
                        padding: '12px',
                        backgroundColor: '#333',
                        borderRadius: '8px',
                        borderLeft: '4px solid #ffa502'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '8px'
                        }}>
                            <span style={{ fontSize: '14px' }}>💡</span>
                            <span style={{
                                color: '#ffa502',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }}>
                                Tips:
                            </span>
                        </div>
                        <ul style={{
                            margin: '0',
                            paddingLeft: '20px',
                            color: '#ccc',
                            fontSize: '12px',
                            lineHeight: '1.4'
                        }}>
                            <li>Speak clearly and naturally</li>
                            <li>Wait for the AI to finish responding</li>
                            <li>Use the exact phrases above for special commands</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Instructions; 