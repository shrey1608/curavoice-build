import {useMicVADWrapper} from "./hooks/useMicVADWrapper";
import RotateLoader from "react-spinners/RotateLoader";
import {particleActions} from "./particle-manager.ts";
import {useState, useEffect} from "react";
import Canvas from "./Canvas.tsx";
import {trackUserSession} from "./lib/supabase.ts";
import InvestorDashboard from "./InvestorDashboard.tsx";
import NameCapture from "./NameCapture.tsx";
import Instructions from "./Instructions.tsx";
import AdminAuth from "./AdminAuth.tsx";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [isConsultationActive, setIsConsultationActive] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
    const [showInvestorDashboard, setShowInvestorDashboard] = useState(false);
    const [userName, setUserName] = useState<string>('');
    const [showNameCapture, setShowNameCapture] = useState(true);
    const [showAdminAuth, setShowAdminAuth] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { pause, unpause } = useMicVADWrapper(setLoading, isConsultationActive);

    // Generate session ID on component mount
    useEffect(() => {
        const id = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        setSessionId(id);
    }, []);

    // Check for admin access via URL parameter
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const adminKey = urlParams.get('admin');
        if (adminKey === 'curavoice2024admin') {
            setShowAdminAuth(true);
        }
    }, []);

    // Track session end when user leaves the page
    useEffect(() => {
        const handleBeforeUnload = async () => {
            if (sessionId && sessionStartTime && isConsultationActive) {
                const endTime = new Date();
                const duration = Math.floor((endTime.getTime() - sessionStartTime.getTime()) / 1000);
                
                // Use navigator.sendBeacon for reliable tracking when page is unloading
                const sessionData = {
                    session_id: sessionId,
                    user_name: userName,
                    started_at: sessionStartTime.toISOString(),
                    ended_at: endTime.toISOString(),
                    duration_seconds: duration,
                    user_agent: navigator.userAgent,
                };

                try {
                    await trackUserSession(sessionData);
                } catch (error) {
                    // Fallback: try to send with sendBeacon
                    const formData = new FormData();
                    formData.append('session_data', JSON.stringify(sessionData));
                    navigator.sendBeacon('/api/track-session', formData);
                }
            }
        };

        const handleVisibilityChange = async () => {
            if (document.hidden && sessionId && sessionStartTime && isConsultationActive) {
                // Page is being hidden, likely user is leaving
                await handleBeforeUnload();
            }
        };

        // Add event listeners
        window.addEventListener('beforeunload', handleBeforeUnload);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
                 };
     }, [sessionId, sessionStartTime, isConsultationActive, userName]);

     // Periodic session update (heartbeat) to track ongoing sessions
     useEffect(() => {
         let heartbeatInterval: NodeJS.Timeout;

         if (isConsultationActive && sessionId && sessionStartTime) {
             heartbeatInterval = setInterval(async () => {
                 const currentTime = new Date();
                 const duration = Math.floor((currentTime.getTime() - sessionStartTime.getTime()) / 1000);
                 
                 // Update session with current duration (no end time yet)
                 try {
                     await trackUserSession({
                         session_id: sessionId,
                         user_name: userName,
                         started_at: sessionStartTime.toISOString(),
                         duration_seconds: duration,
                         user_agent: navigator.userAgent,
                     });
                 } catch (error) {
                     console.error('Heartbeat update failed:', error);
                 }
             }, 30000); // Update every 30 seconds
         }

         return () => {
             if (heartbeatInterval) {
                 clearInterval(heartbeatInterval);
             }
         };
     }, [isConsultationActive, sessionId, sessionStartTime, userName]);

     const handleNameSubmit = (name: string) => {
        setUserName(name);
        setShowNameCapture(false);
    };

    const handleAdminAuthSuccess = () => {
        setIsAuthenticated(true);
        setShowAdminAuth(false);
        setShowInvestorDashboard(true);
    };

    const handleAdminAuthClose = () => {
        setShowAdminAuth(false);
        // Clear the admin parameter from URL
        const url = new URL(window.location.href);
        url.searchParams.delete('admin');
        window.history.replaceState({}, '', url.toString());
    };

    const handleStartConsultation = async () => {
        setIsConsultationActive(true);
        const startTime = new Date();
        setSessionStartTime(startTime);
        unpause();
        particleActions.reset();

        // Track session start
        if (sessionId) {
            await trackUserSession({
                session_id: sessionId,
                user_name: userName,
                started_at: startTime.toISOString(),
                user_agent: navigator.userAgent,
            });
        }
    };

    const handleStopConsultation = async () => {
        setIsConsultationActive(false);
        pause();
        particleActions.reset();

        // Track session end
        if (sessionId && sessionStartTime) {
            const endTime = new Date();
            const duration = Math.floor((endTime.getTime() - sessionStartTime.getTime()) / 1000);
            await trackUserSession({
                session_id: sessionId,
                user_name: userName,
                started_at: sessionStartTime.toISOString(),
                ended_at: endTime.toISOString(),
                duration_seconds: duration,
                user_agent: navigator.userAgent,
            });
        }
    };

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

    // Show name capture first
    if (showNameCapture) {
        return <NameCapture onNameSubmit={handleNameSubmit} />;
    }

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <Canvas draw={particleActions.draw}/>
            
            {/* Instructions */}
            <Instructions />
            
            {/* Control Buttons */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 1000,
                display: 'flex',
                gap: '10px'
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
            </div>

            {/* Status Indicator */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 1000,
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



            {/* Admin Authentication */}
            {showAdminAuth && (
                <AdminAuth 
                    onAuthSuccess={handleAdminAuthSuccess}
                    onClose={handleAdminAuthClose}
                />
            )}

            {/* Investor Dashboard */}
            {showInvestorDashboard && isAuthenticated && (
                <InvestorDashboard onClose={() => setShowInvestorDashboard(false)} />
            )}
        </div>
    );
}

export default App;