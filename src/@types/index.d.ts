type User = {
    id?: string;
    name: string;
    email: string;
    password?: string;
    username: string;
    telefone: string;
    role: {
        id: string;
        name: string;
        description: string;
    };
    id_account: string;
};

type Role = {
    id: string;
    name: string;
    description: string;
};

interface IPayload {
    name: string;
    email: string;
    username: string;
    telefone: string;
    role: {
        id: string;
        name: string;
        description: string;
    };
    id_account: string;
}

export { User, Role, IPayload };
