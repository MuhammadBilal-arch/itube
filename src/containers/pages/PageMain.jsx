import React, { useEffect, useState } from "react";
import { Carousel, Divider } from "antd";
import axios from "axios";
import { SpinLoading } from "../../components/Spinner/SpinLoading";
import { Iframe } from "../../components/Videos/Iframe";
import classes from "./PageMain.module.css";
import { connect } from "react-redux";
import { fetchUsers } from "../../Redux/Actions/UserActions/UsersAction";

const PageMain = (props) => {
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
      {/* <Spin spinning={props.loading}>
        {props.users.map((item, index) => {
          return (
            <ul key={index}>
              <li>{item.Name}</li>
              <li>{item.PhoneNo}</li>
            </ul>
          );
        })}
      </Spin>
      <Button onClick={() => props.fetchUsers()}>Hellow World</Button> */}
      <div style={{ textAlign: "center", fontSize: "54px" }}>iTube</div>
      <Divider style={{ padding: "0px 0px 15px 0px" }} />

      <SpinLoading>
        <Carousel autoplay effect="fade" easing className={classes.MainVideo}>
          {videolist.map((item, index) => {
            return (
              <div key={index}>
                <Iframe iwidth="100%" iheight="300" ilink={item.videoLink} />
              </div>
            );
          })}
        </Carousel>
      </SpinLoading>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.UsersReducer.loading,
  users: state.UsersReducer.users,
  error: state.UsersReducer.error,

  loaded: state.UserReducer.loading,
  user: state.UserReducer.user,
  err: state.UserReducer.error,
});

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageMain);
