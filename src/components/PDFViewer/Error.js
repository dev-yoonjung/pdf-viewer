import { Result } from "antd";

const Error = () => {
  return (
    <Result
      status="error"
      title="Failed to load PDF file"
      subTitle="Sorry, the pdf file does not exist."
    />
  );
};

export default Error;
