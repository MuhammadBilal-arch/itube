import React, { useState, useEffect } from "react";
// import Spinner from "../../components/loading/Spinner";
import { Skeleton, Divider, Row, Col, Button, Modal } from "antd";
import axios from "axios";
const PageVideos = (props) => {
  const [videolist, setvideolist] = useState([]);
  const [video, setvideo] = useState(
    "https://www.youtube.com/embed/e1ZUQoRyhi4"
  );
  const [loading, setloading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/videos").then((data) => {
      setvideolist(data.data);
    });
    // .catch(error => console.log(error))
    setTimeout(() => {
      setloading(false);
    }, 5000);
  }, [loading]);

  const onPlayVideo = (link) => {
    console.log("im called");
    setvideo(link);
    setIsModalVisible(true);
  };

  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.05)", padding: "20px 20px" }}>
      <Divider orientation="left" style={{padding:"0px 0px 15px 0px"}}>Videos</Divider>
      <Row justify="space-around">
        {videolist.map((item, index) => {
          return (
            <Col
              style={{ backgroundColor: "red" }}
              className="gutter-row"
              style={{ marginBottom: "30px" }}
              xs={{ span: 20 }}
              sm={{ span: 10 }}
              md={{ span: 5 }}
              lg={{ span: 5 }}
              key={index}
            >
              <Skeleton active round loading={loading} size="default">
                <div>
                  <Button
                    type="primary"
                    onClick={() => onPlayVideo(item.videoLink)}
                  >
                    Play video
                  </Button>
                  <div style={{background: "url('https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif') center center no-repeat"}} >
                  <iframe
                    title={index}
                    width="100%"
                    height="200"
                    showinfo="0"
                    controls="0"
                    src={item.videoLink}
                    frameBorder="0"
                    rel="0"
                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    // allowFullScreen
                  ></iframe>
                  </div>
                  <Modal
                    title="Playing Video"
                    visible={isModalVisible}
                    onOk={() => setIsModalVisible(false)}
                    onCancel={() => setIsModalVisible(false)}
                    destroyOnClose
                    footer
                    keyboard
                  >
                    <div style={{background: "url('https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif') center center no-repeat"}} >
                    <iframe
                      title={index}
                      width="100%"
                      height="300"
                      showinfo="0"
                      controls="0"
                      src={video}
                      frameBorder="0"
                      autoPlay='1'
                      rel="0"
                      // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      // allowFullScreen
                    ></iframe>
                    </div>
                  </Modal>
                </div>
              </Skeleton>
            </Col>
          );
        })}
      </Row>
      <Divider orientation="left" style={{padding:"0px 0px 15px 0px"}}>Selected video</Divider>
      <Row justify="space-around" align="middle">
        <Col
          className="gutter-row"
          xs={{ span: 22 }}
          sm={{ span: 22 }}
          md={{ span: 22 }}
          lg={{ span: 20 }}
          style={{ marginBottom: "30px" }}
        >
          <iframe
            title="main-video"
            width="100%"
            height="500"
            src={video}
            frameBorder="0"
            rel="0"
            autoPlay="1"
            muted="1"
            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
            // allowFullScreen
          ></iframe>
        </Col>
      </Row>
    </div>
  );
};

export default PageVideos;
