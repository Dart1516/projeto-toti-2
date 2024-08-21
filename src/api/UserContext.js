"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * @typedef {object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} cpf
 * @property {string} birthDate
 * @property {string} phoneNumber
 * @property {string} rede_social
 * @property {string} crp
 * @property {string} specialization
 * @property {string} state
 * @property {string} day
 * @property {string} hour
 * @property {string} notes
 * @property {boolean} termos
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} role
 */

/**
 * @typedef {User | null} UserState
 */

/**
 * @typedef {object} UserContextValue
 * @property {UserState} user
 * @property {(user: UserState) => void} setUser
 */

const UserContext = createContext(
  /** @type {UserContextValue | undefined} */ (undefined)
);

/**
 * @param {{ children: React.ReactNode }} props
 */
export const UserProvider = ({ children }) => {
  /**
   * @type {[UserState, React.Dispatch<React.SetStateAction<UserState>>]}
   */
  const [user, update] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }
    const storaged = localStorage.getItem("user");
    if (storaged) {
      return JSON.parse(storaged);
    }
    return null;
  });

  /**
   * @param {UserState} user
   */
  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    console.log(user);
    update(user);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      update(JSON.parse(user));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Hook para acessar o contexto do usuário.
 * @returns {UserContextValue}
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
