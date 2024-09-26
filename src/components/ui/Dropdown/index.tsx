import React, { ReactNode } from "react";
import {
  Dropdown as DropDowns,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import PropTypes from 'prop-types';

interface Items {
  key: string;
  label: string | ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}
interface DropdownProps {
  children: ReactNode;
  items: Items[];
  size?: "sm" | "md" | "lg";
  isOpen?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ children, items, size, isOpen }) => {
  return (
    <div className="relative">
      <DropDowns isOpen={isOpen || undefined} size={size}>
        <DropdownTrigger>{children}</DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={items}>
          {(item: Items) => (
            <DropdownItem
              key={item.key}
              color={item.key === "delete" ? "danger" : "default"}
              className={`${item.key === "delete"
                ? "text-danger"
                : "!text-dark_ dark:!text-dark_text_ hover:!text-white_  dark:hover:!text-white_ transition-all duration-300 hover:!bg-primary_"
                }`}
              startContent={item?.icon}
              onClick={item?.onClick}
              onMouseOver={item?.onMouseOver}
              onMouseOut={item?.onMouseOut}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </DropDowns>
    </div>
  );
};

Dropdown.defaultProps = {
  size: 'sm'
};

Dropdown.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  children: PropTypes.element,
  items: PropTypes.any
};

export default Dropdown;
