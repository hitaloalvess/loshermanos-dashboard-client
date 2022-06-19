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

type Sale = {
    id?: string;
    total: number;
    value_pay: number;
    descount: number;
    sale_type: 'PENDING' | 'PAID_OUT';
    updated_at: string;
    created_at?: string;
    id_account: string;
    id_customer: string;
    customer: {
        id: string;
        name: string;
        cpf: string;
        road: string;
        district: string;
        number: string;
        city: string;
        phone: string;
        zip_code: string;
        created_at: string;
    };
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

export { User, Role, Customer, Sale, Sale_type, IPayload, Product };