import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Picture1 from "../assets/Picture1.png";
import genpact_logo from "../assets/genpact_logo.png";
import {
  HomeOutlined,
  BlockOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { MyContext } from "./AuthProvider";

const { Sider } = Layout;

const Sidebar = () => {
  const { auth, clearAuth } = useContext(MyContext);

  const { t } = useTranslation();
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
    localStorage.removeItem("isLogin");
    setLogoutModalVisible(false);
    clearAuth();
    navigate("/");
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false);
  };

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  // Define menu items for all roles
  const allMenuItems = [
    { key: "1", icon: <HomeOutlined />, label: t("home"), link: "/home" },
    {
      key: "2",
      icon: <BlockOutlined />,
      label: t("header_items"),
      link: "/headeritem",
    },
    {
      key: "3",
      icon: <FileTextOutlined />,
      label: t("po_line_items"),
      link: "/po-lineitems",
    },
    {
      key: "4",
      icon: <DatabaseOutlined />,
      label: t("source_data"),
      link: "/sourcedata",
    },
    {
      key: "5",
      icon: <SettingOutlined />,
      label: "settings",
      link: "/settings",
    },
    {
      key: "6",
      icon: <LogoutOutlined />,
      label: t("logout"),
      onClick: handleLogout,
    },
  ];

  // Define menu items for users only
  // const userMenuItems = [
  //   {
  //     key: "1",
  //     icon: <BlockOutlined />,
  //     label: t("header_items"),
  //     link: "/headeritem",
  //   },
  //   {
  //     key: "2",
  //     icon: <FileTextOutlined />,
  //     label: t("po_line_items"),
  //     link: "/po-lineitems",
  //   },
  //   {
  //     key: "3",
  //     icon: <LogoutOutlined />,
  //     label: t("logout"),
  //     onClick: handleLogout,
  //   },
  // ];

  // Select menu items based on user role
  // const menuItems =
  //   auth.role === "admin" || auth.role === "super-admin"
  //     ? allMenuItems
  //     : userMenuItems;

  useEffect(() => {
    // Check if the current location is allowed for the user's role
    const currentPath = location.pathname;
    const allowedPaths = allMenuItems.map((item) => item.link);
    if (!allowedPaths.includes(currentPath)) {
      // Redirect to the first allowed path if the current path is not allowed
      navigate(allowedPaths[0]);
    }
  }, [auth, location, allMenuItems, navigate]);

  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

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
                src={Picture1}
                alt="Logo"
                style={{ width: "100px", height: "55px", marginTop: "50px" }}
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
                src={Picture1}
                alt="Logo"
                style={{ width: "85px", height: "45px", marginTop: "55px" }}
              />
            </div>
          )}

          <br />
          <Menu
            theme="#ffd6e7"
            defaultSelectedKeys={[allMenuItems[0].key]}
            mode="inline"
            style={{ margin: "10px" }}
          >
            {allMenuItems.map(({ key, icon, label, link, onClick }) => {
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
              {/* <img
                src={Picture1}
                alt="Logo"
                style={{ width: "130px", height: "75px", marginTop: "40px" }}
              /> */}
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
              {/* <img
                src={Picture1}
                alt="Logo"
                style={{ width: "70px", height: "45px", marginTop: "60px" }}
              /> */}
            </div>
          )}

          <Modal
            title={t("logout_confirmation")}
            visible={logoutModalVisible}
            onOk={confirmLogout}
            onCancel={cancelLogout}
            cancelButtonProps={{ style: { color: "red" } }}
          >
            <p>{t("logout_message")}</p>
          </Modal>

          {/* Uncomment if you want to add language selection */}
          {/* <Select
            defaultValue="en"
            style={{ width: 120 }}
            onChange={changeLanguage}
            placeholder="Select a Language"
            options={[
              { value: "en", label: "English" },
              { value: "jp", label: "日本語" },
              { value: "fr", label: "Français" },
              { value: "es", label: "Español" },
            ]}
          /> */}
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
