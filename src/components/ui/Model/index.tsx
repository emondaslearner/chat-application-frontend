import React, { ReactNode, useEffect } from "react";
import {
  Modal as Modals,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

interface ModalProps {
  status: "custom";
  openButton?: ReactNode;
  title: string | ReactNode;
  children: ReactNode;
  position: "right" | "left" | "middle" | "top";
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  closeButton?: boolean;
  customCloseButton?: ReactNode;
  dismissable?: boolean;
  isOpenPopup?: (onOpen: any) => void;
}

const Modal: React.FC<ModalProps> = ({
  status,
  openButton,
  title,
  children,
  position,
  size = "md",
  closeButton,
  customCloseButton,
  dismissable,
  isOpenPopup,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if(isOpenPopup) {
      isOpenPopup(onOpen);
    }
  }, [isOpenPopup, onOpen]);

  return (
    <div className="w-full">
      <span onClick={onOpen}>{openButton}</span>
      <Modals
        size={size}
        closeButton={
          !closeButton ? <></> : customCloseButton && customCloseButton
        }
        className={``}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={dismissable === false ? false : true}
      >
        <ModalContent
          className={`${
            position === "right" && "absolute right-0 top-0 h-full !m-0"
          } ${position === "left" && "absolute left-0 top-0 h-full !m-0"} ${
            position === "top" &&
            "absolute left-[29%] top-[10%] !m-0 rounded-[10px]"
          } dark:bg-dark_bg_`}
        >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-black dark:text-white text-[20px]">
                {title}
              </ModalHeader>
              <ModalBody className="p-0 !gap-0">{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modals>
    </div>
  );
};

export default Modal;
