import React, { useContext } from 'react';

const LoadingContext = React.createContext<any>(false);

const useLoading = () => useContext<any>(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode; }) {
    const [loading, setLoading] = React.useState(false);
    const toggleLoading = () => setLoading(prevLoading => !prevLoading);
    return (
        <LoadingContext.Provider value={{ loading, toggleLoading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}

export default useLoading;