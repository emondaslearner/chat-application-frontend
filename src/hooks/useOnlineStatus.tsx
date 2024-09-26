import { useEffect, useState } from 'react';

const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                setIsOnline(false);
            } else if (document.visibilityState === 'visible' && isOnline) {
                setIsOnline(true);
            }
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        window.addEventListener('beforeunload', handleOffline);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('beforeunload', handleOffline);
            document.addEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [])

    return isOnline;
};

export default useOnlineStatus;