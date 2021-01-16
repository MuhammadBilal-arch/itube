import React, { useEffect , useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Result, Button, Row, Col, Divider } from "antd";

const PageFavVideos = () => {
  let history = useHistory();
  const onMoveBack = () => {
    history.goBack();
  };
  const [videolist, setvideolist] = useState([]);

  console.log("Page Fav Videos")
  useEffect(() => {
    let isActive = true;
    axios.get("http://localhost:5000/Playlist").then((vid) => {
      if(isActive)
      {
        setvideolist(vid.data);
      }
    });
    return () => {
        isActive = false;
    }
  }, []);

  return (
    <>
      {videolist.length !== 0 ? (
        <div style={{ padding: "20px 20px" }}>
          <Divider orientation="left" style={{ padding: "0px 0px 15px 0px" ,border: "white"}}>
            Playlist videos
          </Divider>
          <Row justify='space-between'>
            {
                videolist.map((item,index) => {
                    return <Col key={index}
                    className="gutter-row"
                    style={{ marginBottom: "30px" }}
                    xs={{ span: 20 }}
                    sm={{ span: 10 }}
                    md={{ span: 5 }}
                    lg={{ span: 5 }}
                    >
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
                    </Col>
                })
            }
          </Row>
        </div>
      ) : (
        <Result
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
