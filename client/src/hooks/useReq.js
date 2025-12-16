import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext.jsx";

const baseUrl = 'http://localhost:3030';

export default function useReq(url, initialState) {
    const { user, isAuth} = useContext(UserContext);
    const [data, setData] = useState(initialState)

    const request = async (url, method, data, config = {}) => {
        let options = {};

        if(method) {
            options.method = method;
        }

        if (data) {
            options.headers = {
                'content-type': 'application/json',
            }
            
            options.body = JSON.stringify(data);
        }

        if (config.accesToken || isAuth) {
            options.headers = {
                ...options.headers,
                'X-Authorization': config.accesToken || user.accesToken,
            }
        }
        
        const response = await fetch(`${baseUrl}${url}`, options);

        if (!response.ok) {
            throw response.statusText;
        }

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();
        return result;
    }

    useEffect(() => {
        if (!url) {
            return;
        }
        request(url)
        .then(result => setData(result))
        .catch(err => alert(err))
    }, [url]);
    return {
        data,
        setData,
        request
    };
}