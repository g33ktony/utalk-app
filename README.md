# UTalk 

Welcome to UTalk, your go-to social media application built with React Native! UTalk allows you to connect, share updates, and stay in the loop with the latest happenings.

## Features

- **User Authentication:** Securely log in or sign up to create your UTalk account.
- **Home Feed:** View posts and updates from your friends and the community.
- **Create Posts:** Share your thoughts, images, and videos with the world.
- **Like and Comment:** Engage with posts by liking and leaving comments.

## Installation

Follow these steps to get UTalk up and running on your local machine:

1. Clone the repository to your computer:

   ```bash
   git clone https://github.com/hariinfo/utalk

2. Navigate to the project directory:

   ```bash
   cd utalk

3. Start the development server:

    ```bash
    npm install

4. Start Metro Bundler

   ``` bash 
   npm start

5. Run the application in an Android or iOS device typing "a" or "i"



# Here are some prompts used to generate code for this application

1. To generate code base and install dependencies the project needs

   ``` text
   Generate code for an small App is going to be developed with react-native. This application will be using typescript, redux/toolkit, Apollo client to query data from an external spring boot application so I will also need to create a mock server inside my react native application to test the app without the backend ready.

   The application will only have (for now) A mock Login screen that will (for now) only be navigating to main screen through  a button with label login. then the main screen will hold posts like in a social network with the possibility to see a title, avatar from the author, text description for the post, an image or video and comments and likes of the posts. If I'm the author of the post I will be able to edit the post via a form (like the one I need to create a new post but with the actual info prefilled) and update the post with a submit button. Also I will need to have a button in the Main screen header to toggle a textfield to search posts via a hashtag or a keyword. I will need to cache data of the posts inside the app to optimize loading performance. please consider the usage of redux/toolkit, redux thunks, Apollo client

   ```

2. To fetch posts through GraphQL queries

   ```text
   Generate code to query posts in the application using GraphQL
   ```

   Example of response:

   ```text 
   To fetch all posts using Apollo Client in your React Native app, you'll need to define a GraphQL query to retrieve the posts from your GraphQL server. Here's how you can do it:

   Step 1: Define the GraphQL Query

   Create a GraphQL query to fetch all posts. You can do this by creating a .graphql or .gql file containing your query. For example, create a file named getAllPosts.graphql:
   ```

   ```graphql
   graphql
   Copy code
   # src/graphql/queries/getAllPosts.graphql
   query GetAllPosts {
      getAllPosts {
         id
         title
         author
         description
         image
         comments
         likes
      }
   }
   ```

3. For redux store configuration

   ```text
   Generate specific code for redux configuration taking into consideration all data is being handled in the application, posts, likes, comments, auth, user, deviceInfo
   ```

   ```javascript
   /// Example of code generated
   // src/features/posts/postsSlice.ts
   import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
   import { RootState } from '../../app/store';
   import { GetAllPostsQuery, GetAllPostsQueryVariables } from '../../graphql/generated';
   import client from '../../graphql/apollo';

   // Define an initial state
   interface PostsState {
   posts: GetAllPostsQuery['getAllPosts'] | null;
   status: 'idle' | 'loading' | 'succeeded' | 'failed';
   error: string | null;
   }

   const initialState: PostsState = {
   posts: null,
   status: 'idle',
   error: null,
   };

   // Define an async thunk to fetch all posts
   export const fetchAllPosts = createAsyncThunk(
   'posts/fetchAllPosts',
   async () => {
      const response = await client.query<GetAllPostsQuery, GetAllPostsQueryVariables>({
         query: GET_ALL_POSTS,
      });
      return response.data.getAllPosts;
   }
   );

   const postsSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchAllPosts.pending, (state) => {
         state.status = 'loading';
         })
         .addCase(fetchAllPosts.fulfilled, (state, action) => {
         state.status = 'succeeded';
         state.posts = action.payload;
         })
         .addCase(fetchAllPosts.rejected, (state, action) => {
         state.status = 'failed';
         state.error = action.error.message || 'An error occurred.';
         });
   },
   });

   // Export the async thunk for use in components
   export { fetchAllPosts };

   // Export the posts reducer
   export default postsSlice.reducer;

   // Define the GraphQL query (assumes you've already defined it as shown in the previous answer)
   import GET_ALL_POSTS from '../../graphql/queries/getAllPosts.graphql';

   ```

4. To implement persistance in redux

   ```text
   Generate implementation for AsyncStorage persistance in the device
   ```

   ```javascript
   /// Example of code generated
   // src/app/store.ts
   import { configureStore } from '@reduxjs/toolkit';
   import { persistStore, persistReducer } from 'redux-persist';
   import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage for React Native
   import rootReducer from './rootReducer'; // Import your root reducer

   // Redux Persist configuration
   const persistConfig = {
   key: 'root', // Key for the storage
   storage: AsyncStorage, // Storage engine (use AsyncStorage for React Native)
   };

   // Create a persisted reducer
   const persistedReducer = persistReducer(persistConfig, rootReducer);

   // Create the Redux store with the persisted reducer
   const store = configureStore({
   reducer: persistedReducer,
   });

   // Create a persisted store
   const persistor = persistStore(store);

   export { store, persistor };

   ```