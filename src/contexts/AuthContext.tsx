import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'therapist' | 'admin';
  status?: 'pending' | 'approved' | 'rejected';
  profilePicture?: string;
  emergencyContactEmail?: string;
  emergencyContactRelation?: string;
  age?: number;
  specialization?: string;
  experience?: string;
  location?: string;
  hourlyRate?: number;
  licenseNumber?: string;
  verified?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role?: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'therapist';
  emergencyContactEmail?: string;
  emergencyContactRelation?: string;
  age?: number;
  specialization?: string;
  experience?: string;
  hourlyRate?: number;
  licenseNumber?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('mindcare_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Listen for user updates from other tabs/components
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'mindcare_user' && e.newValue) {
        setUser(JSON.parse(e.newValue));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    setLoading(false);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async (email: string, password: string, role?: string): Promise<boolean> => {
    try {
      // Simulate API call with predefined users
      const users = [
        {
          id: '1',
          email: 'patient@example.com',
          name: 'John Doe',
          role: 'patient' as const,
          emergencyContactEmail: 'emergency@example.com',
          emergencyContactRelation: 'parent',
          age: 28
        },
        {
          id: '2',
          email: 'therapist@example.com',
          name: 'Dr. Sarah Smith',
          role: 'therapist' as const,
          specialization: 'Cognitive Behavioral Therapy',
          hourlyRate: 120,
          licenseNumber: 'LIC123456',
          verified: true
        },
        {
          id: '3',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin' as const
        }
      ];

      const foundUser = users.find(u => u.email === email && (!role || u.role === role));
      
      if (foundUser && password === 'password') {
        setUser(foundUser);
        localStorage.setItem('mindcare_user', JSON.stringify(foundUser));
        toast.success('Login successful!');
        return true;
      } else {
        toast.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      toast.error('Login failed');
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Simulate registration
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        status: userData.role === 'therapist' ? 'pending' : undefined,
        ...(userData.emergencyContactEmail && { emergencyContactEmail: userData.emergencyContactEmail }),
        ...(userData.emergencyContactRelation && { emergencyContactRelation: userData.emergencyContactRelation }),
        ...(userData.age && { age: userData.age }),
        ...(userData.specialization && { specialization: userData.specialization }),
        ...(userData.location && { location: userData.location }),
        ...(userData.hourlyRate && { hourlyRate: userData.hourlyRate }),
        ...(userData.licenseNumber && { licenseNumber: userData.licenseNumber }),
        verified: userData.role === 'patient'
      };

      setUser(newUser);
      localStorage.setItem('mindcare_user', JSON.stringify(newUser));
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      toast.error('Registration failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mindcare_user');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}