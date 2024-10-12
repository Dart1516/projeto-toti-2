"use client";
import Image from "next/image"; // Importar el componente Image de next/image
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import "../assets/styles/Header-NavMenu.css";
import MobileMenu from "../components/Mobile-Menu.js";
import styles1 from "../assets/styles/Header-NavMenu.module.css";
import styles2 from "../assets/styles/Mobile-Menu.module.css";
import logo from "../assets/images/logos/toters-logo-green-dark.svg";
import HeaderLogin from "./Header-Login";

function HeaderAndMenu() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div className={styles1.heder_nav_container}>
			{isClient && <MobileMenu />}
			<nav className={styles1.contenedor_de_opciones}>
				<div className={styles1["menu-left"]}>
					<ul className={styles1["opciones-derecha"]}>
						<Link href="/" passHref>
							<div className={styles1["logo-home"]}>
								<Image src={logo} alt="Logo Home" width={60} height={60} />
							</div>
						</Link>
					</ul>
				</div>
				<div className={styles1["opciones-izquierda"]}>
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
