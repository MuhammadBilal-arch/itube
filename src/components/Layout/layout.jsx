import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./layout.module.css";
import { Layout, Menu, Input, Button, Switch, Space } from "antd";
import {
  HomeFilled,
  VideoCameraFilled,
  PlaySquareFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import { Auth } from "../../context/authcontext";
import { Theme } from "../../context/themecontext";
import { DrawerFormForSignUp } from "../../containers/auth/Signup";
import { DrawerFormForSignIn } from "../../containers/auth/Login";

const { Header, Content, Footer, Sider } = Layout;

const SiderDemo = (props) => {
  const AuthContext = useContext(Auth);
  const ThemeContext = useContext(Theme);

  const [Signup, setSignup] = useState(false);
  const [SignIn, setSignIn] = useState(false);
  const [collapsed, setcollapsed] = useState(false);

  const showDrawerForSignup = () => {
    setSignup(true);
  };

  const onCloseDrawerForSignup = () => {
    setSignup(false);
  };

  const showDrawerForSignIn = () => {
    setSignIn(true);
  };

  const onCloseDrawerForSignIn = () => {
    setSignIn(false);
  };

  const onCollapse = (collapsed) => {
    setcollapsed(collapsed);
  };

  const OnSignOut = () => {
    setSignup(false);
    AuthContext.Logout();
  };

  const Search = (value) => console.log(value);

  const { ThemeBG, ThemeTxt, ThemeContent } = ThemeContext.ThemeColor;
  return (
    <Layout>
      <Header
        className={classes.Header}
        style={{ backgroundColor: "transparent", color: ThemeTxt }}
      >
        <div className={classes.logo}>
          <YoutubeFilled />
        </div>
        <Input.Search
          placeholder="input search text"
          onSearch={Search}
          enterButton
          style={{ width: 600 }}
        />
        <Switch onChange={ThemeContext.ThemeChange} checkedChildren="Dark" unCheckedChildren="Light" defaultChecked />
        {AuthContext.IsLoggedIn ? (
          <Space size="large">
            <div>Hi,&nbsp;Muhammad</div>
            <Button type="primary" onClick={OnSignOut}>
              Sign Out
            </Button>
          </Space>
        ) : (
          <Space size="middle">
            <Button type="primary" onClick={showDrawerForSignup}>
              Sign Up
            </Button>
            <Button type="primary" onClick={showDrawerForSignIn}>
              Sign In
            </Button>
          </Space>
        )}
        {Signup && (
          <DrawerFormForSignUp
            showDrawer={showDrawerForSignup}
            onClose={onCloseDrawerForSignup}
            visible={Signup}
          />
        )}
        {SignIn && (
          <DrawerFormForSignIn
            showDrawer={showDrawerForSignIn}
            onClose={onCloseDrawerForSignIn}
            visible={SignIn}
          />
        )}
      </Header>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          top: "0px",
          left: 0,
          backgroundColor: ThemeBG,
          color: ThemeTxt,
          borderRight: "2px solid rgba(0,0,0,0.1)",
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        breakpoint="lg"
        collapsedWidth="60"
      >
        <Menu
          defaultSelectedKeys={["2"]}
          mode="inline"
          style={{
            marginTop: 64,
            padding: "0",
            backgroundColor: "transparent",
            color: ThemeTxt,
            borderRight: "transparent",
          }}
        >
          <Menu.Item key="1" icon={<HomeFilled />}>
            <Link to="/" style={{ color: ThemeTxt }}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraFilled />}>
            <Link to="/videos" style={{ color: ThemeTxt }}>
              Videos
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<PlaySquareFilled />}>
            <Link to="/videos/flist" style={{ color: ThemeTxt }}>
              Favourities videos
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={collapsed ? classes.MainOFF : classes.MainOn}>
        <Content
          className={classes.sitelayoutbackground}
          style={{ backgroundColor: ThemeContent, color: ThemeTxt }}
        >
          {props.children}
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SiderDemo;
