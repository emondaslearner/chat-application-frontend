import { useEffect } from 'react';

const useBeforeUnload = (callback: () => void): void => {
    useEffect(() => {
        const handleBeforeUnload = (): void => {
            callback();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [callback]);
};

export default useBeforeUnload;
