"use client";

import React, { useState } from "react";
import Image from "next/image"; // Importar el componente Image de next/image
import Link from "next/link"; // Importar el componente Link de next/link
import Footer from "../../../components/Footer";
import "../../../assets/styles/Mobile-Menu.module.css";
import "../../../assets/styles/App.css";
import {
  Grid,
  Container,
  Typography,
  styled,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import imagenGente from "../../../assets/images/imagenSobreNos3.jpg";
import imgComunidade from "../../../assets/images/voluntarios.jpg";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SecurityIcon from "@mui/icons-material/Security";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import barbara from "../../../assets/images/toters/Barbara.jpg";
import bruno from "../../../assets/images/toters/Bruno.jpg";
import camila from "../../../assets/images/toters/Camila.jpg";
import david from "../../../assets/images/toters/David.jpg";
import daysi from "../../../assets/images/toters/Daysi.jpg";
import jani from "../../../assets/images/toters/Jani.png";
import manuel from "../../../assets/images/toters/Manuel.jpg";
import marianela from "../../../assets/images/toters/Maríanela.jpg";
import maria from "../../../assets/images/toters/Maria.jpg";
import miguel from "../../../assets/images/toters/Miguel.png";
import Natalia from "../../../assets/images/toters/Nadi.jpeg";
import luis from "../../../assets/images/toters/Luis.jpg";
import avatar from "../../../assets/images/toters/Maríanela.jpg";
import Daysi from "../../../assets/images/toters/Jani.png";
import "../../../assets/styles/sobreNos.css";
import Header from "../../../components/Header-NavMenu";

const About = () => {
  const [showAllCards, setShowAllCards] = useState(false);

  const toggleCards = () => {
    setShowAllCards(!showAllCards);
  };

  const StyledImg = styled(Image)(() => ({
    width: "100%",
    maxWidth: "800px",
    alignItems: "center",
    borderRadius: "2%",
    display: "flex",
  }));

  const Styledbutton = styled(Link)(() => ({
    alignItems: "center",
    borderRadius: "10px",
    textDecoration: "none",
    padding: "0.7rem 3rem",
    fontSize: "1rem",
    backgroundColor: "#FFB30B",
    color: "black",
    fontWeight: "600",
  }));

  const StyledbuttonVoluntario = styled(Link)(() => ({
    alignItems: "center",
    borderRadius: "10px",
    textDecoration: "none",
    padding: "0.7rem 3rem",
    fontSize: "1rem",
    backgroundColor: "#084f54",
    color: "#ffff",
    fontWeight: "600",
  }));

  return (
    <>
      <header className="App-header">
        <Header />
      </header>
      <div id="about">
        <Container
          maxWidth="xl"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100vw",
          }}
        >
          {/* conteúdo da primeira div ---------------------------------------------------- */}
          <div className="grid-container-main">
            <div className="text-main">
              <Typography variant="h4" color="black" fontWeight={700}>
                Quem Somos?
                <hr className="hr" />
              </Typography>
              <Typography variant="body">
                A Comunidade Toti é um coletivo de profissionais imigrantes de
                tecnologia no Brasil, unidos pelo desejo de crescer
                profissionalmente e de apoiar uns aos outros. Nossa missão é
                oferecer um espaço de acolhimento, onde o conhecimento e as
                experiências se entrelaçam para criar oportunidades de
                desenvolvimento e integração.
              </Typography>
            </div>
            {/* img da primeira div -------------------- */}
            <div className="img-main"></div>
          </div>

          {/* conteúdo da segunda div -------------------------------------- */}
          <div className="grid-container-main reverse">
            {/* img da segunda div--------------------- */}
            <div className="img-main-center">
              <StyledImg
                src={imgComunidade}
                alt="Voluntarios no RS"
                width={800}
                height={450}
              />
              <span>
                As Toters Marianela Arana & Mayfer Ramirez, são voluntarias no
                RS
              </span>
            </div>
            <div className="text-main">
              <Typography variant="h4" color="black" fontWeight={700}>
                Nossa visão <hr className="hr" />
              </Typography>
              <Typography variant="body">
                Em resposta a os recentes eventos no Rio Grande do Sul, nossa
                comunidade está mobilizada para fazer a diferença.
              </Typography>
              <Typography variant="body">
                Com empatia e solidariedade, lançamos esta plataforma para
                conectar voluntários e recursos, visando oferecer ajuda prática
                e esperança àqueles afetados pelas inundações.
              </Typography>
              <Typography variant="body">
                O intuito dessa plataforma é oferecer apoio psicossocial às
                famílias afetadas pela tragédia no RS, disponibilizando serviços
                com psicólogos e educadores sociais. Esses profissionais estão
                prontos para atender e auxiliar no processo de recuperação
                emocional e social das pessoas impactadas, garantindo um suporte
                integral e humanizado.
              </Typography>
            </div>
          </div>

          {/* conteúdo da terceira div ---------------------------------------------------- */}
          <div className="grid-container-main" marginTop={10}>
            <div className="text-main">
              <Typography
                textAlign="start"
                variant="h4"
                color="black"
                fontWeight={700}
              >
                Faça parte você também <hr className="hr" />
              </Typography>
              <Typography textAlign="start" variant="body">
                Convidamos profissionais de todas as áreas a se juntarem a este
                movimento humanitário, contribuindo com seu tempo e habilidades
                em apoio às vítimas das inundações no RS. Esperamos que muitos
                se juntem a nós neste esforço coletivo, pois juntos somos mais
                fortes. Todos juntos pelo Rio Grande do Sul.
              </Typography>
            </div>
            {/* img da primeira div -------------------- */}
            <div className="img-main">
              <StyledImg
                src={imagenGente}
                alt="Imagem sobre nós"
                width={800}
                height={450}
              />
            </div>
          </div>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            display="flex"
            padding={{ xs: "0", md: "1.5rem" }}
            marginBottom={10}
            marginTop={2}
          >
            <Grid
              item
              xs={12}
              md={12}
              display="flex"
              gap={2}
              alignItems="center"
              padding={{ xs: "0", md: "1rem" }}
              justifyContent="space-evenly"
              direction={{ xs: "column-reverse", md: "row" }}
            >
              <Styledbutton href="./demo">Liderança Emigrante </Styledbutton>
              <StyledbuttonVoluntario href="/servicos">
                Quero ser voluntário
              </StyledbuttonVoluntario>
            </Grid>
          </Grid>

          {/* ============================== NOSSOS VALORES ================================== */}
          <div className="nossoValores">
            <Typography
              textAlign="center"
              justifyContent="center"
              variant="h4"
              color="black"
              fontWeight={700}
            >
              Nossos valores
              <hr className="hr center" />
            </Typography>
            <Grid
              container
              spacing={2}
              display="flex"
              alignItems="center"
              padding={{ xs: "0", md: "1rem" }}
              justifyContent="center"
              direction="row"
              marginBottom={3}
              mt="2rem"
            >
              <Grid item xs={5} md={4}>
                <Card sx={{ maxWidth: "100%" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Empatia <SentimentSatisfiedAltIcon />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Compreensão e respeito pelas experiências e desafios dos
                      imigrantes e das comunidades afetadas por enchentes.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={7} md={4}>
                <Card sx={{ maxWidth: "100%" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Inclusão <AutorenewIcon />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Garantir que o site e seus serviços sejam acessíveis e
                      úteis para pessoas de diversas origens, línguas e
                      habilidades.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={7} md={4}>
                <Card sx={{ maxWidth: "100%" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Segurança e Privacidade <SecurityIcon />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Proteger os dados pessoais e sensíveis dos usuários com
                      rigor
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5} md={4}>
                <Card sx={{ maxWidth: "100%" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Resiliência <PeopleIcon />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Adaptar-se e responder efetivamente a desafios e mudanças,
                      tanto tecnológicas quanto sociais.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                display="flex"
                gap={2}
                alignItems="center"
                padding={{ xs: "0", md: "0" }}
              >
                <Card sx={{ maxWidth: "100%" }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      alignItems="center"
                    >
                      Qualidade <StarIcon />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Entregar um produto confiável, intuitivo e funcional que
                      atende às necessidades dos usuários.Inovação:Investir em
                      pesquisa e desenvolvimento para integrar novas soluções
                      tecnológicas que possam beneficiar os usuários.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
          {/* CARDS DO TIME--------------------------------------*/}
          <div id="container-time">
            <Typography
              textAlign="center"
              justifyContent="center"
              variant="h4"
              color="black"
              fontWeight={700}
            >
              Nosso Time
              <hr className="hr center" />
            </Typography>

            <div id="grid-container-cards">
              <Card className="card-toter">
                <Image
                  src={barbara}
                  alt="barbara"
                  title="barbara"
                  height={190}
                  width={190}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   Barbara Nery
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mentor TI
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/barbarasemacento"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              <Card className="card-toter">
                <Image
                  src={bruno}
                  alt="bruno"
                  title="bruno"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   Bruno de Souza
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Voluntário TI
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/brunoclaumari"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              <Card className="card-toter">
                <Image
                  src={camila}
                  alt="camila"
                  title="camila"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Camila Souza
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Voluntária TI
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/camiladz"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              
              <Card className={`card-toter ${showAllCards ? "" : "hidden"}`}>
                <Image
                  src={david}
                  alt="david"
                  title="david"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    David Puche
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Toter
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/Danvddpf1"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              
              <Card className={`card-toter ${showAllCards ? "" : "hidden"}`}>
                <Image
                  src={daysi}
                  alt="daysi"
                  title="daysi"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Diassibel Cotiz
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lider TI - Back End
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/Dart1516"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              <Card className={`card-toter ${showAllCards ? "" : "hidden"}`}>
                <Image
                  src={jani}
                  alt="Daysi"
                  title="Daysi"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Jani Exaez
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   Voluntária TI
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/jexaez"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              <Card className={`card-toter ${showAllCards ? "" : "hidden"}`}>
                <Image
                  src={luis}
                  alt="luis"
                  title="luis"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Luis Cláudio
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Voluntário TI
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/luiz-claudio-rj"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              <Card className={`card-toter ${showAllCards ? "" : "hidden"}`}>
                <Image
                  src={manuel}
                  alt="manuel"
                  title="manuel"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Manuel Bernardo
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Toter
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/ManueBernardo"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              <Card className={`card-toter ${showAllCards ? "" : "hidden"}`}>
                <Image
                  src={marianela}
                  alt="marianela"
                  title="marianela"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Maríanela Arana
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   Gestora de Projeto - Analista de Dados 
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/Dart1516"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              <Card className={`card-toter ${showAllCards ? "" : "hidden"}`}>
                <Image
                  src={maria}
                  alt="Marianela"
                  title="Marianela"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Maria Rondon
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Toter
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/Dart1516"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              <Card className={`card-toter ${showAllCards ? "" : "hidden"}`}>
                <Image
                  src={miguel}
                  alt="miguel"
                  title="miguel"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Miguel Lozada
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Voluntário TI
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/Lozada98"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              <Card className={`card-toter ${showAllCards ? "" : "hidden"}`}>
                <Image
                  src={Natalia}
                  alt="Natalia"
                  title="Natalia"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Nadi Duno
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Toter
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/Dart1516"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              <Card className={`card-toter ${showAllCards ? "" : "hidden"}`}>
                <Image
                  src={Natalia}
                  alt="Natalia"
                  title="Natalia"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Natalia Augusto
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    UX/UI Designer
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/Dart1516"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              
              <Card className={`card-toter ${showAllCards ? "" : "hidden"}`}>
                <Image
                  src={avatar}
                  alt="avatar"
                  title="avatar"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Barbara
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Voluntaria Mentor
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/Dart1516"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              <Card className={`card-toter ${showAllCards ? "" : "hidden"}`}>
                <Image
                  src={Natalia}
                  alt="Natalia"
                  title="Natalia"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Natalia Augusto
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    UX/UI Designer
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/Dart1516"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              <Card className={`card-toter ${showAllCards ? "" : "hidden"}`}>
                <Image
                  src={Natalia}
                  alt="Natalia"
                  title="Natalia"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Natalia Augusto
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    UX/UI Designer
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/Dart1516"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              
              
              <Card className={`card-toter ${showAllCards ? "" : "hidden"}`}>
                <Image
                  src={Natalia}
                  alt="Natalia"
                  title="Natalia"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Natalia Augusto
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    UX/UI Designer
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/Dart1516"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              <Card className={`card-toter ${showAllCards ? "" : "hidden"}`}>
                <Image
                  src={Natalia}
                  alt="Natalia"
                  title="Natalia"
                  height={190}
                  width={190}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Natalia Augusto
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    UX/UI Designer
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "black" }}
                    target="_blank"
                    href="https://github.com/Dart1516"
                  >
                    Github
                  </Button>
                </CardActions>
              </Card>
              <button onClick={toggleCards} className="button-cards">
                {showAllCards ? "Ver menos" : "Ver mais"}
              </button>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default About;
