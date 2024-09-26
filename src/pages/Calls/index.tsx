import React from 'react';
import SideBar from '../../components/ui/SideBar';
import Content from './Content';


interface CallsProps {

}

const Calls: React.FC<CallsProps> = () => {

    // const chatOpenedOrNot = useSelector\((state:any) => state?.siteConfig?.chatOpened)
  
    return (
      <div className="w-full max-w-[2000px] mx-auto">
        <div className="ml-[70px] flex">
          <div className="w-[35%]">
            <SideBar />
          </div>
          <div className="w-[65%]">
            <Content />
          </div>
        </div>
      </div>
    );
};

export default Calls;