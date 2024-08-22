"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../api/UserContext";
import "../assets/styles/Header-Minha-Conta.css";

function HeaderLogin() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, setUser } = useUser();

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
    switch (user.role) {
      case "lider":
        return "/minha-conta-lider";
      case "psicologo":
        return "/minha-conta-psicologo";
      case "educador":
        return "/minha-conta-educador";
      default:
        return "/";
    }
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  }

  if (!user) {
    return (
      <ul className="auth-links">
        <li>
          <Link href="/acesso" passHref>
            Login
          </Link>
        </li>
        <li>
          <Link href="/servicos" passHref className="register-btn">
            CADASTRAR
          </Link>
        </li>
      </ul>
    );
  }

  const name = user?.name?.split(" ")[0];

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropbtn" onClick={toggleDropdown}>
        Olá, <span>{name}!</span>
      </button>
      {dropdownOpen && (
        <div className="dropdown-content show">
          <Link href={getRolePath()}>Minha Conta</Link>
          {
            user.rol === "Lider" && (
              <Link href="/interfaz-lider">Lista de Voluntariados</Link>
            )
          }
          <Link href="/" onClick={logout}>Sair</Link>
        </div>
      )}
    </div>
  );
}

export default HeaderLogin;
