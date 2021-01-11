import React from "react";
import { Link } from "react-router-dom";
import classes from "./layout.module.css";
import { Layout, Menu, Input } from "antd";
import {
  HomeFilled,
  VideoCameraFilled,
  PlaySquareFilled,
  YoutubeFilled
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";

const { Header, Content, Footer, Sider } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  Search = (value) => console.log(value);

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          breakpoint="md"
          collapsedWidth="60"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
        >
          <div className={classes.logo}><YoutubeFilled /></div>
          <Menu theme="light" defaultSelectedKeys={["2"]} mode="inline" style={{padding:'0'}}>
            <Menu.Item key="1" icon={<HomeFilled />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraFilled />}>
              <Link to="/videos">Videos</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<PlaySquareFilled />}>
              <Link to="/videos/flist">Favourities videos</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout   className={collapsed ? classes.MainOFF : classes.MainOn}>
          <Header className={classes.Header}>
            <Input.Search
              placeholder="input search text"
              onSearch={Search}
              enterButton
              style={{ width: "600px" }}
            />
          </Header>
          <Content className={classes.sitelayoutbackground}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;
