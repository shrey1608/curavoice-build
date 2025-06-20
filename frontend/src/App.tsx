import {useMicVADWrapper} from "./hooks/useMicVADWrapper";
import RotateLoader from "react-spinners/RotateLoader";
import {particleActions} from "./particle-manager.ts";
import {useState} from "react";
import Canvas from "./Canvas.tsx";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [isConsultationActive, setIsConsultationActive] = useState(false);

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
        </div>
    );
}

export default App;