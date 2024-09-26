import { getUserData } from "@src/apis/user";
import { setUserData } from "@src/store/actions/auth";
import { changeLoaderValue } from "@src/store/actions/siteConfig";
import { AppDispatch } from "@src/store/store";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getUserData({}),
    queryKey: ["userData"],
    retry: 0,
  });

  useEffect(() => {
    dispatch(changeLoaderValue(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(changeLoaderValue(false));
      navigate("/login");
      localStorage.removeItem("token");
    }
  }, [isError, dispatch, navigate]);

  const userData: any = data;

  if (userData?.code === 200) {
    dispatch(setUserData({ ...userData?.data, id: userData?.data._id }));

    return true;
  }

  return false;
};

export default useAuth;
