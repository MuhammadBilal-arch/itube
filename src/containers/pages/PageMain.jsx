import React, { useEffect, useState } from "react";
import { Carousel, Divider } from "antd";
import axios from "axios";
import { SpinLoading } from "../../components/Spinner/SpinLoading";
import { Iframe } from "../../components/Videos/Iframe";
const PageMain = () => {
  const [videolist, setvideolist] = useState([]);
  // console.log("Page Main Component");
  useEffect(() => {
    let isActive = true;
    axios.get("http://localhost:5000/videos").then((vid) => {
      if (isActive) {
        setvideolist(vid.data);
      }
    });

    return () => {
      isActive = false;
      // console.log("unmount main Page");
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "10px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center", fontSize: "54px" }}>iTube</div>
      <Divider style={{ padding: "0px 0px 15px 0px" }} />

      <SpinLoading>
        <div style={{ width: "480px", height: "300px" }}>
          <Carousel autoplay>
            {videolist.map((item, index) => {
              return (
                <div key={index}>
                  <Iframe iwidth = "100%" iheight="300" ilink={item.videoLink}/>
                </div>
              );
            })}
          </Carousel>
        </div>
      </SpinLoading>
    </div>
  );
};

export default PageMain;
