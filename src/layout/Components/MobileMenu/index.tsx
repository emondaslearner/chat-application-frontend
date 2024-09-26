import React, { ReactNode, useEffect, useState } from "react";
import {
  Dropdown as DropDowns,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FaBars } from "react-icons/fa6";
import { CiHome } from "react-icons/ci";
import { RiChatSmileLine } from "react-icons/ri";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineContacts } from "react-icons/md";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";

// images
import logo from "../../../assets/logo/logo.svg";

interface MobileMenuProps {}

interface Items {
  key: string;
  label: string | ReactNode;
  onClick?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  const items: Items[] = [
    {
      key: "Home",
      label: (
        <div className="flex items-center gap-x-[10px] pl-[10px] w-full bg-white hover:bg-light_gray_ rounded-[30px] dark:bg-transparent hover:dark:bg-dark_light_bg_ transition-all duration-300 py-[10px]">
          <CiHome size={25} className="dark:text-white" />
          <p className="font-semibold text-[16px] dark:text-light_gray_">
            Home
          </p>
        </div>
      ),
      onClick: () => {
        navigate("/");
      },
    },
    {
      key: "Chats",
      label: (
        <div className="flex items-center gap-x-[10px] pl-[10px] w-full bg-white hover:bg-light_gray_ rounded-[30px] dark:bg-transparent hover:dark:bg-dark_light_bg_ transition-all duration-300 py-[10px]">
          <RiChatSmileLine size={25} className="dark:text-white" />
          <p className="font-semibold text-[16px] dark:text-light_gray_">
            Chats
          </p>
        </div>
      ),
      onClick: () => {
        navigate("/chat");
      },
    },
    {
      key: "Friends",
      label: (
        <div className="flex items-center gap-x-[10px] pl-[10px] w-full bg-white hover:bg-light_gray_ rounded-[30px] dark:bg-transparent hover:dark:bg-dark_light_bg_ transition-all duration-300 py-[10px]">
          <FaUserFriends size={25} className="dark:text-white" />
          <p className="font-semibold text-[16px] dark:text-light_gray_">
            Friends
          </p>
        </div>
      ),
      onClick: () => {
        navigate("/friends");
      },
    },
    {
      key: "Friend Request",
      label: (
        <div className="flex items-center gap-x-[10px] pl-[10px] w-full bg-white hover:bg-light_gray_ rounded-[30px] dark:bg-transparent hover:dark:bg-dark_light_bg_ transition-all duration-300 py-[10px]">
          <FaUser size={25} className="dark:text-white" />
          <p className="font-semibold text-[16px] dark:text-light_gray_">
            Friend Requests
          </p>
        </div>
      ),
      onClick: () => {
        navigate("/friends");
      },
    },
    {
      key: "Profile",
      label: (
        <div className="flex items-center gap-x-[10px] pl-[10px] w-full bg-white hover:bg-light_gray_ rounded-[30px] dark:bg-transparent hover:dark:bg-dark_light_bg_ transition-all duration-300 py-[10px]">
          <CgProfile size={25} className="dark:text-white" />
          <p className="font-semibold text-[16px] dark:text-light_gray_">
            Profile
          </p>
        </div>
      ),
      onClick: () => {
        navigate("/profile");
      },
    },
  ];

  // screen size
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);

  useEffect(() => {
    const isExist = items.find((data) => data.key === "Suggestions & Contacts");

    if (!isExist && screenSize > 550) {
      items.push({
        key: "Suggestions & Contacts",
        label: (
          <div className="flex items-center gap-x-[10px] pl-[10px] w-full bg-white hover:bg-light_gray_ rounded-[30px] dark:bg-transparent hover:dark:bg-dark_light_bg_ transition-all duration-300 py-[10px]">
            <MdOutlineContacts size={25} className="dark:text-white" />
            <p className="md:hidden block font-semibold text-[16px] dark:text-light_gray_">
              Suggestions & Contacts
            </p>
            <p className="md:block hidden font-semibold text-[16px] dark:text-light_gray_">
              Contacts
            </p>
          </div>
        ),
        onClick: () => {
          navigate("/?suggestionAndContact");
        },
      });
    }

    if (screenSize <= 550 && screenSize !== 0) {
      const isExist = items.find((data) => data.key === "Suggestions");

      if (!isExist) {
        items.push({
          key: "Contacts",
          label: (
            <div className="flex items-center gap-x-[10px] pl-[10px] w-full bg-white hover:bg-light_gray_ rounded-[30px] dark:bg-transparent hover:dark:bg-dark_light_bg_ transition-all duration-300 py-[10px]">
              <MdOutlineContacts size={25} className="dark:text-white" />
              <p className="font-semibold text-[16px] dark:text-light_gray_">
                Contacts
              </p>
            </div>
          ),
          onClick: () => {
            navigate("/?Contact");
          },
        });

        items.push({
          key: "Suggestions",
          label: (
            <div className="flex items-center gap-x-[10px] pl-[10px] w-full bg-white hover:bg-light_gray_ rounded-[30px] dark:bg-transparent hover:dark:bg-dark_light_bg_ transition-all duration-300 py-[10px]">
              <MdOutlineContacts size={25} className="dark:text-white" />
              <p className="font-semibold text-[16px] dark:text-light_gray_">
                Suggestions
              </p>
            </div>
          ),
          onClick: () => {
            navigate("/?Suggestions");
          },
        });
      }
    }
  }, [location, screenSize]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex lg:hidden items-center justify-between w-[95%] mx-auto pt-[10px]">
      <div
        onClick={() => navigate("/")}
        className="p-[5px] bg-white_ w-[45px] h-[40px] rounded-[5px] flex justify-center items-center"
      >
        <img src={logo} className="w-[60px]" alt="" />
      </div>
      <div className=" !w-[50px] !h-[50px] border-[2px] border-light_border_ dark:border-dark_border_ hover:bg-primary_ hover:text-white_ duration-300 transition-all rounded-[7px] max-w-[300px]">
        <DropDowns size="sm">
          <DropdownTrigger>
            <div className=" rounded-[10px] flex justify-center items-center w-full h-full">
              <FaBars size={30} className="dark:text-white_" />
            </div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Dynamic Actions"
            className="flex flex-col gap-y-[5px] w-[280px]"
            items={items}
          >
            {(item: Items) => (
              <DropdownItem
                key={item.key}
                color={"default"}
                className={`!hover:bg-transparent !p-0 !w-auto !rounded-full`}
                onClick={item?.onClick}
                textValue={item.key}
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </DropDowns>
      </div>
    </div>
  );
};

export default MobileMenu;
