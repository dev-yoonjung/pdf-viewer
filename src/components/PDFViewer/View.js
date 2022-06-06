import { useContext } from "react";
import { Context } from "./context";

import { Document, Page } from "react-pdf";

import Error from "./Error";

const View = ({ file }) => {
  const [state, dispatch] = useContext(Context);

  const handleScroll = (e) => {
    let current = 1;

    const { scrollTop } = e.target;
    const heights = state.get("heights");
    const scale = state.get("scale");
    for (let i = 0; i < heights.length; i++) {
      const { start, end } = heights[i];
      const top = start * scale;
      const bottom = end * scale;
      if (scrollTop >= top && scrollTop < bottom) {
        break;
      }

      current++;
    }

    dispatch({ type: "SET_CURRENT", payload: current });
  };

  return (
    <section className="document-container" onScroll={handleScroll}>
      <Document
        file={file}
        onLoadSuccess={(document) =>
          dispatch({ type: "DOCUMENT_LOAD", payload: document })
        }
        error={<Error />}
      >
        <div className="page-list">
          {Array.from(new Array(state.get("document").numPages), (_, index) => {
            const page = index + 1;
            return (
              <Page
                scale={state.get("scale")}
                pageNumber={page}
                key={`${page}-page`}
              />
            );
          })}
        </div>
      </Document>
    </section>
  );
};

export default View;
