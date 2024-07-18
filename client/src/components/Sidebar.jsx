import React, { useState, useEffect } from "react";
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
import { Layout, Menu, Modal, Select } from "antd";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;

const Sidebar = () => {
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
    navigate("/");
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false);
  };

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  const menuItems = [
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
      link: "/header",
    },
    {
      key: "4",
      icon: <DatabaseOutlined />,
      label: t("source_data"),
      link: "/sourcedata",
    },
    { key: "5", icon: <SettingOutlined />, label: t("settings"), link: "/" },
    {
      key: "6",
      icon: <LogoutOutlined />,
      label: t("logout"),
      onClick: handleLogout,
    },
  ];
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
                src={genpact_logo}
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
                src={genpact_logo}
                alt="Logo"
                style={{ width: "85px", height: "45px", marginTop: "40px" }}
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
                style={{ width: "130px", height: "75px", marginTop: "40px" }}
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
                style={{ width: "70px", height: "45px", marginTop: "50px" }}
              />
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
          {/* 
          <Select
            defaultValue="en"
            style={{ width: 120 }}
            onChange={changeLanguage}
            placeholder="Select a Language"
            options={[
              {
                value: "en",
                label: "English",
              },
              {
                value: "jp",
                label: "日本語",
              },
              {
                value: "fr",
                label: "Français",
              },
              {
                value: "es",
                label: "Español",
              },
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
