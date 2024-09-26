import Button from "@src/components/shared/Button";
import Modal from "@src/components/ui/Model";
import React, { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface ProfilePicProps {
  children?: ReactNode;
  title: string;
  src: string;
  nullifyState: () => void;
  buttonLoader: boolean;
  savePicture: (e: any) => void;
}

const ProfilePic: React.FC<ProfilePicProps> = ({
  children,
  title,
  src,
  nullifyState,
  buttonLoader,
  savePicture
}) => {
  const isOpenPopup = (open: any) => {
    open();
  };

  return (
    <Modal
      title={
        <p className="text-[25px] text-center font-semibold text-dark_ dark:text-white_ ">
          {title}
        </p>
      }
      status="custom"
      position="middle"
      size="2xl"
      closeButton={true}
      openButton={children}
      isOpenPopup={isOpenPopup}
      customCloseButton={
        <div
          className="p-[10px] !bg-red-500 dark:bg-light_gray_ bg="
        >
          <IoMdClose onClick={nullifyState} size={30} className="text-dark_" />
        </div>
      }
    >
      <div className="w-[90%] mx-auto">
        <img className="mt-1 w-full max-h-[500px]" src={src} alt="Uploaded Pic" />
        <div className="mt-5 w-full mb-5">
          <Button onClick={(e: any) => savePicture(e)} loader={buttonLoader} loaderMessage="Processing..." fill={true} className=" py-[12px] w-full">
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfilePic;
