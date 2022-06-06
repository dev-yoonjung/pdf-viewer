import PDFViewer from "components/PDFViewer";

import file from "file/test_pdf.pdf";

const Container = () => {
  return <PDFViewer file={file} />;
};

export default Container;
