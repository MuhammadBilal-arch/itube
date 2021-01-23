import { useContext } from "react";
import { Drawer, Form, Button, Input, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Auth } from "../../context/authcontext";
import { connect } from "react-redux";
import { getUser } from "../../Redux/Actions/UserActions/UserAction";

const DrawerFormForSignIn = (props) => {
  const AuthContext = useContext(Auth);

  const OnLoggedIn = (value) => {

    props.getUser(value.username);
    return props.user.Password === value.password &&
        (AuthContext.LoggedIn(), props.onClose())
      
  };

  return (
    <>
      <Drawer
        title="Sign In"
        width={420}
        onClose={props.onClose}
        visible={props.visible}
        bodyStyle={{ paddingTop: 80, paddingLeft: 30, paddingRight: 30 }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={OnLoggedIn}
        >

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "password' must be between 6 and 10 characters!",
                max: 10,
                min: 6,
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 50 }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="Anywhere">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button onClick={props.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.UserReducer.loading,
  user: state.UserReducer.user,
  error: state.UserReducer.error,
});

const mapDispatchToProps = {
  getUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerFormForSignIn);
