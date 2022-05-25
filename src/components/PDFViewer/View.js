import { useContext } from "react";
import { Context } from "./context";

import { Document, Page } from "react-pdf";
import file from "file/test_pdf.pdf";

function View() {
  const [state, dispatch] = useContext(Context);

  return (
    <div className="document-container">
      <Document
        file={file}
        onLoadSuccess={(document) =>
          dispatch({ type: "DOCUMENT_LOAD", payload: document })
        }
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
    </div>
  );
}

export default View;
