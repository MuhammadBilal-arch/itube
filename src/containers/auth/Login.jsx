import { useContext } from 'react'
import { Drawer, Form, Button, Input, Select, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Auth } from '../../context/authcontext'
const { Option } = Select;

export const DrawerFormForSignIn = (props) => {

    const AuthContext = useContext(Auth)
    const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const OnLoggedIn = () => {
    console.log(AuthContext.LoggedIn())
    AuthContext.LoggedIn();
    props.onClose();  
}

  return (
    <>
      <Drawer
        title="SignIn"
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
          onFinish={onFinish}
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
                message: "Please input your Password!",
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

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button onClick={props.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={OnLoggedIn} type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
