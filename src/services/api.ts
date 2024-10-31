import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.REACT_APP_API_URL;


interface UserRegistrationData {
    nome: string;
    email: string;
    senha: string;
    cep: string;
    rua: string;
    numero: number;
    telefone: string;
}

const api = axios.create({
    baseURL: API_URL,
});

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        console.error("Erro ao realizar o login:", error);
        throw error;
    }
};

export const registerUser = async (data: UserRegistrationData) => {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Erro ao cadastrar o usuário');
        } else {
            throw new Error('Erro desconhecido ao cadastrar o usuário');
        }
    }
};
export default api;