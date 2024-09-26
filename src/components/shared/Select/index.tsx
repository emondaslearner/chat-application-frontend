import React from 'react';


// ** import third party library 
import Select, { OptionProps, components } from 'react-select';



// interface

interface SelectProps {
  value?: { label: string; value: string };
  placeholder?: string;
  className?: string;
  options?: Array<{ label: string; value: string }>;
}


type ColourOption = {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
  readonly imgPath?: string;
};


function Selects(props: SelectProps) {
  const { value, placeholder, className, options } = props;

  const SelectComponent: any = (props: OptionProps<ColourOption>) => {
    return (
      <components.Option {...props}>
        {props.data.imgPath ? (
          <div className='flex items-center'>
            <img className='w-[30px] h-[30px] rounded-[50%] mr-2' src={props.data.imgPath} alt="" />
            <div className="d-flex flex-wrap align-items-center">
              {props.data.label}
            </div>
          </div>
        ) : (
          <div className="d-flex flex-wrap align-items-center">
            {props.data.label}
          </div>
        )}
      </components.Option>
    );
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        id="email-bcc"
        options={options}
        placeholder={placeholder}
        classNamePrefix="my-react-select"
        className={`my-react-select-container react-select ${className}`}
        components={{ Option: SelectComponent }}
        value={value}
        {...props}
      />
    </div>
  );
}

export default Selects;

