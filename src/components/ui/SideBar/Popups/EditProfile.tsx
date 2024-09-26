import Button from "@src/components/shared/Button";
import DatePicker from "@src/components/shared/DatePicker";
import Input from "@src/components/shared/Input";
import Modal from "@src/components/ui/Model";
import { RootState } from "@src/store/store";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

interface EditProfileProps {
  changeInformation: (info: {
    name: string;
    bio: string;
    dateOfBirth: Date;
    city: string;
    country: string;
  }) => void;
  saveProfileInformationToDb: (e: any) => void;
  buttonLoader: boolean;
}

interface InputEditStatus {
  name: boolean;
  dateOfBirth: boolean;
  city: boolean;
  bio: boolean;
  country: boolean;
}

interface InputStates {
  name: string;
  dateOfBirth: Date;
  city: string;
  bio: string;
  country: string;
}

const EditProfile: React.FC<EditProfileProps> = ({
  changeInformation,
  saveProfileInformationToDb,
  buttonLoader,
}) => {
  // profile data
  const profileData = useSelector((state: RootState) => state.auth);

  // input status
  const [inputsEditStatus, setInputEditStatus] = useState<InputEditStatus>({
    name: false,
    dateOfBirth: false,
    city: false,
    bio: false,
    country: false,
  });

  const profileDate = new Date(profileData.date_of_birth);

  // input values
  const [inputValue, setInputValue] = useState<InputStates>({
    name: profileData.name,
    dateOfBirth: profileDate,
    city: profileData.city,
    bio: profileData.bio,
    country: profileData.country,
  });

  const ChangeInputValue = (value: string, name: string) => {
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    changeInformation(inputValue);
  }, [inputValue]);

  return (
    <Modal
      openButton={
        <Button fill={false} className="!w-full">
          Edit profile
        </Button>
      }
      title={
        <p className="text-[25px] text-center font-semibold text-dark_ dark:text-white_ ">
          Edit Profile
        </p>
      }
      status="custom"
      position="middle"
      size="2xl"
      closeButton={true}
      customCloseButton={
        <div className="p-[10px] !bg-dark_gray_ dark:bg-light_gray_">
          <IoMdClose size={30} className="text-dark_" />
        </div>
      }
      dismissable={false}
    >
      <form
        onSubmit={(e: any) => saveProfileInformationToDb(e)}
        className="max-h-[80vh] p-5"
      >
        {/* Name  */}
        <div className="">
          <div className="flex items-center justify-between w-full">
            <p className="text-[20px] text-dark_ font-semibold dark:text-light_gray_">
              Name
            </p>
            {!inputsEditStatus?.name && (
              <p
                onClick={() => {
                  setInputEditStatus((prevEditStatus) => ({
                    ...prevEditStatus,
                    name: true,
                  }));
                }}
                className="text-primary_ cursor-pointer"
              >
                Edit
              </p>
            )}
          </div>
          {!inputsEditStatus?.name ? (
            <p className="text-[20px] text-dark_ dark:text-dark_text_ ml-2">
              {profileData.name}
            </p>
          ) : (
            <Input
              required
              type="text"
              placeholder="Enter Name"
              className="mt-1 !rounded-[5px]"
              value={inputValue?.name}
              onChange={(e: any) => {
                ChangeInputValue(e.target.value, "name");
              }}
            />
          )}
        </div>

        {/* Bio  */}
        <div className="">
          <div className="flex items-center justify-between w-full">
            <p className="text-[20px] text-dark_ font-semibold dark:text-light_gray_">
              Bio
            </p>
            {!inputsEditStatus?.bio && (
              <p
                onClick={() => {
                  setInputEditStatus((prevEditStatus) => ({
                    ...prevEditStatus,
                    bio: true,
                  }));
                }}
                className="text-primary_ cursor-pointer"
              >
                Edit
              </p>
            )}
          </div>
          {!inputsEditStatus?.bio ? (
            <p className="text-[20px] text-dark_ dark:text-dark_text_ ml-2">
              {profileData.bio}
            </p>
          ) : (
            <Input
              type="text"
              placeholder="Enter Bio"
              className="mt-1 !rounded-[5px]"
              value={inputValue?.bio}
              required
              onChange={(e: any) => {
                ChangeInputValue(e.target.value, "bio");
              }}
            />
          )}
        </div>

        {/* Date Of Birth  */}
        <div className="mt-2">
          <div className="flex items-center justify-between w-full">
            <p
              className={`text-[20px] text-dark_ font-semibold dark:text-light_gray_ ${
                inputsEditStatus?.dateOfBirth && "mb-1"
              }`}
            >
              Date Of Birth
            </p>
            {!inputsEditStatus?.dateOfBirth && (
              <p
                onClick={() => {
                  setInputEditStatus((prevEditStatus) => ({
                    ...prevEditStatus,
                    dateOfBirth: true,
                  }));
                }}
                className="text-primary_ cursor-pointer"
              >
                Edit
              </p>
            )}
          </div>
          {!inputsEditStatus?.dateOfBirth ? (
            <p className="text-[20px] text-dark_ dark:text-dark_text_ ml-2">
              {`${profileDate.getDay()}-${profileDate.getMonth()}-${profileDate.getFullYear()}`}
            </p>
          ) : (
            <DatePicker
              onChange={(e: any) => {
                ChangeInputValue(e?.$d, "dateOfBirth");
              }}
              value={new Date()}
            />
          )}
        </div>

        {/* City  */}
        <div className="mt-2">
          <div className="flex items-center justify-between w-full">
            <p
              className={`text-[20px] text-dark_ font-semibold dark:text-light_gray_`}
            >
              City
            </p>
            {!inputsEditStatus?.city && (
              <p
                onClick={() => {
                  setInputEditStatus((prevEditStatus) => ({
                    ...prevEditStatus,
                    city: true,
                  }));
                }}
                className="text-primary_ cursor-pointer"
              >
                Edit
              </p>
            )}
          </div>
          {!inputsEditStatus?.city ? (
            <p className="text-[20px] text-dark_ dark:text-dark_text_ ml-2">
              {profileData.city ? profileData.city : "Choose City"}
            </p>
          ) : (
            <Input
              required
              onChange={(e: any) => {
                ChangeInputValue(e.target.value, "city");
              }}
              value={inputValue?.city}
              placeholder="City"
              className="mt-1 !rounded-[5px]"
            />
          )}
        </div>

        {/* Country  */}
        <div className="">
          <div className="flex items-center justify-between w-full">
            <p className="text-[20px] text-dark_ font-semibold dark:text-light_gray_">
              Country
            </p>
            {!inputsEditStatus?.country && (
              <p
                onClick={() => {
                  setInputEditStatus((prevEditStatus) => ({
                    ...prevEditStatus,
                    country: true,
                  }));
                }}
                className="text-primary_ cursor-pointer"
              >
                Edit
              </p>
            )}
          </div>
          {!inputsEditStatus?.country ? (
            <p className="text-[20px] text-dark_ dark:text-dark_text_ ml-2">
              {profileData.country ? profileData.country : "Choose Country"}
            </p>
          ) : (
            <Input
              type="text"
              required
              placeholder="Enter Bio"
              className="mt-1 !rounded-[5px]"
              value={inputValue?.country}
              onChange={(e: any) => {
                ChangeInputValue(e.target.value, "country");
              }}
            />
          )}
        </div>
        <Button
          loader={buttonLoader}
          loaderMessage="Processing..."
          fill={true}
          className="mt-4 py-[12px] w-full"
        >
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default EditProfile;
