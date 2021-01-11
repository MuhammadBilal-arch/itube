import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Result, Button } from "antd";

function Page404() {
  let history = useHistory();
  console.log(useLocation());
  // console.log(history.location.pathname)
  const onMoveBack = () => {
    history.goBack();
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={onMoveBack}>
          Back Home
        </Button>
      }
    />
  );
}

export default Page404;
