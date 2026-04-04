"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * components/providers/CustomerProvider.tsx
 * 
 * Manages the global authentication state for the Shopify storefront.
 * Checks the login status on mount and provides the user's profile to any component.
 */

interface CustomerProfile {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: {
    emailAddress: string;
  };
}

interface CustomerContextValue {
  customer: CustomerProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const CustomerContext = createContext<CustomerContextValue | null>(null);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch current profile from our backend session
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/profile");
        const { profile } = await response.json();
        setCustomer(profile);
      } catch (err) {
        console.error("Auth check failed:", err);
        setCustomer(null);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  const login = () => {
    // Redirect to our internal login route, which handles the Shopify OAuth redirect
    window.location.href = "/api/auth/login";
  };

  const logout = () => {
    // Redirect to our internal logout route, which clears cookies
    window.location.href = "/api/auth/logout";
  };

  const value = {
    customer,
    isAuthenticated: !!customer,
    isLoading,
    login,
    logout,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

/**
 * Convenience hook to access the customer context.
 */
export function useCustomer() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
}
