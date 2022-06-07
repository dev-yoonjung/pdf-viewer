import { createContext, useReducer } from "react";
import { fromJS } from "immutable";

import * as actionTypes from "./constants";

const initialState = fromJS({
  document: {},
  heights: [],
  current: 0,
  fit: "page",
  scale: 1.0,
});

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.DOCUMENT_LOAD:
      const { document, heights } = documentLoad(payload);
      return state
        .set("document", document)
        .set("heights", heights)
        .set("current", 1);
    case actionTypes.SET_CURRENT:
      return state.set("current", payload);
    case actionTypes.SET_SCALE:
      return state.set("scale", payload);
    case actionTypes.SET_FIT:
      return state.set("fit", payload);
    case actionTypes.ZOOM_IN:
      return state.set("scale", state.get("scale") + 0.1);
    case actionTypes.ZOOM_OUT:
      return state.set("scale", Math.max(0.1, state.get("scale") - 0.1));
    default:
      return state;
  }
}

function documentLoad(document) {
  const heights = [];

  for (let i = 1; i <= document.numPages; i++) {
    document.getPage(i).then((page) => {
      let height = page._pageInfo.view[3];
      let start = 0;
      let end = height * 0.8;

      // 2 page ~
      if (i > 1) {
        const prev = heights[i - 2];
        start = prev.end;
        end = start + height + 15;
      }

      heights.push({ start, end, height });
    });
  }

  return { document, heights };
}

export const Context = createContext();

function Provider({ children }) {
  const store = useReducer(reducer, initialState);

  return <Context.Provider value={store}>{children}</Context.Provider>;
}

export default Provider;
