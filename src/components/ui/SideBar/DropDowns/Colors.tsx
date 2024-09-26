import React, { ReactNode } from "react";
import {
  Dropdown as DropDowns,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

interface ColorsProps {
  setUploadStatus: any;
  setColor: any;
  fileLength: number;
}

interface Items {
  key: string;
  label: string | ReactNode;
}

const items: Items[] = [
  {
    key: "white",
    label: (
      <div className="p-[20px] rounded-full cursor-pointer table mx-auto bg-white_ border-[1px] border-light_border_ dark:border-dark_border_"></div>
    ),
  },
  {
    key: "#C600FF",
    label: (
      <div className="p-[20px] rounded-full cursor-pointer table mx-auto bg-[#C600FF]"></div>
    ),
  },
  {
    key: "#E2013B",
    label: (
      <div className="p-[20px] rounded-full cursor-pointer table mx-auto bg-[#E2013B]"></div>
    ),
  },
  {
    key: "#111111",
    label: (
      <div className="p-[20px] rounded-full cursor-pointer table mx-auto bg-[#111111]"></div>
    ),
  },
  {
    key: "linear-gradient(45deg, rgb(255, 0, 71), rgb(44, 52, 199))",
    label: (
      <div
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgb(255, 0, 71), rgb(44, 52, 199))",
        }}
        className="p-[20px] rounded-full cursor-pointer table mx-auto"
      ></div>
    ),
  },
  {
    key: "linear-gradient(45deg, rgb(93, 63, 218), rgb(252, 54, 253))",
    label: (
      <div
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgb(93, 63, 218), rgb(252, 54, 253))",
        }}
        className="p-[20px] rounded-full cursor-pointer table mx-auto"
      ></div>
    ),
  }
];

const Colors: React.FC<ColorsProps> = ({
  setUploadStatus,
  setColor,
  fileLength,
}) => {
  return (
    <>
      {fileLength === 0 ? (
        <DropDowns size="sm">
          <DropdownTrigger>
            <div
              title="Background"
              className="p-[20px] rounded-full cursor-pointer table mx-auto bg-green-500"
            ></div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Dynamic Actions"
            className="colorDropdown"
            items={items}
          >
            {(item: Items) => (
              <DropdownItem
                key={item.key}
                color={item.key === "delete" ? "danger" : "default"}
                className={`!hover:bg-transparent !p-0 !w-auto !rounded-full`}
                onClick={() => {
                  setUploadStatus("background");
                  setColor(item.key);
                }}
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </DropDowns>
      ) : (
        <div
          title="Background"
          className="p-[20px] rounded-full table mx-auto bg-green-300"
        ></div>
      )}
    </>
  );
};

export default Colors;
