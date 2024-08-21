"use client";

import React from "react";
import Link from "next/link";
import '../../../assets/styles/App.css';
import '../../../assets/styles/ThankYou.css';
import Header from "../../../components/Header-NavMenu";
import Footer from "../../../components/Footer";
import "../../../assets/styles/Button.css";
const ThankYou = () => {
  return (
    <div className="body-thank">
    <div className="App-header">
        <Header />
      </div>
    <div className="thank-you-page">
      <h2>Agradecemos por seu registro!</h2>
      <p>Seu registro foi realizado com sucesso..</p>
      <div className="thank-you-buttons">
        <Link href="../../acesso" className="button0 button1">Fazer Login</Link>
        <Link href="/" className="button0 button2">Voltar ao Início</Link>
      </div>
    </div>
<Footer className="footer-thank"/>
    </div>

  );
}

export default ThankYou;
