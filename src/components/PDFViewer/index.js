import { useReducer } from "react";

import { pdfjs } from "react-pdf";

import { Context, reducer, initialState } from "./context";

import Document from "./Document";

import PDFViewerStyle from "styles/PDFViewerStyle";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PDFViewerStyle onContextMenu={(e) => e.preventDefault()}>
      <Context.Provider value={dispatch}>
        <Document />
      </Context.Provider>
    </PDFViewerStyle>
  );
};

export default PDFViewer;
