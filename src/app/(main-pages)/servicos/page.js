"use client";

import React from "react";
import { FaUser, FaBuilding, FaBook, FaEllipsisH } from 'react-icons/fa';
import Link from 'next/link';
import "../../../assets/styles/App.css";
import "../../../assets/styles/Cadastro.css";
import { Typography } from "@mui/material";

function Serviços() {
  return (
    <div className="App">
      <div className="background"></div>
      <div className="cadastro">
        <div className="cadastro-titulo">
          {/* <h1>Cadastro Social</h1> */}
          <h1>Como você se identifica?</h1>
          {/* <Typography>Selecione para qual formulário você gostaria de ser redirecionado.</Typography> */}
          <Typography>Selecione abaixo em qual categoria você se encaixa.</Typography>
        </div>
        <div className="cuadro-opciones">
          <div className="opción">
            <Link href="../../psicologo">
              <div className="icono">
                <FaUser />
              </div>
              <div className="opciones-texto">
                <h2>Psicólogo(a)</h2>
                <p>Voluntariado</p>
              </div>
            </Link>
          </div>
          <div className="opción">
            <Link href="../../educador">
              <div className="icono">
                <FaBuilding />
              </div>
              <div className="opciones-texto">
                <h2>Educador Social</h2>
                <p>Voluntariado</p>
              </div>
            </Link>
          </div>
          <div className="opción">
            <Link href="../../lider">
              <div className="icono">
                <FaBook />
              </div>
              <div className="opciones-texto liderança">
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
            <button className="botón-cadastro">
              voltar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Serviços;
