import { useState, useEffect } from 'react';
import { getSessionAnalytics } from './lib/supabase';

interface SessionData {
    id: number;
    session_id: string;
    user_name?: string;
    started_at: string;
    ended_at?: string;
    duration_seconds?: number;
    user_agent?: string;
    created_at: string;
}

interface InvestorDashboardProps {
    onClose: () => void;
}

const InvestorDashboard: React.FC<InvestorDashboardProps> = ({ onClose }) => {
    const [sessions, setSessions] = useState<SessionData[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalSessions: 0,
        totalUsers: 0,
        avgSessionLength: 0,
        totalUsageTime: 0
    });

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        setLoading(true);
        try {
            const data = await getSessionAnalytics();
            setSessions(data);
            
            // Calculate stats
            const completed = data.filter(s => s.ended_at && s.duration_seconds);
            const totalDuration = completed.reduce((sum, s) => sum + (s.duration_seconds || 0), 0);
            const uniqueUserAgents = new Set(data.map(s => s.user_agent)).size;
            
            setStats({
                totalSessions: data.length,
                totalUsers: uniqueUserAgents,
                avgSessionLength: completed.length > 0 ? Math.round(totalDuration / completed.length) : 0,
                totalUsageTime: totalDuration
            });
        } catch (error) {
            console.error('Error loading analytics:', error);
        }
        setLoading(false);
    };

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    if (loading) {
        return (
            <div style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                zIndex: 3000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white'
            }}>
                Loading analytics...
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 3000,
            overflow: 'auto'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '20px auto',
                padding: '20px',
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                color: 'white'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px',
                    borderBottom: '2px solid #27eab6',
                    paddingBottom: '15px'
                }}>
                    <h1 style={{ margin: 0, color: '#27eab6' }}>CuraVoice - Investor Analytics</h1>
                    <button
                        onClick={onClose}
                        style={{
                            backgroundColor: '#ff4757',
                            border: 'none',
                            color: 'white',
                            borderRadius: '8px',
                            padding: '12px 20px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}
                    >
                        Close
                    </button>
                </div>

                {/* Key Metrics */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    marginBottom: '30px'
                }}>
                    <div style={{
                        backgroundColor: '#2d2d2d',
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ color: '#27eab6', margin: '0 0 10px 0' }}>Total Sessions</h3>
                        <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffa502', margin: 0 }}>
                            {stats.totalSessions}
                        </p>
                    </div>
                    <div style={{
                        backgroundColor: '#2d2d2d',
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ color: '#27eab6', margin: '0 0 10px 0' }}>Unique Users</h3>
                        <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffa502', margin: 0 }}>
                            {stats.totalUsers}
                        </p>
                    </div>
                    <div style={{
                        backgroundColor: '#2d2d2d',
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ color: '#27eab6', margin: '0 0 10px 0' }}>Avg Session</h3>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffa502', margin: 0 }}>
                            {formatTime(stats.avgSessionLength)}
                        </p>
                    </div>
                    <div style={{
                        backgroundColor: '#2d2d2d',
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ color: '#27eab6', margin: '0 0 10px 0' }}>Total Usage</h3>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffa502', margin: 0 }}>
                            {formatTime(stats.totalUsageTime)}
                        </p>
                    </div>
                </div>

                {/* Recent Sessions */}
                <div style={{
                    backgroundColor: '#2d2d2d',
                    borderRadius: '8px',
                    padding: '20px'
                }}>
                    <h3 style={{ color: '#27eab6', margin: '0 0 20px 0' }}>Recent Sessions</h3>
                    <div style={{
                        maxHeight: '400px',
                        overflow: 'auto'
                    }}>
                        {sessions.slice(0, 20).map((session) => (
                            <div key={session.id} style={{
                                backgroundColor: '#3d3d3d',
                                margin: '10px 0',
                                padding: '15px',
                                borderRadius: '8px',
                                borderLeft: session.ended_at ? '4px solid #27eab6' : '4px solid #ffa502'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>
                                            {session.user_name}
                                        </p>
                                        <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#999' }}>
                                            Session: {session.session_id.split('_')[1]}
                                        </p>
                                        <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#ccc' }}>
                                            Started: {formatDate(session.started_at)}
                                        </p>
                                        {session.ended_at && (
                                            <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#ccc' }}>
                                                Duration: {formatTime(session.duration_seconds || 0)}
                                            </p>
                                        )}
                                    </div>
                                    <div style={{
                                        padding: '8px 12px',
                                        backgroundColor: session.ended_at ? '#27eab6' : '#ffa502',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        color: 'black'
                                    }}>
                                        {session.ended_at ? 'Completed' : 'In Progress'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    marginTop: '30px',
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#2d2d2d',
                    borderRadius: '8px'
                }}>
                    <p style={{ margin: 0, color: '#999' }}>
                        Data refreshes automatically. Last updated: {new Date().toLocaleString()}
                    </p>
                    <button
                        onClick={loadAnalytics}
                        style={{
                            backgroundColor: '#27eab6',
                            border: 'none',
                            color: 'black',
                            borderRadius: '6px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            marginTop: '10px',
                            fontWeight: 'bold'
                        }}
                    >
                        Refresh Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvestorDashboard; 