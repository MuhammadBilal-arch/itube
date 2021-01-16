import React, { useState, useEffect } from "react";
import {
  Skeleton,
  Divider,
  Row,
  Col,
  Button,
  Modal,
  Spin,
  notification,
} from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

const PageVideos = () => {
  const [videolist, setvideolist] = useState([]);
  const [video, setvideo] = useState(
    "https://www.youtube.com/embed/e1ZUQoRyhi4"
  );
  const [loading, setloading] = useState(true);
  const [spinner, setspin] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  console.log("Page Videos")
  useEffect(() => {
    let isActive = true;
    axios.get("http://localhost:5000/videos").then((vid) => {
      if (isActive) {
        setvideolist(vid.data);
      }
    });

    setTimeout(() => {
      setloading(false);
      setTimeout(() => {
        setspin(false);
      }, 5000);
    }, 3000);

    return () => {
      isActive = false;
      console.log("unmount");
    };
  }, []);

  const onPlayVideo = (link) => {
    setvideo(link);
    setIsModalVisible(true);
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Notification",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };

  const onAddToPlaylist = (ID) => {
    axios
      .get(`http://localhost:5000/videos/${ID}`)
      .then((vid) => {
        axios
          .post(`http://localhost:5000/Playlist`, vid.data)
          .then((response) => openNotificationWithIcon("success"))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  return (
    <div style={{ padding: "20px 20px" }}>
      <Divider orientation="left" style={{ padding: "0px 0px 15px 0px" , border:"white"}}>
        Videos
      </Divider>

      <Row justify="space-around">
        {videolist.length !== 0 ? (
          videolist.map((item, index) => {
            return (
              <Col
                className="gutter-row"
                style={{ marginBottom: "30px" }}
                xs={{ span: 20 }}
                sm={{ span: 10 }}
                md={{ span: 10 }}
                lg={{ span: 5 }}
                key={index}
              >
                <Skeleton active loading={loading} size="default">
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        type="primary"
                        onClick={() => onPlayVideo(item.videoLink)}
                      >
                        Play video
                      </Button>
                      <Button
                        type="link"
                        icon={
                          <PlusOutlined
                            style={{
                              fontWeight: "bold",
                              fontSize: "20px",
                              border: "5px solid #1890ff",
                            }}
                          />
                        }
                        shape="circle"
                        size="small"
                        onClick={() => onAddToPlaylist(item.id)}
                      ></Button>
                    </div>
                    <Spin spinning={spinner} size="large">
                      <iframe
                        title={index}
                        width="100%"
                        height="180"
                        showinfo="0"
                        controls="0"
                        src={item.videoLink}
                        frameBorder="0"
                        rel="0"
                      ></iframe>
                    </Spin>
                    <Modal
                      title="Playing Video"
                      visible={isModalVisible}
                      onOk={() => setIsModalVisible(false)}
                      onCancel={() => setIsModalVisible(false)}
                      destroyOnClose
                      footer
                      keyboard
                    >
                      <div
                        style={{
                          background:
                            "url('https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif') center center no-repeat",
                        }}
                      >
                        <iframe
                          title={index}
                          width="100%"
                          height="300"
                          showinfo="0"
                          controls="0"
                          src={video}
                          frameBorder="0"
                          autoPlay="1"
                          rel="0"
                        ></iframe>
                      </div>
                    </Modal>
                  </div>
                </Skeleton>
              </Col>
            );
          })
        ) : (
          <h1>Data is not available at moment.</h1>
        )}
      </Row>
      <Divider orientation="left" style={{ padding: "0px 0px 15px 0px" , border:"white" }}>
        Selected video
      </Divider>
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
          ></iframe>
        </Col>
      </Row>
    </div>
  );
};

export default PageVideos;
