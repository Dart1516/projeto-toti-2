"use client";

import Link from "next/link";
import React from "react";
import { FaBook, FaBuilding, FaEllipsisH, FaUser } from "react-icons/fa";
// import "../../../assets/styles/App.css";
// import "../../../assets/styles/Cadastro.css";
import styles1 from "../../../assets/styles/App.module.css";
import styles2 from "../../../assets/styles/Cadastro.module.css";
import { Typography } from "@mui/material";
import Header from "../../../components/Header-NavMenu";

function Serviços() {
	return (
		<div className={styles1.App}>
			<div className="App-header">
				<Header />
			</div>
			<div className={styles2.background} />
			<div className={styles2.cadastro}>
				<div className={styles2["cadastro-titulo"]}>
					<h1>Cadastro Social</h1>
					<Typography>
						selecione para qual formulário você gostaria de ser redirecionado.
					</Typography>
				</div>
				<div className={styles2["cuadro-opciones"]}>
					<div className={styles2.opción}>
						<Link href="../outros/psicologo">
							<div className={styles2.icono}>
								<FaUser />
							</div>
							<div className={styles2["opciones-texto"]}>
								<h2>psicólogo(a) voluntariado</h2>
								<p>descrição para opção 1</p>
							</div>
						</Link>
					</div>
					<div className={styles2.opción}>
						<Link href="../outros/educador">
							<div className={styles2.icono}>
								<FaBuilding />
							</div>
							<div className={styles2["opciones-texto"]}>
								<h2>educador social voluntariado</h2>
								<p>descrição para opção 2</p>
							</div>
						</Link>
					</div>
					<div className={styles2.opción}>
						<Link href="../outros/lider">
							<div className={styles2.icono}>
								<FaBook />
							</div>
							<div className={`${styles2["opciones-texto"]} ${styles2.liderança}`}>
								<h2>Lider de ONG de Imigrantes, refugiados e apátridas</h2>
								<p>descrição para opção 3</p>
							</div>
						</Link>
					</div>
				</div>
				<div>
					<Link href="/">
						<button className={styles2["botón-cadastro"]}>voltar</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Serviços;
