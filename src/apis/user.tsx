import axios from "@src/axios";

interface getUserDataProps {
  userId?: string;
}

const getUserData = async ({ userId }: getUserDataProps) => {
  return new Promise((resolve, reject) => {
    axios
      .get(userId ? `/user?userId=${userId}` : `/user`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface UserData {
  dateOfBirth?: Date | null;
  name?: string;
  email?: string;
  bio?: string;
  status?: string;
  locked?: boolean;
  profile_picture?: File | null;
  cover_picture?: File | null;
  city?: string;
  country?: string;
}

const updateUserData = async (data: UserData): Promise<void> => {
  const formData = new FormData();

  if (data.dateOfBirth)
    formData.append("date_of_birth", data.dateOfBirth.toISOString());
  if (data.name) formData.append("name", data.name);
  if (data.email) formData.append("email", data.email);
  if (data.bio) formData.append("bio", data.bio);
  if (data.status) formData.append("status", data.status);
  if (data.locked === false || data.locked === true)
    formData.append("locked", data.locked.toString());
  if (data.profile_picture)
    formData.append("profile_picture", data.profile_picture);
  if (data.cover_picture) formData.append("cover_picture", data.cover_picture);
  if (data.city) formData.append("city", data.city);
  if (data.country) formData.append("country", data.country);

  return new Promise((resolve, reject) => {
    axios
      .patch("/user", formData)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface getUserAPIStates {
  sortType: string;
  sortBy: string;
  limit: number;
  page: number;
  search: string;
  type: string;
}

const getAllUserAPI = ({ sortType, sortBy, limit, page, search, type }: getUserAPIStates) => {
  return new Promise((resolve, reject) => {
    axios.get(`/users?page=${page}&limit=${limit}&sortBy=${sortBy}&sortType=${sortType}&search=${search}&type=${type}`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

interface getOnlineUsersAPIDataType {
  page: number;
  limit: number;
  sortBy: string;
  sortType: string;
}

const getOnlineUsersAPI = ({ page, limit, sortBy, sortType }: getOnlineUsersAPIDataType) => {
  return new Promise((resolve, reject) => {
    axios.get(`/users/online?page=${page}&limit=${limit}&sortBy=${sortBy}&sortType=${sortType}`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

export { getUserData, updateUserData, getAllUserAPI, getOnlineUsersAPI };
