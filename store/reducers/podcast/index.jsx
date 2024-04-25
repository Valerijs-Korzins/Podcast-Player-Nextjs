import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  episode: [],
  radioid: 1,
  sliderid: 0,
  radiotitle: [],
  gradiotitle: [],
  playradioid: 1,
  currentstreamurl: [],
  streamurl: [],
  currentvolume: 100,
  podcastplaydata: [],
  radioPlay: false,
  metatitle: [],
  playradiometada: [],
  metadescription: [],
  metaimg: [],
  radiometadata: [],
};

// Slice
const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {
    setEpisode: (state, { payload }) => {
      state.episode = payload;
    },
    setCurrentradioid: (state, { payload }) => {
      state.radioid = payload;
    },
    setCurrentsliderid: (state, { payload }) => {
      state.sliderid = payload;
    },
    setRadioPlay: (state, { payload }) => {
      state.radioPlay = payload;
    },
    setCurrentradiotitle: (state, { payload }) => {
      state.radiotitle = payload;
    },
    setgCurrentradiotitle: (state, { payload }) => {
      state.gradiotitle = payload;
    },
    setPlayradioid: (state, { payload }) => {
      state.playradioid = payload;
    },
    setCurrentvolume: (state, { payload }) => {
      state.currentvolume = payload;
    },
    setPodcastMedia: (state, { payload }) => {
      state.podcastplaydata = payload;
    },
    setPlayradiometadata: (state, { payload }) => {
      state.playradiometada = payload;
    },
    setCurrentstreamurl: (state, { payload }) => {
      state.currentstreamurl = payload;
    },
    setStreamurl: (state, { payload }) => {
      state.streamurl = payload;
    },
    setMetatitle: (state, { payload }) => {
      state.metatitle = payload;
    },
    setMetadescription: (state, { payload }) => {
      state.metadescription = payload;
    },
    setMetaimg: (state, { payload }) => {
      state.metaimg = payload;
    },
    setRadiomatadata: (state, { payload }) => {
      state.radiometadata = payload;
    },
  },
});

// Reducers
export default podcastSlice.reducer;

// Selectors
export const podcastSelector = (state) => state.podcast;

// Actions
export const {
  setEpisode,
  setCurrentradioid,
  setCurrentradiotitle,
  setRadioPlay,
  setgCurrentradiotitle,
  setPlayradioid,
  setPodcastMedia,
  setCurrentvolume,
  setCurrentsliderid,
  setCurrentstreamurl,
  setStreamurl,
  setMetatitle,
  setPlayradiometadata,
  setMetadescription,
  setMetaimg,
  setRadiomatadata,
} = podcastSlice.actions;
