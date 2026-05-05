# SSO Authentication Setup Guide

## The Error You're Getting
`{"code":400,"error_code":"validation_failed","msg":"Unsupported provider: provider is not enabled"}`

This means Google and GitHub OAuth providers are not enabled in your Supabase project.

---

## ✅ SETUP STEPS

### **Step 1: Enable Google OAuth in Supabase**

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Authentication** → **Providers**
4. Find **Google** and click **Enable**
5. You'll need:
   - **Google Client ID** and **Google Client Secret**
   
   #### Get Google Credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing one
   - Enable "Google+ API"
   - Go to **Credentials** → **Create OAuth 2.0 Client ID**
   - Choose **Web application**
   - Add these Redirect URIs:
     - `https://your-project.supabase.co/auth/v1/callback?provider=google`
     - `http://localhost:5173/login` (for local testing)
   - Copy the **Client ID** and **Client Secret**
   - Paste them in Supabase Google provider settings
   - Click **Save**

---

### **Step 2: Enable GitHub OAuth in Supabase**

1. In **Authentication** → **Providers**, find **GitHub** and click **Enable**
2. You'll need:
   - **GitHub Client ID** and **GitHub Client Secret**
   
   #### Get GitHub Credentials:
   - Go to GitHub → **Settings** → **Developer settings** → **OAuth Apps**
   - Click **New OAuth App**
   - Fill in:
     - **Application name**: SmartStudy
     - **Homepage URL**: `http://localhost:5173` (or your production URL)
     - **Authorization callback URL**: `https://your-project.supabase.co/auth/v1/callback?provider=github`
   - Click **Register application**
   - Copy **Client ID** and generate **Client Secret**
   - Paste them in Supabase GitHub provider settings
   - Click **Save**

---

### **Step 3: Create Users Table (if not exists)**

Your database needs a `users` table to store user profiles. Run this SQL in Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  name TEXT,
  avatar_url TEXT,
  provider TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own data
CREATE POLICY "Users can read their own data" 
  ON users FOR SELECT 
  USING (auth.uid() = id);

-- Allow users to update their own data
CREATE POLICY "Users can update their own data" 
  ON users FOR UPDATE 
  USING (auth.uid() = id);

-- Allow inserting own user data
CREATE POLICY "Users can insert their own data" 
  ON users FOR INSERT 
  WITH CHECK (auth.uid() = id);
```

---

## 🔄 How It Works Now

### First Time SSO Login:
1. User clicks **Google** or **GitHub** button
2. Redirected to provider's login
3. After authentication, redirected back to `/login`
4. `AuthContext` automatically creates a user profile in your `users` table
5. User is logged in and can access the app

### Second Time & Beyond:
1. User clicks the SSO button
2. If they already have an account, they're logged in directly
3. Profile already exists in database, so no duplicate is created

---

## 📝 Code Changes Made

### ✅ AuthContext (`src/auth/AuthContext.jsx`):
- Added `createUserProfile()` function that checks if user exists
- If first-time login, creates a profile in the `users` table
- Added `signInWithGitHub()` for GitHub OAuth

### ✅ LogIn Page (`src/pages/LogIn/index.jsx`):
- Added GitHub button handler `handleGitHubSignIn()`
- Proper error handling for both Google and GitHub

### ✅ App Routes (`src/App.jsx`):
- Already has the `/course/:id` route for course pages

---

## 🧪 Testing

1. **Locally**: Go to `http://localhost:5173/login`
2. Click **Google** or **GitHub** button
3. Complete authentication
4. Should redirect back and create user profile
5. Check your Supabase `users` table to verify the profile was created

---

## 🐛 Troubleshooting

| Error | Solution |
|-------|----------|
| `Unsupported provider` | OAuth provider not enabled in Supabase |
| `Redirect URL mismatch` | Check your redirect URLs in OAuth app settings match Supabase |
| `User table not found` | Run the SQL to create the `users` table |
| Still redirecting to login | Check your `.env` variables are correct |

---

## ✨ Next Steps (Optional)

1. Add profile completion form after first SSO login
2. Store additional user info (courses enrolled, etc.)
3. Add logout functionality with redirect to homepage
