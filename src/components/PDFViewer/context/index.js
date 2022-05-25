import { createContext, useReducer } from "react";
import { fromJS } from "immutable";

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
    case "DOCUMENT_LOAD":
      const { document, heights } = documentLoad(payload);
      return state
        .set("document", document)
        .set("heights", heights)
        .set("current", 1);
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
