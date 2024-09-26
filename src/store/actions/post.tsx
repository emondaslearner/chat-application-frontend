import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateDataTypes {
  posts: any;
}

const initialState: initialStateDataTypes = {
  posts: [],
};

const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, actions) => {
      state.posts = actions.payload;
    },
    addPostToState: (state, action) => {
      if (action.payload?._id !== state.posts?.[0]?._id) {
        state.posts = [action.payload, ...state.posts];
      }
    },
    increaseReactionCount: (state, action: PayloadAction<string>) => {
      const index = state.posts.findIndex(
        (obj: any) => obj._id === action.payload
      );
      state.posts[index].reactionCount += 1;
    },
    decreaseReactionCount: (state, action: PayloadAction<string>) => {
      const index = state.posts.findIndex(
        (obj: any) => obj._id === action.payload
      );
      state.posts[index].reactionCount -= 1;
    },
    setGivenReaction: (
      state,
      action: PayloadAction<{ index: number, reaction: string, userId: string }>
    ) => {
      const reactionIndex = state.posts[action.payload.index].reactions.findIndex((data: any) => data.given_by === action.payload.userId);

      if (reactionIndex !== -1) {
        if (!action.payload.reaction) {
          state.posts[action.payload.index].reactions.splice(reactionIndex, 1);
        } else {
          state.posts[action.payload.index].reactions[reactionIndex] = {
            reaction: action.payload.reaction,
            given_by: action.payload.userId
          }
        }
      } else {
        console.log('reactionIndex', reactionIndex)
        state.posts[action.payload.index].reactions = [...state.posts[action.payload.index].reactions, {
          reaction: action.payload.reaction,
          given_by: action.payload.userId
        }];
      }

    },
    setCommentCount: (
      state,
      action: PayloadAction<{ index: number; commentCount: number }>
    ) => {
      state.posts[action.payload.index] = {
        ...state.posts[action.payload.index],
        commentCount:
          action.payload.commentCount ||
          state.posts[action.payload.index].commentCount + 1,
      };
    },
    setComments: (
      state,
      action: PayloadAction<{ index: number; comments: object[] }>
    ) => {
      state.posts[action.payload.index] = {
        ...state.posts[action.payload.index],
        comments: action.payload.comments,
      };
    },
    addComments: (
      state,
      action: PayloadAction<{ index: number; comment: object }>
    ) => {
      if (state.posts[action.payload.index].comments?.length) {
        state.posts[action.payload.index] = {
          ...state.posts[action.payload.index],
          comments: [
            action.payload.comment,
            ...state.posts[action.payload.index].comments,
          ],
        };
      } else {
        state.posts[action.payload.index] = {
          ...state.posts[action.payload.index],
          comments: [action.payload.comment],
        };
      }
    },
    setReplies: (
      state,
      action: PayloadAction<{ index: number; replies: object[] }>
    ) => {
      state.posts[action.payload.index] = {
        ...state.posts[action.payload.index],
        replies: action.payload.replies,
      };
    },
    deletePostFromStore: (state, action: PayloadAction<number>) => {
      const list = [...state.posts];
      list.splice(action.payload, 1);

      state.posts = list;
    },
    updatePostInStore: (state, action: PayloadAction<{ postId: string, data: any }>) => {
      const index = state.posts.findIndex(
        (obj: any) => obj._id === action.payload.postId
      );

      state.posts[index] = action.payload.data
    }
  },
});

export const {
  setPosts,
  addPostToState,
  increaseReactionCount,
  decreaseReactionCount,
  setGivenReaction,
  setCommentCount,
  setComments,
  addComments,
  setReplies,
  deletePostFromStore,
  updatePostInStore
} = posts.actions;

export default posts.reducer;
