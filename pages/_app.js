import "../styles/globals.css";
import StudentLayout from "../components/Layouts/layout";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="keywords" content="Certificate, badge, blockchain" />
          <meta name="author" content="Lai & Ho" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>CredBLOCK</title>
          <meta
            name="description"
            content="A Application for the credential issues and verification"
          />
          <link rel="icon" href="/images/ico.svg" />
        </Head>
        <StudentLayout>
          <Component {...pageProps} />
        </StudentLayout>
      </SessionProvider>
    </>
  );
}
