// src/reducers/postsReducer.js

export const postActions = {
  SUBMIT_POST: "SUBMIT_POST",
  HANDLE_ERROR: "HANDLE_ERROR",
  ADD_LIKE_TO_POST: "ADD_LIKE_TO_POST",
};

export const postsStates = {
  error: false,
  posts: [],
};

export const PostsReducer = (state, action) => {
  switch (action.type) {
    case postActions.SUBMIT_POST:
      return {
        ...state,
        error: false,
        posts: action.posts,
      };

    case postActions.ADD_LIKE_TO_POST:
      return {
        ...state,
        error: false,
        posts: state.posts.map((post) =>
          post.id === action.postId
            ? { ...post, likes: (post.likes || 0) + 1 }
            : post
        ),
      };

    case postActions.HANDLE_ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
