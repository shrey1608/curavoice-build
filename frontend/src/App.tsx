import {useMicVADWrapper} from "./hooks/useMicVADWrapper";
import RotateLoader from "react-spinners/RotateLoader";
import {particleActions} from "./particle-manager.ts";
import {useState} from "react";
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
            <Canvas draw={particleActions.draw}/>
            
            {/* User Profile */}
            <UserProfile />
            
            {/* Control Buttons */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 1000,
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
            }}>
                <button
                    onClick={handleStartConsultation}
                    disabled={isConsultationActive}
                    style={{
                        backgroundColor: isConsultationActive ? '#666' : '#27eab6',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        cursor: isConsultationActive ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}
                >
                    Start Consultation
                </button>
                
                <button
                    onClick={handleStopConsultation}
                    disabled={!isConsultationActive}
                    style={{
                        backgroundColor: !isConsultationActive ? '#666' : '#ff4757',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        cursor: !isConsultationActive ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}
                >
                    Stop Consultation
                </button>

                {/* Status Indicator */}
                <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: isConsultationActive ? '#27eab6' : '#ff4757'
                    }}></div>
                    <span>{isConsultationActive ? 'Consultation Active' : 'Consultation Inactive'}</span>
                </div>
            </div>
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