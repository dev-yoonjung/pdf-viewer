import { useContext } from "react";
import { Context } from "./context";

function Document() {
  const dispatch = useContext(Context);

  return <>Document</>;
}

export default Document;
