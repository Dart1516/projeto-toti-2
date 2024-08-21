import { UserProvider } from "../api/UserContext";
import { Poppins } from "next/font/google";
import "../assets/styles/global.css";
import HeaderAndMenu from "@/components/Header-NavMenu";

export const metadata = {
  title: "Toters Do Bem",
  description:
    "Somos uma plataforma que conecta psicólogos e educadores sociais com líderes comunitários para oferecer apoio psicológico e social às vítimas das inundações no Rio Grande do Sul. Junte-se a nós e faça a diferença!",
  titleSocialMedia: "Juntos pela Recuperação do RS: Conecte-se e Ajude",
  descriptionSocialMedia:
    "Somos uma plataforma que conecta psicólogos e educadores sociais com líderes comunitários para oferecer apoio psicológico e social às vítimas das inundações no Rio Grande do Sul. Junte-se a nós e faça a diferença!",
  keywords:
    "voluntariado, voluntario, inundações, rio grande do sul, psicólogos, educadores sociais, ajuda, ajuda humanitária, solidariedade, toti",
  robots: "index, follow",
  urlSite: "https://www.totersdobem.com.br/",
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable}`}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.titleSocialMedia} />
        <meta
          property="og:description"
          content={metadata.descriptionSocialMedia}
        />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content={metadata.robots} />
        <link rel="canonical" href={metadata.urlSite} />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon/faviconSolidarity.ico" />
      </head>
      <body>
        <UserProvider>
          <HeaderAndMenu />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
