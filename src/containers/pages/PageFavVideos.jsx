import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Result, Button, Row, Col } from "antd";
import { UseDivider } from "../../components/Divider/Divider";
import { SpinLoading } from "../../components/Spinner/SpinLoading";
import { Iframe } from "../../components/Videos/Iframe";

const PageFavVideos = () => {
  let history = useHistory();
  const onMoveBack = () => {
    history.goBack();
  };
  const [videolist, setvideolist] = useState([]);

  useEffect(() => {
    let isActive = true;
    axios.get("http://localhost:5000/Playlist").then((vid) => {
      if (isActive) {
        setvideolist(vid.data);
      }
    });
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <>
      {videolist.length !== 0 ? (
        <div style={{ padding: "20px 20px" }}>
          <UseDivider text="Playlist videos" />
          <Row justify="space-around">
            {videolist.map((item, index) => {
              return (
                <Col
                  key={index}
                  className="gutter-row"
                  style={{ marginBottom: "30px" }}
                  xs={{ span: 20 }}
                  sm={{ span: 10 }}
                  md={{ span: 10 }}
                  lg={{ span: 5 }}
                >
                  <SpinLoading>
                    <Iframe
                      iwidth="100%"
                      iheight="180"
                      ilink={item.videoLink}
                    />
                  </SpinLoading>
                </Col>
              );
            })}
          </Row>
        </div>
      ) : (
        <Result
          style={{ backgroundColor: "white" }}
          status="info"
          title="Favourite Video list"
          subTitle="There is item in the list at moment."
          extra={
            <Button type="primary" onClick={onMoveBack}>
              Go Back
            </Button>
          }
        />
      )}
    </>
  );
};

export default PageFavVideos;
