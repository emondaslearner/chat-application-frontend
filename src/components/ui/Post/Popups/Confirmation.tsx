import React, { useRef } from 'react';
import Modal from '../../Model';
import { IoMdClose } from "react-icons/io";
import Button from '@src/components/shared/Button';
import { useMutation } from 'react-query';
import { success } from '@src/utils/alert';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/store/store';
import { handleAxiosError } from '@src/utils/error';
import { deletePostAPI } from '@src/apis/post';
import { deletePostFromStore } from '@src/store/actions/post';

interface ConfirmationProps {
    deletePopupRef: any;
    postId: string;
    postIndex: number;
}

const Confirmation: React.FC<ConfirmationProps> = ({ deletePopupRef, postId, postIndex }) => {

    // close
    const closePopup = useRef<any>()

    // dispatch
    const dispatch: AppDispatch = useDispatch();

    // theme mode
    const themeColor: "dark" | "light" = useSelector((state: RootState) => state.themeConfig.mode);

    const deletePost = async () => {
        try {
            const data = await deletePostAPI({ postId });

            return data;
        } catch (err) {
            handleAxiosError(err, themeColor);
            throw err;
        }
    }

    const { mutate, isLoading } = useMutation({
        mutationFn: deletePost,
        mutationKey: ["deletePost"],
        onSuccess: () => {
            success({ message: "Post deleted successfully", themeColor });
            dispatch(deletePostFromStore(postIndex))
            closePopup.current?.click();
        }
    })

    return (
        <Modal
            title={
                <p className="text-[25px] text-center font-semibold text-dark_ dark:text-white_ ">
                    Confirmation
                </p>
            }
            status='custom'
            size='md'
            openButton={
                <p className='hidden' ref={deletePopupRef}>Delete Post</p>
            }
            dismissable={false}
            position='middle'
            closeButton={true}
            customCloseButton={
                <div ref={closePopup} className="p-[10px] !bg-dark_gray_ dark:bg-light_gray_">
                    <IoMdClose size={30} className="text-dark_" />
                </div>
            }
        >
            <div className='w-[90%] mx-auto'>
                <p className='text-dark_ dark:text-dark_text_ text-[18px] text-center'>Are you sure? you want to delete this.</p>

                <Button onClick={mutate} loader={isLoading} loaderMessage="Deleting..." fill={true} className='w-full !bg-red-800 hover:!bg-red-500 duration-300 transition-all mt-[30px] mb-[20px]'>Delete</Button>
            </div>
        </Modal>
    );
};

export default Confirmation;