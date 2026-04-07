import React, { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContextObject';
import { authService } from '../services/authService';

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => authService.getSession());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const syncSession = async () => {
      try {
        const refreshedSession = await authService.refreshSession();
        if (isMounted) {
          setSession(refreshedSession);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    syncSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      session,
      isAuthenticated: Boolean(session?.user),
      isAdmin: session?.user?.role === 'admin',
      isLoading,
      async signIn(credentials) {
        const nextSession = await authService.signIn(credentials);
        setSession(nextSession);
        return nextSession.user;
      },
      async signUp(payload) {
        const nextSession = await authService.signUp(payload);
        setSession(nextSession);
        return nextSession.user;
      },
      signOut() {
        authService.signOut();
        setSession(null);
      },
      async refreshSession() {
        const nextSession = await authService.refreshSession();
        setSession(nextSession);
        return nextSession?.user ?? null;
      },
    }),
    [isLoading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
