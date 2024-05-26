import customAxios from "./axios";

export const getAdminPaginatedPosts = async (page) => {
    try {
        const res = await customAxios.get(`/api/posts?limit=9&page=${page}`);
        return res.data;
    }
    catch (error) {
        throw new Error(error.response.data.error)
    }
};

export const getUserPaginatedPosts = async (page) => {
    try {
        const res = await customAxios.post("/api/posts/myPost", { page: page, limit: 9 });
        return res.data;
    }
    catch (error) {
        throw new Error(error.response.data.error)
    }
};

export const createPost = async (postPayload) => {
    try {
        const res = await customAxios.post("/api/posts/create", postPayload);
        return res.data;
    }
    catch (error) {
        throw new Error(error.response.data.error)
    }
};

export const editPost = async (id, postPayload) => {
    try {
        const res = await customAxios.put(`/api/posts/edit/${id}`, postPayload);
        return res;
    }
    catch (error) {
        throw new Error(error.response.data.error)
    }
};

export const getPost = async (id) => {
    try {
        const res = await customAxios.get(`/api/posts/view/${id}`);
        return res;
    }
    catch (error) {
        throw new Error(error.response.data.error)
    }
};

export const deletePost = async (id) => {
    try {
        const res = await customAxios.delete(`/api/posts/delete/${id}`);
        return res;
    }
    catch (error) {
        throw new Error(error.response.data.error)
    }
};