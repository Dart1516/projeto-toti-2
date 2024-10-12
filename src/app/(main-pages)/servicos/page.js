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
					{/* <h1>Cadastro Social</h1> */}
					<h1>Como você se identifica?</h1>
					{/* <Typography>Selecione para qual formulário você gostaria de ser redirecionado.</Typography> */}
					<Typography>
						Selecione abaixo em qual categoria você se encaixa.
					</Typography>
				</div>
				<div className={styles2["cuadro-opciones"]}>
					<div className={styles2.opción}>
						<Link href="../../psicologo">
							<div className={styles2.icono}>
								<FaUser />
							</div>
							<div className={styles2["opciones-texto"]}>
								<h2>Psicólogo(a)</h2>
								<p>Voluntariado</p>
							</div>
						</Link>
					</div>
					<div className={styles2.opción}>
						<Link href="../../educador">
							<div className={styles2.icono}>
								<FaBuilding />
							</div>
							<div className={styles2["opciones-texto"]}>
								<h2>Educador Social</h2>
								<p>Voluntariado</p>
							</div>
						</Link>
					</div>
					<div className={styles2.opción}>
						<Link href="../../lider">
							<div className={styles2.icono}>
								<FaBook />
							</div>
							<div className={`${styles2["opciones-texto"]} ${styles2.liderança}`}>
								<h2>Lider de ONG</h2>
								<p>Imigrantes, refugiados e apátridas</p>
							</div>
						</Link>
					</div>
					{/* <div className="opción">
            <Link href="../../outros">
              <div className="icono">
                <FaEllipsisH />
              </div>
              <div className="opciones-texto">
                <h2>outros</h2>
                <p>descrição para opção 4</p>
              </div>
            </Link>
          </div> */}
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
