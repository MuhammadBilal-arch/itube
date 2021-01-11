import { Spin } from "antd";
import React from "react";

const Spinner = () => {
  return (
    <div style={{ display: 'flex' , alignItems:'center',justifyContent:"center" ,height:"100%"}}>
      <Spin tip="Loading..."></Spin>
    </div>
  );
};

export default Spinner;
