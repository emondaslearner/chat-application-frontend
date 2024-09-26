import axios from "@src/axios"

interface getPostCommentProps {
    postId?: string
}

const getPostComment = ({ postId }: getPostCommentProps) => {
    return new Promise((resolve, reject) => {
        postId ? axios.get(`/user/post/${postId}/comments?sortBy=createdAt&limit=1000`)
            .then((response) => {
                resolve(response?.data);
            })
            .catch((error) => {
                reject(error);
            }) : reject()
    })
}

interface addReactionToCommentAPIStates {
    reaction: string;
    commentId?: string;
}

const addReactionToCommentAPI = ({
    reaction,
    commentId,
}: addReactionToCommentAPIStates) => {
    return new Promise((resolve, reject) => {
        commentId
            ? axios
                .post(`/user/comment/${commentId}/reaction`, {
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

interface addCommentAPIProps {
    message: string;
    parent?: string;
    path?: string;
    postId?: string
}

const addCommentAPI = ({ message, parent, path, postId }: addCommentAPIProps) => {
    return new Promise((resolve, reject) => {
        postId ? axios.post('/user/comments', {
            postId,
            message,
            path,
            parent
        })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((error) => {
                reject(error);
            }) : reject();
    })
}


export { getPostComment, addReactionToCommentAPI, addCommentAPI }