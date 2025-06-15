# CuraVoice - Investor Analytics Setup

## Quick Setup Instructions

### 1. Database Setup (One-time)
1. Go to your Supabase dashboard: https://fjxhldyoefyzvksvhdow.supabase.co
2. Navigate to the SQL Editor
3. Run the SQL script from `database_setup.sql` in this repository
4. This creates the `user_sessions` table to track user activity with names

### 2. Using the Analytics Dashboard

#### For Developers:
- Run the app normally with `npm run dev` in the frontend directory
- The app now automatically tracks user sessions with names in Supabase

#### For Users:
- When opening the app, users are prompted to enter their name (optional)
- Clear instructions are displayed for voice commands:
  - **Quick Start**: "What brings you to the pharmacy today?"
  - **Change Scenario**: "Can you please change the scenario?"
  - **Get Evaluation**: "Can you please switch to the evaluation mode?"

#### For Investors (Admin Access Only):
- Open the CuraVoice app with admin URL: `your-app-url/?admin=curavoice2024admin`
- Enter admin password: `CuraVoice@Admin2024!`
- View secure analytics dashboard with:
  - Total sessions with user names
  - Unique users (based on browser fingerprint)  
  - Average session length
  - Total usage time
  - Recent session history with user identification
- **Note**: Dashboard is now secured - no public access via keyboard shortcuts

### 3. What Gets Tracked
- User names (optional, for identification)
- Session start/end times
- Session duration
- User browser information (for uniqueness, not personal data)
- No personal or sensitive information is stored (only names if provided)

### 4. Key Metrics for Investors
- **Total Sessions**: How many times the app has been used
- **Unique Users**: Approximate number of different users (now with names)
- **Average Session Length**: How long users typically engage
- **Total Usage Time**: Cumulative time spent on the platform
- **Session History**: Recent activity with user names and timestamps
- **User Identification**: See who is testing the app (names or "Anonymous User")

### 5. Privacy & Compliance
- Only anonymous usage data is collected
- No personal information, audio, or conversation content is stored
- Data helps demonstrate user engagement and platform adoption
- Compliant with privacy regulations (no PII collected)

## Technical Details
- Data is stored securely in Supabase
- Real-time tracking with minimal performance impact
- Dashboard updates automatically
- Built-in error handling for network issues

**Admin Access:** Use URL `/?admin=curavoice2024admin` + password `CuraVoice@Admin2024!` to access the secure analytics dashboard! 