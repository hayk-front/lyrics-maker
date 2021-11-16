import { produce } from "immer";
import {
  setWidthInPercent,
  setWidthInPixels,
  setChunksActiveEdge,
  setActiveChunkRef,
  setAudioElement,
  setShowLyrics,
  setCurrentLyrics,
} from "./producer";

const initialState = {
  audio: null,
  showLyrics: false,
  currentLyrics: "",
  widthInPercent: 0,
  widthInPixels: 0,
  chunksActiveEdge: null,
  activeChunkRef: null,
};

export const globals = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "SET_WIDTH_IN_PERCENT":
        setWidthInPercent(action)(state, draft);
        break;
      case "SET_WIDTH_IN_PIXELS":
        setWidthInPixels(action)(state, draft);
        break;
      case "SET_CURRENT_LYRICS":
        setCurrentLyrics(action)(state, draft);
        break;
      case "SET_CHUNKS_ACTIVE_EDGE":
        setChunksActiveEdge(action)(state, draft);
        break;
      case "SET_ACTIVE_CHUNK_REF":
        setActiveChunkRef(action)(state, draft);
        break;
      case "SET_SHOW_LYRICS":
        setShowLyrics(action)(state, draft);
        break;
      case "SET_AUDIO_ELEMENT":
        setAudioElement(action)(state, draft);
        break;
      default:
        break;
    }
  });
};
