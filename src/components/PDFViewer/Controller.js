import { useState, useEffect, useContext } from "react";
import { Context } from "./context";

import { Button } from "antd";
import NumericInput from "components/NumericInput";
import {
  ColumnWidthOutlined,
  ColumnHeightOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";

const Controller = () => {
  const [pageValue, setPageValue] = useState("");
  const [scaleValue, setScaleValue] = useState("");
  const [state, dispatch] = useContext(Context);
  const current = state.get("current");
  const scale = state.get("scale");
  const fit = state.get("fit");

  useEffect(() => {
    setPageValue(current);
  }, [current]);

  useEffect(() => {
    setScaleValue(Math.round(scale * 100));
  }, [scale]);

  const handleFitClick = () => {
    state
      .get("document")
      .getPage(1)
      .then((page) => {
        const pageWidth = page._pageInfo.view[2];
        const pageHeight = page._pageInfo.view[3];

        const { clientWidth, clientHeight } = document.querySelector(
          ".document-container"
        );

        const scaleX = clientWidth / pageWidth;
        const scaleY = clientHeight / pageHeight;

        const next = fit === "page" ? "width" : "page";
        const nextScale = next === "width" ? scaleX : scaleY;

        dispatch({ type: "SET_FIT", payload: next });
        dispatch({ type: "SET_SCALE", payload: nextScale });
      });
  };

  const handlePressPage = () => {
    let value = Number(pageValue);
    const total = state.get("document").numPages;

    // if the input value is greater than the total pages,
    // it is specified as the total pages.
    if (value > total) {
      value = total;

      // if the input value is 0, it is specified as the first page.
    } else if (value === 0) {
      value = 1;
    }

    moveToTop(value);
    dispatch({ type: "SET_CURRENT", payload: value });
  };

  const moveToTop = (page) => {
    let top = 0;
    const heights = state.get("heights");
    if (page > 1) {
      for (let i = 1; i < page; i++) {
        const { height } = heights[i];
        top += height * scale + 15;
      }
    }

    document.querySelector(".document-container").scrollTo({ top });
  };

  return (
    <section className="pdf-controller-container">
      <div className="page-counter">
        <NumericInput
          className="current-page"
          value={pageValue}
          onChange={setPageValue}
          onPressEnter={handlePressPage}
        />
        <span className="separator">/</span>
        {state.get("document").numPages}
      </div>
      <Button title="Zoom In" onClick={() => dispatch({ type: "ZOOM_IN" })}>
        <span>
          <PlusOutlined />
        </span>
      </Button>
      <div className="page-scale">
        <NumericInput
          className="current-scale"
          value={scaleValue}
          onChange={setScaleValue}
          onPressEnter={() =>
            dispatch({ type: "SET_SCALE", payload: scaleValue / 100 })
          }
          suffix="%"
        />
      </div>
      <Button title="Zoom Out" onClick={() => dispatch({ type: "ZOOM_OUT" })}>
        <span>
          <MinusOutlined />
        </span>
      </Button>
      <Button
        onClick={handleFitClick}
        title={fit === "page" ? "To fit the width" : "To fit the page"}
      >
        <span>
          {fit === "page" ? <ColumnWidthOutlined /> : <ColumnHeightOutlined />}
        </span>
      </Button>
    </section>
  );
};

export default Controller;
