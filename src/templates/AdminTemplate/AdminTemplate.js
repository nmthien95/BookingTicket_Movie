import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import _ from "lodash";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect, Route } from "react-router-dom";
import { history } from "../../App";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// const items = [
//   getItem(<NavLink to="/admin/user">User</NavLink>, "1", <UserOutlined />),
//   getItem("Option 2", "2", <DesktopOutlined />),
// ];

const AdminTemplate = (props) => {
  const { Component, ...restProps } = props;
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn không có quyền truy cập vào trang này");
    return <Redirect to="/" />;
  }
  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập vào trang này");
    return <Redirect to="/" />;
  }
  const operation = (
    <div className="flex justify-between items-center container mx-auto">
      <NavLink
        to="/"
        className="text-white text-3xl hover:text-lime-500 transition-all ease-linear"
      >
        <HomeOutlined />
      </NavLink>
      {!_.isEmpty(userLogin) ? (
        <div>
          <button
            className="mr-3"
            onClick={() => {
              history.push("/");
            }}
          >
            <div
              style={{
                width: 45,
                height: 45,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="text-2xl ml-5 rounded-full bg-red-200"
            >
              {userLogin.taiKhoan.substr(0, 1)}
            </div>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              history.push("/home");
              window.location.reload();
            }}
            className="text-lime-500"
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Layout
            style={{
              minHeight: "100vh",
            }}
          >
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                <Menu.Item key="1" icon={<UserOutlined />}>
                  <NavLink to="/admin/users">Users</NavLink>
                </Menu.Item>
                <SubMenu key="sub1" icon={<FileOutlined />} title="Films">
                  <Menu.Item key="10" icon={<FileOutlined />}>
                    <NavLink to="/admin/films">Films</NavLink>
                  </Menu.Item>
                  <Menu.Item key="11" icon={<FileOutlined />}>
                    <NavLink to="/admin/films/addnew">Add new</NavLink>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="3" icon={<DesktopOutlined />}>
                  <NavLink to="/admin/showtimes">Showtime</NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header
                className="site-layout-background"
                style={{
                  padding: 0,
                }}
              >
                <div className="text-right pr-10 ">{operation}</div>
              </Header>
              <Content
                style={{
                  margin: "0 16px",
                }}
              >
                <Breadcrumb
                  style={{
                    margin: "16px 0",
                  }}
                ></Breadcrumb>

                <div
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    minHeight: 360,
                  }}
                >
                  <Component {...propsRoute} />
                </div>
              </Content>
              <Footer
                style={{
                  textAlign: "center",
                }}
              >
                Ant Design ©2018 Created by Ant UED
              </Footer>
            </Layout>
          </Layout>
        );
      }}
    />
  );
};

export default AdminTemplate;
