import customAxios from "./axios";

export const loginAccount = async (loginPayload) => {
    try {
        const res = await customAxios.post('/api/account/login', loginPayload);
        return res;
    }
    catch (error) {
        throw new Error(error.response.data.error)
    }
};

export const registerAccount = async (registerPayload) => {
    try {
        const res = await customAxios.post('/api/account/register', registerPayload);
        return res;
    }
    catch (error) {
        throw new Error(error.response.data.error)
    }
};

export const getAllAccounts = async () => {
    try {
        const res = await customAxios.get('/api/accounts');
        return res;
    }
    catch (error) {
        throw new Error(error.response.data.error)
    }
};