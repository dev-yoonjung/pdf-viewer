import styled from "styled-components";

const PDFViewerStyle = styled.div`
  .react-pdf__Page {
    &__textContent {
      border: 1px solid darkgrey;
      box-shadow: 5px 5px 5px 1px #ccc;
      border-radius: 5px;
    }

    &__canvas {
      margin: 0 auto;
    }

    &__textContent {
      visibility: hidden;
    }
  }

  .pdf-controller-container {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    background-color: #323639;
    padding: 5px 0;
    color: #fff;
    font-size: 12px;

    .page {
      &-counter {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #ffffff;
      }

      &-scale {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .current {
      &-scale {
        font-size: 12px;
        width: 64px;
        height: 20px;
        text-align: center;
        color: #ffffff;
        border: none;
        padding: 4px;

        .ant-input {
          font-size: 12px;
          text-align: right;
          width: 32px;
          background-color: #191b1c;
          color: #ffffff;
        }
      }

      &-page {
        font-size: 12px;
        width: 40px;
        height: 20px;
        text-align: center;
        background-color: #191b1c;
        color: #fff;
        border: none;

        .ant-input {
          padding: 4px 2px;
        }
      }
    }

    .separator {
      padding: 0 7px;
    }

    button {
      border: none;
      box-shadow: none;
      font-size: 12px;
      background-color: #323639;
      color: #fff;

      &:hover {
        border-color: none;
        color: #0041b3;
      }
    }

    &:after {
      display: block;
      content: " ";
      height: 0px;
      clear: both;
      overflow: hidden;
      visibility: hidden;
    }
  }

  .document-container {
    background-color: #525659;
    width: 100%;
    height: calc(100vh - 42px);
    overflow-y: auto;

    .react-pdf {
      &__Document {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
      }

      &__Error,
      &__Loading,
      &__NoData {
        background: #ffffff;
        padding: 3em;
      }
    }
  }

  .page_list {
    & > div:not(:last-child) {
      margin-bottom: 15px;
    }

    .react-pdf__Page {
      display: inline-block;
    }
  }
`;

export default PDFViewerStyle;
