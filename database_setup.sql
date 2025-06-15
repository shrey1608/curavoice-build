-- CuraVoice Analytics Database Setup
-- Run this in your Supabase SQL Editor: https://fjxhldyoefyzvksvhdow.supabase.co

-- Create user_sessions table for tracking app usage
CREATE TABLE IF NOT EXISTS user_sessions (
    id BIGSERIAL PRIMARY KEY,
    session_id TEXT NOT NULL UNIQUE,
    user_name TEXT,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ended_at TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    user_agent TEXT,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anonymous users to insert and read sessions
CREATE POLICY "Allow anonymous users to manage sessions" ON user_sessions
    FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS user_sessions_started_at_idx ON user_sessions (started_at);
CREATE INDEX IF NOT EXISTS user_sessions_session_id_idx ON user_sessions (session_id);

-- Verify table was created
SELECT 'user_sessions table created successfully!' as status; 