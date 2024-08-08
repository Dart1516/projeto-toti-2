"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "../assets/styles/Header-Minha-Conta.css";
import Logo from "../assets/images/logos/toters-logo-green-dark.svg";
import { useUser } from '../api/UserContext'; 

function HeaderLogin() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useUser();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getRolePath = () => {
    switch (user.rol) {
      case 'Lider':
        return "/minha-conta-lider";
      case 'Psicologo':
        return "/minha-conta-psicologo";
      case 'Educadorsocial':
        return "/minha-conta-educador";
      default:
        return "/";
    }
  };

  return (
    <div>
      <nav className="menu-conta">
        <div className="espacio-imagen">
          <Image src={Logo} alt="Logo" className="imagen-menu" width={100} height={50} />
        </div>
        <div className="dropdown" ref={dropdownRef}>
          <button className="dropbtn" onClick={toggleDropdown}>
            Olá, <span>{user.username}!</span>
          </button>
          {dropdownOpen && (
            <div className="dropdown-content show">
              <Link href={getRolePath()}>Minha Conta</Link>
              <Link href="/interfaz-lider">Lista de Voluntariados</Link>
              <Link href="/">Sair</Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default HeaderLogin;
