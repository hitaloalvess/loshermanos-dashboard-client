import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { parseCookies, setCookie } from 'nookies';

import { apiAuth } from './apiClient';

type FailedRequestQueueType = {
    onSuccess: (token: string) => void;
    onFailure: (error: AxiosError) => void;
};

let isRefreshing = false;
let failedRequestsQueue: FailedRequestQueueType[] = [];

export function setupClient(ctx = undefined) {
    const cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: process.env.BASE_URL,
        headers: {
            Authorization: `Bearer ${cookies['@LosHermanosDash.token']}`,
        },
    });

    api.interceptors.response.use(
        response => {
            return response;
        },
        (error: AxiosError<any>) => {
            if (error.response?.status === 401) {
                if (error.response.data?.message === 'Invalid Token') {
                    console.log(error.response.data);
                    const cookies = parseCookies(ctx);
                    const { '@LosHermanosDash.refreshToken': refreshToken } =
                        cookies;

                    const originalConfig: AxiosRequestConfig = error.config;

                    if (!isRefreshing) {
                        isRefreshing = true;

                        apiAuth
                            .post('/refreshToken', { refreshToken })
                            .then(response => {
                                const { token } = response.data;

                                setCookie(
                                    undefined,
                                    '@LosHermanosDash.token',
                                    token,
                                    {
                                        maxAge: 60 * 60 * 24 * 7, // 7 days
                                        path: '/',
                                    },
                                );

                                setCookie(
                                    undefined,
                                    '@LosHermanosDash.refreshToken',
                                    refreshToken,
                                    {
                                        maxAge: 60 * 60 * 24 * 30, // 30 days
                                        path: '/',
                                    },
                                );

                                api.defaults.headers.common.Authorization = `Bearer ${token}`;

                                failedRequestsQueue.forEach(request =>
                                    request.onSuccess(token),
                                );
                                failedRequestsQueue = [];
                            })
                            .catch(error => {
                                failedRequestsQueue.forEach(request =>
                                    request.onFailure(error),
                                );
                                failedRequestsQueue = [];
                            })
                            .finally(() => {
                                isRefreshing = false;
                            });
                    }

                    return new Promise((resolve, reject) => {
                        failedRequestsQueue.push({
                            onSuccess: (token: string) => {
                                if (originalConfig.headers) {
                                    originalConfig.headers.Authorization = `Bearer ${token}`;
                                }
                            },
                            onFailure: (error: AxiosError) => {
                                reject(error);
                            },
                        });
                    });
                }
            }

            return Promise.reject(error);
        },
    );

    return api;
}
