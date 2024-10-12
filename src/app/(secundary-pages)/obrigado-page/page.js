"use client";

import Link from "next/link";
import React from "react";
// import "../../../assets/styles/App.css";
// import "../../../assets/styles/ThankYou.css";
// import "../../../assets/styles/Button.css";
import styles1 from "../../../assets/styles/App.module.css";
import styles2 from "../../../assets/styles/ThankYou.module.css";
import styles3 from "../../../assets/styles/Button.module.css";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header-NavMenu";
const ThankYou = () => {
	return (
		<div className={styles2["body-thank"]}>
			<div className="App-header">
				<Header />
			</div>
			<div className={styles2["thank-you-page"]}>
				<h2>Agradecemos por seu registro!</h2>
				<p>Seu registro foi realizado com sucesso..</p>
				<div className={styles2["thank-you-buttons"]}>
					<Link
						href="../../acesso"
						className={`${styles3.button0} ${styles3.button1}`}
					>
						Fazer Login
					</Link>
					<Link href="/" className={`${styles3.button0} ${styles3.button2}`}>
						Voltar ao Início
					</Link>
				</div>
			</div>
			<Footer className="footer-thank" />
		</div>
	);
};

export default ThankYou;
