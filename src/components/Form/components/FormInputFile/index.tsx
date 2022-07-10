import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';
import { Plus, WarningCircle } from 'phosphor-react';
import {
    ChangeEvent,
    Dispatch,
    forwardRef,
    ForwardRefRenderFunction,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { FieldError, UseFormSetError, UseFormTrigger } from 'react-hook-form';
import { toast } from 'react-toastify';

import { apiClient } from '../../../../services/apiClient';
import {
    ImgUpload,
    InputFileContainer,
    InputFileContent,
    InputFileLabel,
    MessageError,
} from './styles';

import 'react-circular-progressbar/dist/styles.css';

interface IRegisterProductFormData {
    image_name: string;
    description: string;
    price: number;
}

interface IFormInputFileProps {
    name: string;
    error?: FieldError;
    setImageUrl: Dispatch<SetStateAction<string>>;
    localImageUrl: string;
    setLocalImageUrl: Dispatch<SetStateAction<string>>;
    setError: UseFormSetError<IRegisterProductFormData>;
    trigger: UseFormTrigger<IRegisterProductFormData>;
    onChange: (event: ChangeEvent<HTMLInputElement>) => Promise<boolean | void>;
}

const FormInputFileBase: ForwardRefRenderFunction<
    HTMLInputElement,
    IFormInputFileProps
> = (
    {
        name,
        error,
        setImageUrl,
        localImageUrl,
        setLocalImageUrl,
        setError,
        trigger,
        onChange,
        ...rest
    }: IFormInputFileProps,
    ref,
) => {
    const [progress, setProgress] = useState<number>(0);
    const [isSending, setIsSending] = useState<boolean>(false);
    const [cancelToken, setCancelToken] = useState<CancelTokenSource>(
        {} as CancelTokenSource,
    );

    const handleImageUpload = useCallback(
        async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
            if (!event.target.files?.length) {
                return;
            }

            setImageUrl('');
            setLocalImageUrl('');
            setError('image_name', {});
            setIsSending(true);

            await onChange(event);
            trigger('image_name');

            // Build submission form
            const formData = new FormData();
            formData.append(event.target.name, event.target.files[0]);

            const { CancelToken } = axios;
            const source = CancelToken.source();
            setCancelToken(source);

            const config = {
                headers: { 'content-type': 'multipart/form-data' },
                onUploadProgress: (e: ProgressEvent) => {
                    setProgress(Math.round((e.loaded * 100) / e.total));
                },
                cancelToken: source.token,
            } as AxiosRequestConfig;

            try {
                const response = await apiClient.post(
                    '/products/image',
                    formData,
                    config,
                );

                setImageUrl(response.data.image_name);
                setLocalImageUrl(response.data.url_image);
            } catch (error: any) {
                if (error?.message === 'Cancelled image upload.') return;

                toast.error(error);
            } finally {
                setIsSending(false);
                setProgress(0);
            }
        },
        [onChange, setError, setImageUrl, setLocalImageUrl, trigger],
    );

    useEffect(() => {
        if (error?.message && isSending && cancelToken?.cancel) {
            cancelToken.cancel('Cancelled image upload.');
            setCancelToken({} as CancelTokenSource);
        }
    }, [cancelToken, error, isSending]);

    return (
        // COLOCAR CONTAINER DE ERRO || TESTAR PRA VER SE O UPLOAD DE IMAGEM ESTA SENDO FEITO AINDA
        <InputFileContainer error={error}>
            {!!error && (
                <MessageError>
                    <p>{error.message}</p>
                </MessageError>
            )}
            <InputFileContent>
                <InputFileLabel htmlFor="file" error={error}>
                    {!!error && <WarningCircle className="iconAlert" />}

                    {localImageUrl && !isSending ? (
                        <ImgUpload
                            src={localImageUrl}
                            alt="Upload photo"
                            className="imgUpload"
                        />
                    ) : (
                        <>
                            {isSending ? (
                                <>
                                    <CircularProgressbar
                                        value={progress}
                                        text={`${progress}`}
                                        styles={{
                                            trail: {
                                                stroke: '#3E3B47',
                                            },
                                            path: {
                                                stroke: '#F25D27',
                                            },
                                            text: {
                                                fill: '#F25D27',
                                                fontSize: '2.4rem',
                                            },
                                        }}
                                    />
                                    <p>Enviando...</p>
                                </>
                            ) : (
                                <>
                                    <Plus />
                                    <p>Adicione a imagem</p>
                                </>
                            )}
                        </>
                    )}
                </InputFileLabel>
                <input
                    type="file"
                    name={name}
                    id="file"
                    onChange={e => handleImageUpload(e)}
                    ref={ref}
                    {...rest}
                />
            </InputFileContent>
        </InputFileContainer>
    );
};

export const FormInputFile = forwardRef(FormInputFileBase);
