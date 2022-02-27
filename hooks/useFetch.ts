import React from 'react';

type FetchConfig = {
    options?: RequestInit;
    fetchOnMount?: boolean;
};

export default function useFetch(
    url: string,
    config: FetchConfig = { options: {}, fetchOnMount: true }) {

    const [data, setData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<any>(null);
    const [success, setSuccess] = React.useState<any>(false);

    const goFetch = async (newUrl = url) => {
        if (newUrl.trim() === '') throw new Error('url is empty');
        setLoading(true);
        setData(null);
        setError(null);
        setSuccess(false);
        const res = await fetch(newUrl, config.options);
        const data = await res.json();
        if (res.ok) {
            setData(data);
            setSuccess(true);
        }
        else setError(data);
        setLoading(false);
    };

    React.useEffect(() => {
        if (config.fetchOnMount) goFetch();
    }, [url]);

    return { data, loading, error, success, goFetch };
}