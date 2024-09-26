import axios from "@src/axios";

interface getPostsStates {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortType: string;
  id?: string;
}

const getPostsAPI = ({
  page,
  limit,
  search,
  sortBy,
  sortType,
  id,
}: getPostsStates) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        id
          ? `/user/posts?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortType=${sortType}&id=${id}`
          : `/user/posts?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortType=${sortType}`
      )
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface getUserFeedsAPIStates {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortType: string;
}

const getUserFeedsAPI = ({
  page,
  limit,
  search,
  sortBy,
  sortType
}: getUserFeedsAPIStates) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `/user/feeds?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortType=${sortType}`
      )
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface addReactionToPostAPIStates {
  reaction: string;
  postId?: string;
}

const addReactionToPostAPI = ({
  reaction,
  postId,
}: addReactionToPostAPIStates) => {
  return new Promise((resolve, reject) => {
    postId
      ? axios
        .post(`/user/post/${postId}/reaction`, {
          reaction,
        })
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error);
        })
      : reject();
  });
};

interface addPostAPIStates {
  color?: string;
  files?: object[];
  text?: string;
}

const addPostAPI = ({ color, files, text }: addPostAPIStates) => {
  return new Promise((resolve, reject) => {
    const formData: any = new FormData();
    formData.append("title", text);
    formData.append("color", color);

    if (files?.length) {
      files.forEach((file) => {
        formData.append("photo", file);
      });
    }

    axios
      .post("/user/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface deletePostAPIStates {
  postId: string;
}

const deletePostAPI = ({ postId }: deletePostAPIStates) => {
  new Promise((resolve, reject) => {
    axios
      .delete(`/user/post/${postId}`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface getSinglePostAPIStates {
  postId: string;
}

const getSinglePostAPI = ({ postId }: getSinglePostAPIStates) => {
  new Promise((resolve, reject) => {
    axios
      .get(`/user/post/${postId}`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface editPostAPIStates {
  postId?: string;
  files?: any;
  existingFilesIds?: string[];
  text: string;
  color?: string;
}

const editPostAPI = ({ postId, files, existingFilesIds, text, color }: editPostAPIStates) => {
  new Promise((resolve, reject) => {
    const formData: any = new FormData();
    formData.append("title", text);
    formData.append("color", color);
    formData.append("existingFilesIds", JSON.stringify(existingFilesIds));

    if (files?.length) {
      files.forEach((file: any) => {
        formData.append("photo", file);
      });
    }

    postId ? axios
      .patch(`/user/post/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      }) : reject()
  });
};

export {
  getPostsAPI,
  addReactionToPostAPI,
  addPostAPI,
  deletePostAPI,
  getSinglePostAPI,
  editPostAPI,
  getUserFeedsAPI
};
