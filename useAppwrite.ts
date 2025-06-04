import { useEffect, useState } from 'react';
import { Account, Models } from 'appwrite';
import { account } from './appwrite'; // your configured Appwrite client

type User = Models.User<Models.Preferences> | null;

export const useAppwrite = () => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the current user session
  const fetchUser = async () => {
    try {
      const userData = await account.get();
      setUser(userData);
    } catch (err: any) {
      console.log('No active session or error fetching user:', err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (err: any) {
      console.log('Logout error:', err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
    logout,
  };
};
