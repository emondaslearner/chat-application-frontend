import React from "react";

// import third party components
import { Search } from "react-feather";
import Input from "../../shared/Input";
import Notification from "./Popups/Notification";
import { Location, useLocation } from "react-router-dom";

interface SideBarHeaderProps {
  setSearch: any;
  search: string;
}

const SideBarHeader: React.FC<SideBarHeaderProps> = ({ search, setSearch }) => {
  // location
  const location: Location = useLocation();

  return (
    <div className="border-b-[1px] border-light_border_ dark:border-dark_border_ pb-3">
      <div className="flex justify-between w-full px-4 pt-6 pb-3">
        <p className="text-[19px] font-semibold text-dark_ mt-[-5px] dark:text-white_">
          {location.pathname === '/chat' ? 'Chats' : 'Friends'}
        </p>
        <div className="flex">
          {/* Notification */}
          <Notification />

          {/* Dropdown */}
          {/* {
            location.pathname !== '/friends' &&
            <Dropdown items={items}>
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="text-[19px] text-dark_gray_ !cursor-pointer"
              />
            </Dropdown>
          } */}
        </div>
      </div>
      <div className="flex px-4 items-center justify-between sidebarHeader">
        <div className={`relative w-full`}>
          <Input
            type="text"
            className="w-full outline-none border-[1px] rounded-[5px] border-light_border_ py-[6px] px-2 dark:!bg-dark_bg_"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search
            size={18}
            className="text-dark_gray_ absolute right-[10px] top-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SideBarHeader;
