import Spinner from "@src/components/shared/Spinner";
import { RootState } from "@src/store/store";
import React, { ReactNode, Suspense } from "react";
import { useSelector } from "react-redux";

interface SpinnerLayoutProps {
  children: ReactNode;
}

const SpinnerLayout: React.FC<SpinnerLayoutProps> = ({ children }) => {
  // loader status
  const loader = useSelector((state: RootState) => state.siteConfig.loader);

  console.log('loader status', loader);

  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <Suspense fallback={<Spinner />}>{children}</Suspense>
      )}
    </>
  );
};

export default SpinnerLayout;
