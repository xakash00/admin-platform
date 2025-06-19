import { useQuery } from "@tanstack/react-query";
import api from "./axiosInstance";


export const useCurrentUser = () => {

    return useQuery({
        queryKey: ['curentUser'], // This is correct for v5
        queryFn: async () => {
            const response = await api({
                method: 'GET', url: '/protected', withCredentials: true
            })
            return response.data?.data;
        },
        onSuccess: (data) => {
            console.log(data)
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    });
};

