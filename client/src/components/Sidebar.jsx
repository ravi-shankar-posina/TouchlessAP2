import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import abb from "../assets/abb.png";
import {
  HomeOutlined,
  FileOutlined,
  DatabaseOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Modal } from "antd";
// import abb2 from "../assets/abb.png";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true" || false
  );
  const location = useLocation();
  const [hoverKey, setHoverKey] = useState(null);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    // Clear login status or perform any other logout logic
    localStorage.removeItem("isLogin");

    // Close the modal
    setLogoutModalVisible(false);

    navigate("/");
  };

  const cancelLogout = () => {
    // Close the modal without logging out
    setLogoutModalVisible(false);
  };

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  const menuItems = [
    { key: "1", icon: <HomeOutlined />, label: "Home", link: "/home" },
    {
      key: "2",
      icon: <FileOutlined />,
      label: "Po Line Items",
      link: "/header",
    },
    {
      key: "3",
      icon: <DatabaseOutlined />,
      label: "Source Data",
      link: "/sourcedata",
    },
    { key: "4", icon: <SettingOutlined />, label: "Settings", link: "/" },
    {
      key: "5",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: "98vh" }}>
        <Sider
          style={{ backgroundColor: "white", border: "1px solid gray" }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          {!collapsed && (
            <div
              className="logo"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <img
                src={abb}
                alt="Logo"
                style={{ width: "90px", height: "35px", marginTop: "30px" }}
              />
            </div>
          )}
          {collapsed && (
            <div
              className="logo"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <img
                src={abb}
                alt="Logo"
                style={{ width: "45px", height: "15px", marginTop: "50px" }}
              />
            </div>
          )}

          <br />
          <Menu
            theme="#ffd6e7"
            defaultSelectedKeys={["1"]}
            mode="inline"
            style={{ margin: "10px" }}
          >
            {menuItems.map(({ key, icon, label, link, onClick }) => {
              const isSelected = location.pathname === link;

              return (
                <Menu.Item
                  key={key}
                  icon={React.cloneElement(icon, {
                    style: { color: isSelected ? "white" : "inherit" },
                  })}
                  onClick={onClick}
                  onMouseEnter={() => setHoverKey(key)}
                  onMouseLeave={() => setHoverKey(null)}
                  style={{
                    width: "80%",
                    backgroundColor: isSelected
                      ? "#002140"
                      : hoverKey === key
                      ? "lightgray"
                      : "transparent",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <Link
                    to={link}
                    style={{
                      color: isSelected
                        ? "white"
                        : collapsed
                        ? "white"
                        : "inherit",
                    }}
                  >
                    {label}
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>

          {/* Logout Confirmation Modal */}
          <Modal
            title="Logout Confirmation"
            visible={logoutModalVisible}
            onOk={confirmLogout}
            onCancel={cancelLogout}
            cancelButtonProps={{ style: { color: "red" } }}
          >
            <p>Are you sure you want to logout?</p>
          </Modal>
        </Sider>

        <Layout>
          <div
            style={{
              padding: 16,
              textAlign: collapsed ? "center" : "right",
              color: collapsed ? "black" : "inherit",
            }}
          >
            {/* Additional content in the layout if needed */}
          </div>
        </Layout>
      </Layout>
    </>
  );
};

export default Sidebar;
