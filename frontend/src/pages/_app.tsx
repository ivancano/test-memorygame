import type { AppProps } from "next/app";
import '../globals/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}