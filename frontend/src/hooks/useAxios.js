import { useState } from "react";
import customAxios from "../services/axios";

const useAxios = (url, method) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async(payload) => {
        setIsLoading(true);
        try {
            const res = await customAxios[method.toLowerCase()](url, payload);
            setData(await res.json());
            setIsLoading(false);
        }
        catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }

    return { data, isLoading, error, fetchData }
};

export default useAxios;