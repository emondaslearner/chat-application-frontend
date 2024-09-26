import React from 'react';
import Modal from '../../Model';
import { IoMdClose } from "react-icons/io";
import { getAllPhoto } from '@src/apis/photo';
import { useQuery } from 'react-query';
import Spinner from '@src/components/shared/Spinner';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store/store';

interface PhotosProps { }

const Photos: React.FC<PhotosProps> = () => {

    // profile data
    const profileData = useSelector((state: RootState) => state.auth)

    const { data, isLoading }: { data: any, isLoading: boolean } = useQuery({
        queryFn: () => getAllPhoto({
            limit: 30,
            page: 1,
            sortBy: "updatedAt",
            sortType: "dsc",
            search: ""
        }),
        staleTime: Infinity,
        queryKey: [`userPhotosAllPhotos${profileData.id}`],
    });

    return (
        <Modal
            openButton={
                <p className="text-primary_ hover:underline cursor-pointer table">
                    See all
                </p>
            }
            status='custom'
            title={
                <p className="text-[25px] text-center font-semibold text-dark_ dark:text-white_ ">
                    Photos
                </p>
            }
            position="middle"
            size="5xl"
            closeButton={true}
            customCloseButton={
                <div className="p-[10px] !bg-dark_gray_ dark:bg-light_gray_">
                    <IoMdClose size={30} className="text-dark_" />
                </div>
            }
            dismissable={false}
        >
            <div className='w-full h-full p-[20px]'>
                {
                    isLoading ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <Spinner loaderStatus={"elementLoader"} />
                        </div>
                    ) : (
                        <>
                            {
                                data?.data?.length ? (
                                    <div className='grid grid-cols-3 gap-[10px] max-h-[650px] overflow-y-auto'>
                                        {
                                            data.data.map((data: any, i: number) => (
                                                <img key={i} src={data.photo} alt="User Photos" className='w-full h-full rounded-lg' />
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div className='w-full h-full flex justify-center items-center mb-10 mt-3'>
                                        <p className='text-[20px] font-semibold text-dark_ dark:text-dark_text_'>There is no photo to show</p>
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </div>
        </Modal>
    );
};

export default Photos;