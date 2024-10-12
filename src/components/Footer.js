import Image from "next/image"; // Importar el componente Image de next/image
import Link from "next/link";
import React from "react";
//import "../assets/styles/App.css";
//import "../assets/styles/Footer.css";
import styles1 from "../assets/styles/App.module.css";
import styles2 from "../assets/styles/Footer.module.css";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import logo from "../../src/assets/images/logos/toters-logo-green-dark.svg";

function Footer() {
	// const currentYear = new Date().getFullYear();
	// const currentMonth = new Date().toLocaleString("default", { month: "long" });

	return (
		<div className={styles2["footer-container"]}>
			<div className={styles2["footer-columns"]}>
				<div className={styles2["footer-column"]}>
					<h4>Sobre nós</h4>
					<ul>
						<li>
							<a
								href="https://www2.camara.leg.br/legin/fed/lei/1998/lei-9608-18-fevereiro-1998-365398-publicacaooriginal-1-pl.html"
								target="_blank"
								rel="noopener noreferrer"
							>
								Legislação do voluntariado
							</a>
						</li>
						<li>
							<Link href="/aviso-legal" target="_blank">
								Proteção de dados
							</Link>
						</li>
						<li>
							<Link href="/termo-psicologo" target="_blank">
								Termo de Responsabilidade Psicólogos
							</Link>
						</li>
					</ul>
				</div>
				<div className={styles2["footer-column"]}>
					<h4>Parceiros</h4>
					<ul className={styles2.parceiros}>
						<li>
							<Link
								href="https://www.associacaodosangolanos.ong.br/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Associação de Angolanos RS
							</Link>
						</li>
					</ul>
				</div>
				<div className={styles2["footer-column"]}>
					<h4>Serviço</h4>
					<ul>
						<li>
							<Link href="/psicologo">Profissionais de saúde</Link>
						</li>
						<li>
							<Link href="/educador">Educador social</Link>
						</li>
					</ul>
				</div>
				<div className={styles2["footer-column"]}>
					<h4>Contato</h4>
					<ul>
						<li className={styles2["contato-footer"]}>
							<FaEnvelope className={styles2["icon-footer"]} />{" "}
							<a href="mailto:admin@totersdobem.com.br">admin@totersdobem.com.br</a>
						</li>
						{/* <li className=contato-footer">
              <FaPhone className="icon-footer" />{' '}
              <a href="tel:+559999999999">Telefone</a>
            </li> */}
					</ul>
				</div>
			</div>
			<hr />
			<div className={styles2["footer-logo-container"]}>
				<Image
					src={logo}
					alt="Toters do bem Logo"
					className={styles2["footer-logo"]}
					width={150}
					height={50}
				/>
				<p>Todos os direitos reservados - Julho © 2024</p>
			</div>
		</div>
	);
}

export default Footer;
