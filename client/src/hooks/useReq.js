import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext.jsx";
import { useCallback } from "react";

const baseUrl = 'http://localhost:3030';

export default function useReq(initialUrl = null, initialState = []) {
    const { user } = useContext(UserContext);
    const [data, setData] = useState(initialState)
    const [url, setUrl] = useState(initialUrl);

    const request = useCallback(async (endpoint = url, method = "GET", body = null, config = {}) => {
        if (!endpoint) throw new Error("Endpoint is undefind");
        const options = { method,headers: {} };

        // if(method) {
        //     options.method = method;
        // }

        if (body) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        // if (config.accessToken || isAuth) {
        //     options.headers = {
        //         ...options.headers,
        //         'X-Authorization': config.accessToken || user?.accessToken,
        //     }
        // }
        if (config.accessToken || user?.accessToken) {
            options.headers = {
                ...options.headers,
                'X-Authorization': config.accessToken || user?.accessToken,
            }
        }
        
        const response = await fetch(`${baseUrl}${endpoint}`, options);

        if (!response.ok) {
            let error;
            try {
                const errData = await response.json();
                error = new Error(errData.message || "Request Failed");
            } catch {
                error = new Error("Request failed");
            }

            error.status = response.status;
            throw error;
        }

        if (response.status === 204) return null;
        
        const result = await response.json();
        if(method === "GET") setData(result) // ауто упдате стате иф гет

        return result;
    }, [url ,user ]);

    useEffect(() => {
        if (url) request(url);
    }, [url, request]);
        
    const refresh = () => {
        if (url) request(url);
    }
    return {
        data,
        setData,
        request,
        setUrl,
        refresh
    };
}