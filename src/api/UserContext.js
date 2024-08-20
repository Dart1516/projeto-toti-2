"use client"
import { Api } from '@/services/api';
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, update] = useState(()=>{
    if(typeof window === 'undefined'){
      return null;
    }
    const storaged = localStorage.getItem('user');
    if(storaged){
      return JSON.parse(storaged);
    }
    return null;
  });

  const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));

    console.log(user);

    update(user);
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
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

export const useUser = () => useContext(UserContext);
