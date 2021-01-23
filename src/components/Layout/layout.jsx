import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./layout.module.css";
import { Layout, Menu, Input, Button, Switch, Space, Drawer } from "antd";
import {
  HomeFilled,
  VideoCameraFilled,
  PlaySquareFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import { Auth } from "../../context/authcontext";
import { Theme } from "../../context/themecontext";
import DrawerFormForSignUp from "../../containers/auth/Signup";
import DrawerFormForSignIn from "../../containers/auth/Login";
import { fetchUsers } from "../../Redux/Actions/UserActions/UsersAction";
import { connect } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;

const SiderDemo = (props) => {
  const AuthContext = useContext(Auth);
  const ThemeContext = useContext(Theme);

  const [Signup, setSignup] = useState(false);
  const [SignIn, setSignIn] = useState(false);
  const [menu, setmenu] = useState(false);
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

  const Search = (value) => {
    console.log(value);
    props.fetchUsers(value);
  };

  const { ThemeBG, ThemeTxt, ThemeContent, ThemeNav } = ThemeContext.ThemeColor;
  return (
    <Layout>
      <Header
        className={classes.Header}
        style={{
          backgroundColor: ThemeNav,
          color: ThemeTxt,
          overflow: "hidden",
        }}
      >
        <div className={classes.logo}>
          <YoutubeFilled />
        </div>

        <Input.Search
          className={classes.inputbar}
          placeholder="input search text"
          onSearch={Search}
          enterButton
          style={{ width: "50vw" }}
        />
        <ul style={{ marginTop: "50px" }}>
          {props.load
            ? props.users.map((item, index) => {
                return (
                  <li
                    key={index}
                    style={{
                      width: "200px",
                      height: "100px",
                      backgroundColor: ThemeNav,
                      color: ThemeTxt,
                    }}
                  >
                    {item.Name}
                    {console.log(item.Name)}
                  </li>
                );
              })
            : null}
        </ul>

        <div className={classes.Hamburger}>
          <i
            className="fa fa-bars"
            style={{ fontSize: "22px" }}
            onClick={() => setmenu(true)}
          ></i>
        </div>
        <Drawer
          title="Menu"
          placement="bottom"
          closable={false}
          onClose={() => setmenu(false)}
          visible={menu}
          key="bottom"
          headerStyle={{ backgroundColor: "#1890ff", borderBottom: "#1890ff" }}
          bodyStyle={{ backgroundColor: ThemeBG }}
        >
          <Menu
            defaultSelectedKeys={["1"]}
            // mode="inline"
            style={{
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
        </Drawer>
        <div className={classes.AccountButtons}>
          {AuthContext.IsLoggedIn ? (
            <Space size="small">
              <Switch
                onChange={ThemeContext.ThemeChange}
                checkedChildren="Dark"
                unCheckedChildren="Light"
                defaultChecked
              />
              <div style={{ fontSize: "12px" }}>{props.user.Name}</div>
              <Button type="primary" onClick={OnSignOut}>
                Sign Out
              </Button>
            </Space>
          ) : (
            <Space size="middle">
              <Switch
                onChange={ThemeContext.ThemeChange}
                checkedChildren="Dark"
                unCheckedChildren="Light"
                defaultChecked
              />

              <Button type="primary" onClick={showDrawerForSignup}>
                Sign Up
              </Button>
              <Button type="primary" onClick={showDrawerForSignIn}>
                Sign In
              </Button>
            </Space>
          )}
        </div>

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
          overflow: "hidden",
          height: "100vh",
          position: "fixed",
          top: "0px",
          // left: 0,
          backgroundColor: ThemeBG,
          color: ThemeTxt,
          borderRight: "2px solid rgba(0,0,0,0.1)",
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        breakpoint="md"
        collapsedWidth="0"
      >
        <Menu
          defaultSelectedKeys={["1"]}
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

const mapStateToProps = (state) => ({
  loading: state.UserReducer.loading,
  user: state.UserReducer.user,
  error: state.UserReducer.error,

  load: state.UsersReducer.loading,
  users: state.UsersReducer.users,
});

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(SiderDemo);
