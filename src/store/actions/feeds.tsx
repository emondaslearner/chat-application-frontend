import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateDataTypes {
    feeds: any;
}

const initialState: initialStateDataTypes = {
    feeds: [],
};

const feeds = createSlice({
    name: "feeds",
    initialState,
    reducers: {
        setFeeds: (state, actions) => {
            state.feeds = actions.payload;
        },
        addFeedToState: (state, action) => {
            if (action.payload?._id !== state.feeds?.[0]?._id) {
                state.feeds = [action.payload, ...state.feeds];
            }
        },
        increaseFeedsReactionCount: (state, action: PayloadAction<string>) => {
            const index = state.feeds.findIndex(
                (obj: any) => obj._id === action.payload
            );
            state.feeds[index].reactionCount += 1;
        },
        decreaseFeedsReactionCount: (state, action: PayloadAction<string>) => {
            const index = state.feeds.findIndex(
                (obj: any) => obj._id === action.payload
            );
            state.feeds[index].reactionCount -= 1;
        },
        setFeedGivenReaction: (
            state,
            action: PayloadAction<{ index: number, reaction: string, userId: string }>
        ) => {
            const reactionIndex = state.feeds[action.payload.index].reactions.findIndex((data: any) => data.given_by === action.payload.userId);
      
            if (reactionIndex !== -1) {
              if (!action.payload.reaction) {
                state.feeds[action.payload.index].reactions.splice(reactionIndex, 1);
              } else {
                state.feeds[action.payload.index].reactions[reactionIndex] = {
                  reaction: action.payload.reaction,
                  given_by: action.payload.userId
                }
              }
            } else {
              console.log('reactionIndex', reactionIndex)
              state.feeds[action.payload.index].reactions = [...state.feeds[action.payload.index].reactions, {
                reaction: action.payload.reaction,
                given_by: action.payload.userId
              }];
            }
        },
        setFeedCommentCount: (
            state,
            action: PayloadAction<{ index: number; commentCount: number }>
        ) => {
            state.feeds[action.payload.index] = {
                ...state.feeds[action.payload.index],
                commentCount:
                    action.payload.commentCount ||
                    state.feeds[action.payload.index].commentCount + 1,
            };
        },
        setFeedComments: (
            state,
            action: PayloadAction<{ index: number; comments: object[] }>
        ) => {
            state.feeds[action.payload.index] = {
                ...state.feeds[action.payload.index],
                comments: action.payload.comments,
            };
        },
        addFeedComments: (
            state,
            action: PayloadAction<{ index: number; comment: object }>
        ) => {
            if (state.feeds[action.payload.index].comments?.length) {
                state.feeds[action.payload.index] = {
                    ...state.feeds[action.payload.index],
                    comments: [
                        action.payload.comment,
                        ...state.feeds[action.payload.index].comments,
                    ],
                };
            } else {
                state.feeds[action.payload.index] = {
                    ...state.feeds[action.payload.index],
                    comments: [action.payload.comment],
                };
            }
        },
        setFeedReplies: (
            state,
            action: PayloadAction<{ index: number; replies: object[] }>
        ) => {
            state.feeds[action.payload.index] = {
                ...state.feeds[action.payload.index],
                replies: action.payload.replies,
            };
        },
        deleteFeedFromStore: (state, action: PayloadAction<number>) => {
            const list = [...state.feeds];
            list.splice(action.payload, 1);

            state.feeds = list;
        },
        updateFeedInStore: (state, action: PayloadAction<{ postId: string, data: any }>) => {
            const index = state.feeds.findIndex(
                (obj: any) => obj._id === action.payload.postId
            );

            state.feeds[index] = action.payload.data
        }
    },
});

export const {
    setFeeds,
    addFeedToState,
    increaseFeedsReactionCount,
    decreaseFeedsReactionCount,
    setFeedGivenReaction,
    setFeedCommentCount,
    setFeedComments,
    addFeedComments,
    setFeedReplies,
    deleteFeedFromStore,
    updateFeedInStore
} = feeds.actions;

export default feeds.reducer;
