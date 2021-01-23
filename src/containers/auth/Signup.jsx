import { useContext } from "react";
import { Drawer, Form, Button, Input } from "antd";
import { UserOutlined, LockOutlined, NumberOutlined } from "@ant-design/icons";
import { Auth } from "../../context/authcontext";
import { connect } from "react-redux";
import { createUser } from "../../Redux/Actions/UserActions/UserAction";

const DrawerFormForSignUp = (props) => {
  const AuthContext = useContext(Auth);

  const OnCreateAccount = (value) => {
    console.log(value);
    props.createUser(value);
    // console.log(AuthContext.LoggedIn())
    AuthContext.LoggedIn();
    props.onClose();
  };

  return (
    <>
      <Drawer
        title="Create a account"
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
          onFinish={OnCreateAccount}
        >
          <Form.Item
            name="Name"
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
            name="Password"
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

          <Form.Item
            name="PhoneNo"
            rules={[
              {
                required: true,
                message: "Please input your Phone No!",
              },
            ]}
          >
            <Input
              prefix={<NumberOutlined className="site-form-item-icon" />}
              type="number"
              placeholder="Phone No"
            />
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  createUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerFormForSignUp);
