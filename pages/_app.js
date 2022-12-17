import "../styles/globals.css";
import StudentLayout from "../components/Layouts/layout";
import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <StudentLayout>
        <Component {...pageProps} />
      </StudentLayout>
    </SessionProvider>
  );
}
