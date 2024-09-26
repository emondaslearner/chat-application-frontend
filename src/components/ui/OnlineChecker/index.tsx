import { updateUserData } from '@src/apis/user';
import useOnlineStatus from '@src/hooks/useOnlineStatus';
import { setUserData } from '@src/store/actions/auth';
import { AppDispatch, RootState } from '@src/store/store';
// import { info } from '@src/utils/alert';
import { handleAxiosError } from '@src/utils/error';
import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

interface OnlineCheckerProps { }

const OnlineChecker: React.FC<OnlineCheckerProps> = () => {
    const isOnline: boolean = useOnlineStatus();

    // profile data
    const profileData = useSelector((state: RootState) => state.auth);

    // mode
    const mode = useSelector((state: RootState) => state.themeConfig.mode);

    // dispatch
    const dispatch: AppDispatch = useDispatch();

    const updateUserStatus = async () => {
        try {
            const data = await updateUserData({ status: isOnline ? 'online' : 'offline' });

            return data;
        } catch (err) {
            handleAxiosError(err, mode);
            throw err;
        }
    }

    const { mutate } = useMutation({
        mutationFn: updateUserStatus,
        mutationKey: [`changeOnlineStatus${profileData.id}`],
        onSuccess: (data: any) => {
            dispatch(setUserData({ ...profileData, status: data?.data.status }));
            // if (data?.data.status !== profileData.status) {
            //     info({ message: isOnline ? "You are online again" : "You are offline", themeColor: mode });
            // }
        }
    });


    useEffect(() => {
        if (isOnline !== undefined && profileData.status !== (isOnline ? 'online' : 'offline')) {
            profileData.id && mutate();
        }
    }, [isOnline, profileData]);

    return <></>;
};

export default OnlineChecker;