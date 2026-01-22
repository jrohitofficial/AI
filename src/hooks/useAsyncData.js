import { useEffect, useState } from 'react';

const useAsyncData = (fetcher, deps = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let active = true;
        setLoading(true);
        fetcher().then((payload) => {
            if (active) {
                setData(payload);
                setLoading(false);
            }
        });
        return () => {
            active = false;
        };
    }, deps);

    return { data, loading };
};

export default useAsyncData;
