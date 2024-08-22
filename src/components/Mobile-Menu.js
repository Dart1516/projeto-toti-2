'use client'
import React, { useEffect, useState } from "react";
import mobileStyles from "../assets/styles/Mobile-Menu.module.css";
import Link from "next/link";
import Image from 'next/image'; // Importar el componente Image de next/image
import { IoMenu, IoCloseOutline } from "react-icons/io5";
import logo from "../../src/assets/images/logos/toters-logo-green-dark.svg";

function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  }

  return (
    <div>
      {/* Header */}
      <nav className={mobileStyles["nav-container-mobile"]}>
        <div className={mobileStyles["menu-left"]}>
          <Link href="/">
            <div className={mobileStyles["mobile-logo"]}>
              <Image src={logo} alt="logo" width={150} height={50} />
            </div>
          </Link>
          <span className={mobileStyles["name"]}>Comunidade Toti</span>
        </div>
        {/* Icono del menú hamburguesa */}
        <div className={mobileStyles["ícone-menu-hambúrguer"]} onClick={toggleMenu}>
          {menuOpen ? <IoCloseOutline size={30} /> : <IoMenu size={30} />}
        </div>
      </nav>
      {/* Contenido del menu Mobile */}
      {menuOpen && (
        <div className={mobileStyles["menu-dropdown"]}>
          <div className={mobileStyles["menu"]}>
            <ul>
              <li>
                <Link href="/" passHref onClick={handleCloseMenu}>
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre-nos" onClick={handleCloseMenu}>Sobre Nós</Link>
              </li>
              <li>
                <Link href="/servicos" onClick={handleCloseMenu}>Serviços</Link>
              </li>
              <li>
                <Link href="/acesso" onClick={handleCloseMenu}>Login</Link>
              </li>
              <li>
                <Link href="/acesso" onClick={handleCloseMenu}>Cadastrar</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
