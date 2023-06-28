import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLatestEpisodes = createAsyncThunk(
  "fetch/latestEpisodes",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await axios.get(
        "https://api.consumet.org/anime/gogoanime/recent-episodes",
        { params: { page: 1, type: 1 } }
      );

      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

export const fetchTopAiring = createAsyncThunk(
  "fetch/topAiring",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await axios.get(
        "https://api.consumet.org/anime/gogoanime/top-airing",
        { params: { page: 1, type: 1 } }
      );

      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

export const fetchAnimeInfo = createAsyncThunk(
  "fetch/animeInfo",
  async (
    { episodeId, episodeNumber, image, id },
    { rejectWithValue, getState, dispatch }
  ) => {
    // console.log("Fetch anime info fired", id);
    try {
      const response = await axios.get(
        `https://api.consumet.org/anime/gogoanime/info/${id}`,
        { params: { page: 1, type: 1 } }
      );

      // console.log("Anime ID: ", id, response.data);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

export const fetchCurrentAnimeData = createAsyncThunk(
  "fetch/currentAnime",
  async (
    { episodeId, episodeNumber, image, id, server },
    { rejectWithValue, getState, dispatch }
  ) => {
    // console.log("Fetch anime info fired", id);
    try {
      const response1 = axios.get(
        //anime info
        `https://api.consumet.org/anime/gogoanime/info/${id}`,
        { params: { page: 1, type: 1 } }
      );

      const response2 = axios.get(
        `https://api.consumet.org/anime/gogoanime/watch/${episodeId}`
      ); //qulaities and video url

      const response = Promise.all(response1, response2);

      // console.log("Anime ID: ", id, response.data);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

export const fetchSearchAnime = createAsyncThunk(
  "fetch/searchAnime",
  async ({ query, pageNum }, { rejectWithValue, getState, dispatch }) => {
    console.log(
      `https://api.consumet.org/anime/gogoanime/${query}?page=${pageNum}`
    );

    console.log("Current Fetch Page: ", pageNum, query);

    dispatch(resetSearchData());
    try {
      const response = await axios.get(
        //anime info
        `https://api.consumet.org/anime/gogoanime/${query}?page=${pageNum}`
        // { params: { page: pageNum, type: 1 } }
      );

      console.log(response.data);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

const initialState = {
  latestEpisodes: { loading: false, data: null, error: null, data: {} },
  topAiring: { loading: false, error: null, data: {} },
  animeInfo: { loading: false, error: null, data: {} },
  searchData: { loading: false, error: null, data: {} },
  favourites: [],
  recentFive: [],
};

const animeSlice = createSlice({
  name: "Anime",
  initialState,
  reducers: {
    resetSearchData: (state, action) => {
      state.searchData.data = {};
    },
    toggleFavourite: (state, action) => {
      const isFav = state.favourites?.findIndex((anime) => {
        return anime.id === action.payload.id;
      });

      if (isFav === -1) {
        state.favourites.push(action.payload);
      } else {
        const newFavList = state.favourites.filter((fav) => {
          return fav.id !== action.payload.id;
        });
        state.favourites = newFavList;
      }
      console.log(state.favourites);
    },
    addToRecentFive: (state, action) => {
      // console.log(state);
      state.recentFive.push(action.payload);
      const index = state.recentFive?.findIndex(
        (show) => show.id === action.payload.id
      );
      if (index === -1) {
        state.recentFive?.unshift(action.payload);
      } else {
        state.recentFive = [
          action.payload,
          ...state.recentFive?.slice(0, index),
          ...state.recentFive?.slice(index + 1),
        ];
      }
      if (state.recentFive.length > 5) {
        state.recentFive = state.recentFive.slice(0, 5);
      }
      console.log(state.recentFive);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestEpisodes.pending, (state, action) => {
        state.latestEpisodes.loading = true;
      })
      .addCase(fetchLatestEpisodes.fulfilled, (state, action) => {
        state.latestEpisodes.loading = false;
        state.latestEpisodes.data = action.payload;
        state.latestEpisodes.error = null;
      })
      .addCase(fetchLatestEpisodes.rejected, (state, action) => {
        state.latestEpisodes.loading = false;
        state.latestEpisodes.data = null;
        state.latestEpisodes.error = action.payload;
      })
      .addCase(fetchTopAiring.pending, (state, action) => {
        state.topAiring.loading = true;
      })
      .addCase(fetchTopAiring.fulfilled, (state, action) => {
        state.topAiring.loading = false;
        state.topAiring.data = action.payload;
        state.topAiring.error = null;
      })
      .addCase(fetchTopAiring.rejected, (state, action) => {
        state.topAiring.loading = false;
        state.topAiring.data = null;
        state.topAiring.error = action.payload;
      })
      .addCase(fetchAnimeInfo.pending, (state, action) => {
        state.animeInfo.loading = true;
      })
      .addCase(fetchAnimeInfo.fulfilled, (state, action) => {
        state.animeInfo.loading = false;
        state.animeInfo.data = action.payload;
        state.animeInfo.error = null;
      })
      .addCase(fetchAnimeInfo.rejected, (state, action) => {
        state.animeInfo.loading = false;
        state.animeInfo.data = null;
        state.animeInfo.error = action.payload;
      })
      .addCase(fetchSearchAnime.pending, (state, action) => {
        state.searchData.loading = true;
      })
      .addCase(fetchSearchAnime.fulfilled, (state, action) => {
        state.searchData.loading = false;
        state.searchData.data = action.payload;
        state.searchData.error = null;
      })
      .addCase(fetchSearchAnime.rejected, (state, action) => {
        state.searchData.loading = false;
        state.searchData.data = null;
        state.searchData.error = action.payload;
      });
  },
});

export default animeSlice.reducer;
// export const {
//   setDetailsProp,
//   updateEpisodeNumber,
//   updateServer,
//   updateQuality,
// } = animeSlice.actions;
export const { resetSearchData, toggleFavourite, addToRecentFive } =
  animeSlice.actions;
