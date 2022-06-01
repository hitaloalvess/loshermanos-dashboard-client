import { AppProps } from 'next/app';

import GlobalStyles from '../styles/globals';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyles />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
