import {useState} from "react";
import {useMicVADWrapper} from "./hooks/useMicVADWrapper";
import RotateLoader from "react-spinners/RotateLoader";
import {particleActions} from "./particle-manager.ts";
import Canvas from "./Canvas.tsx";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";

const MainApp = () => {
    const [loading, setLoading] = useState(true);
    const [isConsultationActive, setIsConsultationActive] = useState(false);
    const { user, loading: authLoading } = useAuth();

    const { pause, unpause } = useMicVADWrapper(setLoading, isConsultationActive);

    const handleStartConsultation = () => {
        setIsConsultationActive(true);
        unpause();
        particleActions.reset();
    };

    const handleStopConsultation = () => {
        setIsConsultationActive(false);
        pause();
        particleActions.reset();
    };

    // Show loading spinner while checking authentication
    if (authLoading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
            }}>
                <RotateLoader
                    loading={true}
                    color={"#27eab6"}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    // Show auth component if user is not authenticated
    if (!user) {
        return <Auth />;
    }

    // Show mic loading spinner
    if (loading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
            }}>
                <RotateLoader
                    loading={loading}
                    color={"#27eab6"}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {/* Animated Canvas Background */}
            <Canvas draw={particleActions.draw}/>
            
            {/* Modern Navbar */}
            <nav style={{
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                zIndex: 1000,
                background: 'linear-gradient(135deg, rgba(26, 31, 113, 0.95) 0%, rgba(26, 31, 113, 0.85) 100%)',
                backdropFilter: 'blur(15px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                minHeight: 'clamp(60px, 12vw, 80px)'
            }}>
                {/* Left Section - Domain Info */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(12px, 3vw, 16px)'
                }}>
                    {/* Domain Avatar & Info */}
                    {user?.user_metadata?.healthcare_domain && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'clamp(8px, 2vw, 12px)',
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            padding: 'clamp(8px, 2vw, 12px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            {(() => {
                                const domain = user.user_metadata.healthcare_domain;
                                const domainConfig = {
                                    'medical': { name: 'Medical', initial: 'M', color: '#1A1F71' },
                                    'nursing': { name: 'Nursing', initial: 'N', color: '#1A1F71' },
                                    'pharmacy': { name: 'Pharmacy', initial: 'P', color: '#1A1F71' },
                                    'dental': { name: 'Dental', initial: 'D', color: '#1A1F71' },
                                    'physiotherapy': { name: 'Physio', initial: 'PT', color: '#1A1F71' },
                                    'psychology': { name: 'Psychology', initial: 'PS', color: '#1A1F71' }
                                };
                                
                                const config = domainConfig[domain] || domainConfig['medical'];
                                
                                return (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 10px)' }}>
                                        <div style={{
                                            width: 'clamp(32px, 8vw, 40px)',
                                            height: 'clamp(32px, 8vw, 40px)',
                                            borderRadius: '50%',
                                            backgroundColor: config.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 'clamp(14px, 3.5vw, 16px)',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                                        }}>
                                            {config.initial}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{
                                                color: 'white',
                                                fontSize: 'clamp(14px, 3.5vw, 16px)',
                                                fontWeight: '600',
                                                lineHeight: '1.2'
                                            }}>
                                                {config.name} Training
                                            </span>
                                            <span style={{
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                fontSize: 'clamp(11px, 2.8vw, 13px)',
                                                lineHeight: '1.2'
                                            }}>
                                                AI Simulation
                                            </span>
                                        </div>
                                        <div style={{
                                            marginLeft: 'clamp(4px, 1vw, 8px)',
                                            transform: 'rotate(90deg)',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            fontSize: 'clamp(12px, 3vw, 14px)'
                                        }}>
                                            ❯
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    )}

                    {/* Status Indicator */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'clamp(6px, 1.5vw, 8px)',
                        backgroundColor: isConsultationActive ? 'rgba(39, 234, 182, 0.2)' : 'rgba(26, 31, 113, 0.3)',
                        padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3vw, 14px)',
                        borderRadius: 'clamp(12px, 3vw, 16px)',
                        border: `1px solid ${isConsultationActive ? 'rgba(39, 234, 182, 0.5)' : 'rgba(26, 31, 113, 0.5)'}`
                    }}>
                        <div style={{
                            width: 'clamp(10px, 2.5vw, 12px)',
                            height: 'clamp(10px, 2.5vw, 12px)',
                            borderRadius: '50%',
                            backgroundColor: isConsultationActive ? '#27eab6' : '#1A1F71',
                            animation: isConsultationActive ? 'pulse 2s infinite' : 'none'
                        }}></div>
                        <span style={{
                            color: 'white',
                            fontSize: 'clamp(12px, 3vw, 14px)',
                            fontWeight: '600'
                        }}>
                            {isConsultationActive ? 'Live' : 'Ready'}
                        </span>
                    </div>
                </div>

                {/* Right Section - User Profile */}
                <UserProfile />
            </nav>

            {/* Floating Control Panel - Bottom */}
            <div style={{
                position: 'fixed',
                bottom: 'clamp(12px, 3vw, 20px)',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                background: 'linear-gradient(135deg, rgba(26, 31, 113, 0.95) 0%, rgba(26, 31, 113, 0.85) 100%)',
                backdropFilter: 'blur(20px)',
                borderRadius: 'clamp(20px, 5vw, 30px)',
                padding: 'clamp(10px, 2.5vw, 14px) clamp(14px, 3.5vw, 20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(26, 31, 113, 0.4)',
                display: 'flex',
                gap: 'clamp(8px, 2vw, 12px)',
                alignItems: 'center',
                maxWidth: 'calc(100vw - 24px)',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                <button
                    onClick={handleStartConsultation}
                    disabled={isConsultationActive}
                    style={{
                        backgroundColor: isConsultationActive ? 'rgba(108, 117, 125, 0.8)' : '#1A1F71',
                        color: 'white',
                        border: 'none',
                        padding: 'clamp(14px, 3.5vw, 18px) clamp(20px, 5vw, 28px)',
                        borderRadius: 'clamp(16px, 4vw, 22px)',
                        cursor: isConsultationActive ? 'not-allowed' : 'pointer',
                        fontSize: 'clamp(14px, 3.5vw, 16px)',
                        fontWeight: '600',
                        minHeight: 'clamp(52px, 12vw, 56px)',
                        minWidth: 'clamp(150px, 40vw, 200px)',
                        transition: 'all 0.3s ease',
                        boxShadow: isConsultationActive ? 'none' : '0 4px 16px rgba(26, 31, 113, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'clamp(6px, 1.5vw, 8px)',
                        touchAction: 'manipulation',
                        WebkitTapHighlightColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                        if (!isConsultationActive) {
                            const target = e.target as HTMLButtonElement
                            target.style.transform = 'translateY(-2px)'
                            target.style.boxShadow = '0 6px 20px rgba(26, 31, 113, 0.6)'
                            target.style.backgroundColor = '#2A2F81'
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isConsultationActive) {
                            const target = e.target as HTMLButtonElement
                            target.style.transform = 'translateY(0)'
                            target.style.boxShadow = '0 4px 16px rgba(26, 31, 113, 0.4)'
                            target.style.backgroundColor = '#1A1F71'
                        }
                    }}
                >
                    🎯 Start Training
                </button>
                
                <button
                    onClick={handleStopConsultation}
                    disabled={!isConsultationActive}
                    style={{
                        backgroundColor: !isConsultationActive ? 'rgba(108, 117, 125, 0.8)' : '#DC3545',
                        color: 'white',
                        border: 'none',
                        padding: 'clamp(14px, 3.5vw, 18px) clamp(20px, 5vw, 28px)',
                        borderRadius: 'clamp(16px, 4vw, 22px)',
                        cursor: !isConsultationActive ? 'not-allowed' : 'pointer',
                        fontSize: 'clamp(14px, 3.5vw, 16px)',
                        fontWeight: '600',
                        minHeight: 'clamp(52px, 12vw, 56px)',
                        minWidth: 'clamp(150px, 40vw, 200px)',
                        transition: 'all 0.3s ease',
                        boxShadow: !isConsultationActive ? 'none' : '0 4px 16px rgba(220, 53, 69, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'clamp(6px, 1.5vw, 8px)',
                        touchAction: 'manipulation',
                        WebkitTapHighlightColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                        if (isConsultationActive) {
                            const target = e.target as HTMLButtonElement
                            target.style.transform = 'translateY(-2px)'
                            target.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.6)'
                            target.style.backgroundColor = '#E85B6B'
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (isConsultationActive) {
                            const target = e.target as HTMLButtonElement
                            target.style.transform = 'translateY(0)'
                            target.style.boxShadow = '0 4px 16px rgba(220, 53, 69, 0.4)'
                            target.style.backgroundColor = '#DC3545'
                        }
                    }}
                >
                    ⏹️ Stop Training
                </button>
            </div>

            {/* CSS Animations */}
            <style>
                {`
                    @keyframes pulse {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.7; transform: scale(1.05); }
                    }
                    
                    /* Mobile Responsiveness */
                    @media (max-width: 768px) {
                        body {
                            -webkit-text-size-adjust: none;
                            text-size-adjust: none;
                            overflow-x: hidden;
                        }
                        
                        /* Improved touch targets */
                        button {
                            min-height: 56px !important;
                            touch-action: manipulation;
                        }
                        
                        /* Prevent zoom on input focus */
                        input, select, textarea {
                            font-size: 16px !important;
                        }
                    }
                    
                    @media (max-width: 480px) {
                        /* Stack control panel vertically on very small screens */
                        nav {
                            flex-direction: column !important;
                            gap: 12px !important;
                            padding: 12px 16px !important;
                        }
                        
                        /* Ensure buttons wrap properly */
                        div[style*="flexWrap"] > button {
                            min-width: calc(50vw - 24px) !important;
                            margin-bottom: 8px;
                        }
                    }
                    
                    /* High DPI displays */
                    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                        button {
                            border: 0.5px solid transparent;
                        }
                    }
                    
                    /* Accessibility improvements */
                    @media (prefers-reduced-motion: reduce) {
                        * {
                            animation-duration: 0.01ms !important;
                            animation-iteration-count: 1 !important;
                            transition-duration: 0.01ms !important;
                        }
                    }
                `}
            </style>


        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <MainApp />
        </AuthProvider>
    );
};

export default App;