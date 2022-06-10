import { AppProps } from 'next/app';
import Modal from 'react-modal';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '../contexts/AuthContexts';
import { queryClient } from '../services/queryClient';
import GlobalStyles from '../styles/globals';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
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
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </AuthProvider>
    );
}

export default MyApp;
