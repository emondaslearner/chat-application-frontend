import React, { useRef, useState } from "react";
import Modal from "../../ui/Model";
import { IoMdClose } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Input from "../Input";
import Button from "../Button";

interface SearchBarProps {
  setValue?: any;
}

const SearchBar: React.FC<SearchBarProps> = ({ setValue }) => {

  const [search, setSearch] = useState<string>("");

  // close model ref
  const closeModel: any = useRef();

  return (
    <Modal
      openButton={
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="cursor-pointer dark:text-dark_text_ text-[20px]"
        />
      }
      title={
        <p className="text-[25px] text-center font-semibold text-dark_ dark:text-white_ ">
          Search
        </p>
      }
      status="custom"
      position="top"
      size="2xl"
      closeButton={true}
      customCloseButton={
        <div ref={closeModel} className="p-[10px] !bg-dark_gray_ dark:bg-light_gray_">
          <IoMdClose size={30} className="text-dark_" />
        </div>
      }
      dismissable={false}
    >
      <div className="flex items-center w-[95%] mx-auto mb-[20px]">
        <Input
          type="text"
          className="rounded-[5px] !w-[80%] rounded-tr-none rounded-br-none py-[12px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className="w-[20%] rounded-[5px] rounded-tl-none rounded-bl-none py-[13px]"
          fill={true}
          onClick={() => {
            setValue(search)
            closeModel.current?.click();
          }}
        >
          {" "}
          Search
        </Button>
      </div>

      <div className="mb-[20px]">
        <p className="text-center text-[16px] font-semibold">There is not search result</p>
      </div>
    </Modal>
  );
};

export default SearchBar;
