"use client";
import Image from "next/image"; // Importar el componente Image de next/image
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../assets/styles/Header-NavMenu.css";
import logo from "../assets/images/logos/toters-logo-green-dark.svg";
import MobileMenu from "../components/Mobile-Menu.js";
import HeaderLogin from "./Header-Login";

function HeaderAndMenu() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div className="heder_nav_container">
			{isClient && <MobileMenu />}
			<nav className="contenedor_de_opciones">
				<div className="menu-left">
					<ul className="opciones-derecha">
						<Link href="/" passHref>
							<div className="logo-home">
								<Image src={logo} alt="Logo Home" width={60} height={60} />
							</div>
						</Link>
					</ul>
				</div>
				<div className="opciones-izquierda">
					<ul className="pages-links">
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
						<li>
							<Link href="/servicos" passHref>
								Serviços
							</Link>
						</li>
					</ul>
					{isClient && <HeaderLogin />}
				</div>
			</nav>
		</div>
	);
}

export default HeaderAndMenu;
