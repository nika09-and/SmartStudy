import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user profile in database
  const createUserProfile = async (authUser) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("id", authUser.id)
        .single();

      // If user profile doesn't exist, create it
      if (error?.code === "PGRST116") {
        const { error: insertError } = await supabase.from("users").insert([
          {
            id: authUser.id,
            email: authUser.email,
            name: authUser.user_metadata?.name || "",
            avatar_url: authUser.user_metadata?.avatar_url || "",
            provider: authUser.app_metadata?.provider || "email",
            created_at: new Date(),
          },
        ]);

        if (insertError) {
          console.error("Error creating user profile:", insertError);
        }
      }
    } catch (error) {
      console.error("Error in createUserProfile:", error);
    }
  };

  // Get initial session on mount
  useEffect(() => {
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await createUserProfile(session.user);
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        // Create profile on sign up or SSO sign in
        if (event === "SIGNED_IN" || event === "USER_UPDATED") {
          await createUserProfile(session.user);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signup = async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/login`,
      },
    });
    if (error) throw error;
    return data;
  };

  const signInWithGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/login`,
      },
    });
    if (error) throw error;
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        signInWithGoogle,
        signInWithGitHub,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
