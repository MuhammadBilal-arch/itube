import React, { useEffect, useState } from "react";
import { Carousel, Divider} from "antd";
import axios from "axios";

const PageMain = () => {
  const [videolist, setvideolist] = useState([]);
  console.log("Page Main")
  useEffect(() => {
    let isActive = true;
    axios.get("http://localhost:5000/videos").then((vid) => {
      if (isActive) {
        setvideolist(vid.data);
      }
    });

    return () => {
      isActive = false;
      console.log("unmount main Page");
    };
  }, []);

  // console.log(videolist);
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
      <div style={{ width: "480px" }}>
        <Carousel autoplay>
          {videolist.length !== 0 ? (
            videolist.map((item, index) => {
              return (
                <div key={index}>
                  <iframe
                    title={index}
                    width="480"
                    height="300"
                    showinfo="0"
                    controls="0"
                    src={item.videoLink}
                    frameBorder="0"
                    rel="0"
                  ></iframe>
                </div>
              );
            })
          ) : (
            <h1>Data is not available at moment.</h1>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default PageMain;
