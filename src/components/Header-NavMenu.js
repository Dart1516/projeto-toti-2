import React from "react";
import Link from "next/link";
import Image from 'next/image'; // Importar el componente Image de next/image
import "../assets/styles/Header-NavMenu.css";
import MobileMenu from "../components/Mobile-Menu.js";
import logo from "../assets/images/logos/toters-logo-green-dark.svg";

function HeaderAndMenu() {
  return (
    <div>
      <MobileMenu />
      {/* Icono del menú hamburguesa */}
      <nav className="contenedor_de_opciones">
        <div className="menu-left">
          <ul className="opciones-derecha">
            <Link href="/" passHref>
              <div className="logo-home">
                <Image src={logo} alt="Logo Home" width={150} height={50} />
              </div>
            </Link>
          </ul>
        </div>
        <ul className="opciones-izquierda">
          <li>
            <Link href="/" passHref>
              Início
            </Link>
          </li>
          <li>
            <Link href="/sobre-nos" passHref>
              Sobre nós
            </Link>
          </li>
          <li className="menu-option-right">
            <Link href="/servicos" passHref>
              Serviços
            </Link>
          </li>
          <li className="menu-option-right">
            <Link href="/acesso" passHref>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HeaderAndMenu;
