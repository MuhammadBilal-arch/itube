import React, { useState, useEffect } from "react";
import { UseDivider } from "../../components/Divider/Divider";
import { Row, Col, Button, Modal, notification } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { SpinLoading } from "../../components/Spinner/SpinLoading";
import { Iframe } from "../../components/Videos/Iframe";


const PageVideos = () => {
  const [videolist, setvideolist] = useState([]);
  const [video, setvideo] = useState(
    "https://www.youtube.com/embed/e1ZUQoRyhi4"
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  // console.log("Page Videos Components")
  useEffect(() => {
    let isActive = true;
    axios.get("http://localhost:5000/videos").then((vid) => {
      if (isActive) {
        setvideolist(vid.data);
      }
    });

    return () => {
      isActive = false;
      // console.log("Page Video unmount");
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
      <UseDivider text="Recommended videos" />
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

                  <SpinLoading>
                  <Iframe iwidth = "100%" iheight="180" ilink={item.videoLink}/>
                  </SpinLoading>
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
                      <Iframe iwidth="100%" iheight="300" ilink={video} />
                    </div>
                  </Modal>
                </div>
              </Col>
            );
          })
        ) : (
          <h1>Data is not available at moment.</h1>
        )}
      </Row>
      <UseDivider text="Selected videos" />
      <Row justify="space-around" align="middle">
        <Col
          className="gutter-row"
          xs={{ span: 22 }}
          sm={{ span: 22 }}
          md={{ span: 22 }}
          lg={{ span: 20 }}
          style={{ marginBottom: "30px" }}
        >
          <Iframe iwidth="100%" iheight="500" ilink={video} />
        </Col>
      </Row>
    </div>
  );
};

export default PageVideos;
