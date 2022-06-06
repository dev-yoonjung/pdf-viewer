import PropTypes from "prop-types";

import { pdfjs } from "react-pdf";

import Provider from "./context";

import Controller from "./Controller";
import View from "./View";

import PDFViewerStyle from "styles/PDFViewerStyle";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ file }) => {
  return (
    <PDFViewerStyle onContextMenu={(e) => e.preventDefault()}>
      <Provider>
        <Controller />
        <View file={file} />
      </Provider>
    </PDFViewerStyle>
  );
};

PDFViewer.propTypes = {
  file: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(ArrayBuffer),
    PropTypes.shape({
      data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      httpHeaders: PropTypes.object,
      range: PropTypes.object,
      url: PropTypes.string,
      withCredentials: PropTypes.bool,
    }),
  ]).isRequired,
};

export default PDFViewer;
