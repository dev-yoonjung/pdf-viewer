import { createContext } from "react";
import { fromJS } from "immutable";

export const initialState = fromJS({
  document: {},
  heights: [],
  current: 0,
  fit: "page",
  scale: 1.0,
});

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "DOCUMENT_LOAD":
      const { document, heights } = documentLoad(payload.document);
      return state
        .set("document", document)
        .set("heights", heights)
        .set("current", 1);
  }
}

function documentLoad(document) {
  const heights = [];

  for (const i = 1; i <= document.numPages; i++) {
    document.getPage(i).then((page) => {
      let height = page._pageInfo.view[3];
      let start = 0;
      let end = height * 0.8;

      if (i > 1) {
        const prevHeight = heights[i - 1];
        start = prevHeight.end;
        end = start + height + 15;
      }
    });
  }

  return { document, heights };
}

export const Context = createContext();
