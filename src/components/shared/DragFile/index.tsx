import React, { ReactNode, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

interface DargFileProps {
  name: string;
  children: ReactNode;
  multiple: boolean;
  fileTypes?: any;
  onChange: (file: any) => void;
}

const DragFile: React.FC<DargFileProps> = ({ name, children, multiple, fileTypes, onChange }) => {
  return (
    <FileUploader
      multiple={multiple}
      handleChange={onChange}
      name={name}
      types={fileTypes}
      classes={"!w-full"}
      children={
        children
      }
    />
  );
};

export default DragFile;
