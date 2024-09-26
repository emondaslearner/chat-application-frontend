import React from "react";
import { Avatar } from "@nextui-org/react";
interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | undefined;
  className?: string;
  status?: string | undefined;
  timeago?: Date;
}

const sizeMap: Record<string, string> = {
  md: "10",
  sm: "8",
  lg: "14",
};

const AvatarSingle: React.FC<AvatarProps> = ({
  src,
  alt,
  size,
  className,
  status,
  timeago
}) => {



  return (
    <div className={` ${status && `relative w-${sizeMap[size || "10"]}`}`}>
      <Avatar
        src={src}
        alt={alt}
        size={size}
        className={`${className} border-[1px] border-light_border_`}
      />

      {status === "online" && (
        <div className="w-[10px] h-[10px] rounded-[100%] bg-[green] absolute right-0 top-0"></div>
      )}
      {status === "offline" && (
        <div className="w-[10px] h-[10px] rounded-[100%] bg-white_ absolute right-0 top-0"></div>
      )}
    </div>
  );
};

AvatarSingle.defaultProps = {
  size: "md",
};

export default AvatarSingle;
