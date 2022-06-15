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

type Customer = {
    id?: string;
    name: string;
    cpf: string;
    road: string;
    district: string;
    number: string;
    city: string;
    phone: string;
    zip_code: string;
    created_at?: string;
    id_account: string;
};

type Product = {
    id?: string;
    description: string;
    price: number;
    image_name: string;
    created_at?: string;
    id_account: string;
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

export { User, Role, Customer, IPayload, Product };
