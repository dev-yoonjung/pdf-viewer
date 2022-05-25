import { pdfjs } from "react-pdf";

import Provider from "./context";

import View from "./View";

import PDFViewerStyle from "styles/PDFViewerStyle";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = () => {
  return (
    <PDFViewerStyle onContextMenu={(e) => e.preventDefault()}>
      <Provider>
        <View />
      </Provider>
    </PDFViewerStyle>
  );
};

export default PDFViewer;
