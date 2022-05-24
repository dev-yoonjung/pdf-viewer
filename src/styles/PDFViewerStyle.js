import styled from "styled-components";

const PDFViewerStyle = styled.div`
  .react-pdf__Page__textContent {
    border: 1px solid darkgrey;
    box-shadow: 5px 5px 5px 1px #ccc;
    border-radius: 5px;
  }

  .react-pdf__Page__canvas {
    margin: 0 auto;
  }

  .react-pdf__Page__textContent {
    visibility: hidden;
  }
`;

export default PDFViewerStyle;
