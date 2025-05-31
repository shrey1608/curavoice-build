import { useState, useEffect } from 'react';

interface DashboardProps {
    isConsultationActive: boolean;
    onClose: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isConsultationActive, onClose }) => {
    const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
    const [sessionDuration, setSessionDuration] = useState<string>('00:00:00');
    const [stats, setStats] = useState({
        totalSessions: parseInt(localStorage.getItem('totalSessions') || '0'),
        totalDuration: parseInt(localStorage.getItem('totalDuration') || '0'),
        averageSessionLength: '00:00:00'
    });

    useEffect(() => {
        if (isConsultationActive && !sessionStartTime) {
            setSessionStartTime(new Date());
        } else if (!isConsultationActive && sessionStartTime) {
            // Session ended, update stats
            const duration = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000);
            const newTotalSessions = stats.totalSessions + 1;
            const newTotalDuration = stats.totalDuration + duration;
            
            localStorage.setItem('totalSessions', newTotalSessions.toString());
            localStorage.setItem('totalDuration', newTotalDuration.toString());
            
            setStats({
                totalSessions: newTotalSessions,
                totalDuration: newTotalDuration,
                averageSessionLength: formatTime(Math.floor(newTotalDuration / newTotalSessions))
            });
            
            setSessionStartTime(null);
        }
    }, [isConsultationActive, sessionStartTime, stats.totalSessions, stats.totalDuration]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        
        if (isConsultationActive && sessionStartTime) {
            interval = setInterval(() => {
                const now = new Date();
                const duration = Math.floor((now.getTime() - sessionStartTime.getTime()) / 1000);
                setSessionDuration(formatTime(duration));
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isConsultationActive, sessionStartTime]);

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const clearStats = () => {
        localStorage.removeItem('totalSessions');
        localStorage.removeItem('totalDuration');
        setStats({
            totalSessions: 0,
            totalDuration: 0,
            averageSessionLength: '00:00:00'
        });
    };

    return (
        <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                padding: '30px',
                minWidth: '400px',
                maxWidth: '600px',
                color: 'white',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px'
                }}>
                    <h2 style={{ margin: 0, color: '#27eab6' }}>AIUI Dashboard</h2>
                    <button
                        onClick={onClose}
                        style={{
                            backgroundColor: 'transparent',
                            border: '2px solid #ff4757',
                            color: '#ff4757',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            cursor: 'pointer',
                            fontSize: '18px',
                            fontWeight: 'bold'
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Current Session */}
                <div style={{
                    backgroundColor: '#2d2d2d',
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '20px'
                }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#27eab6' }}>Current Session</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ margin: '5px 0' }}>Status: <span style={{ 
                                color: isConsultationActive ? '#27eab6' : '#ff4757',
                                fontWeight: 'bold'
                            }}>
                                {isConsultationActive ? 'Active' : 'Inactive'}
                            </span></p>
                            <p style={{ margin: '5px 0' }}>Duration: <span style={{ 
                                color: '#ffa502',
                                fontWeight: 'bold',
                                fontSize: '18px'
                            }}>
                                {sessionDuration}
                            </span></p>
                        </div>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            backgroundColor: isConsultationActive ? '#27eab6' : '#ff4757',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            animation: isConsultationActive ? 'pulse 2s infinite' : 'none'
                        }}>
                            <div style={{
                                width: '30px',
                                height: '30px',
                                backgroundColor: 'white',
                                borderRadius: isConsultationActive ? '3px' : '50%'
                            }}></div>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div style={{
                    backgroundColor: '#2d2d2d',
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '20px'
                }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#27eab6' }}>Session Statistics</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#ffa502' }}>
                                {stats.totalSessions}
                            </p>
                            <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>Total Sessions</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#ffa502' }}>
                                {formatTime(stats.totalDuration)}
                            </p>
                            <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>Total Duration</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#ffa502' }}>
                                {stats.averageSessionLength}
                            </p>
                            <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>Average Length</p>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <button
                        onClick={clearStats}
                        style={{
                            backgroundColor: 'transparent',
                            border: '2px solid #ff4757',
                            color: '#ff4757',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        Clear Statistics
                    </button>
                    
                    <div style={{ fontSize: '12px', color: '#666', alignSelf: 'center' }}>
                        Last updated: {new Date().toLocaleTimeString()}
                    </div>
                </div>

                <style>{`
                    @keyframes pulse {
                        0% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.1); opacity: 0.7; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Dashboard;