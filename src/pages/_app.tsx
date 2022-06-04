import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '../contexts/AuthContexts';
import GlobalStyles from '../styles/globals';

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <GlobalStyles />
            <Component {...pageProps} />
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </AuthProvider>
    );
}

export default MyApp;
