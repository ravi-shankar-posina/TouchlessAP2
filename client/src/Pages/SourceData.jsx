import React, { useEffect, useRef, useState } from "react";

import Layout from "../components/Layout";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
const SourceData = () => {
  const [currentTable, setCurrentTable] = useState("PO Header");
  const [dateString, setDateString] = useState(getFormattedDate());
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState({});
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedKeys(value ? [value] : []);
            if (!value) {
              handleReset(clearFilters);
            }
          }}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (!visible) {
        setSearchText(""); // Reset the search text when dropdown closes
        setSearchedColumn(null); // Optionally reset the searched column
      } else {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const dataSourcePOHeader = [
    {
      poNumber: "3165378098",
      item: 1,
      material: "3BSE078762R1",
      qty: 2,
      price: 78.29,
      amount: 156.58,
    },
    {
      poNumber: "3165378098",
      item: 2,
      material: "3BSE070093R1",
      qty: 10,
      price: 84.35,
      amount: 843.5,
    },
    {
      poNumber: "3165378098",
      item: 3,
      material: "3BSE070124R1",
      qty: 7,
      price: 82.25,
      amount: 575.75,
    },
    {
      poNumber: "3165378098",
      item: 4,
      material: "3BSE070125R1",
      qty: 7,
      price: 54.3,
      amount: 380.1,
    },
    {
      poNumber: "3165378098",
      item: 5,
      material: "3BSE070126R1",
      qty: 3,
      price: 66.88,
      amount: 200.64,
    },
    {
      poNumber: "3165378098",
      item: 6,
      material: "3BSE070127R1",
      qty: 10,
      price: 66.88,
      amount: 668.8,
    },
    {
      poNumber: "3165378098",
      item: 7,
      material: "3BSE070134R1",
      qty: 5,
      price: 84.35,
      amount: 421.75,
    },
    {
      poNumber: "3165378098",
      item: 8,
      material: "3BSE070135R1",
      qty: 2,
      price: 82.25,
      amount: 164.5,
    },
    {
      poNumber: "3165378098",
      item: 9,
      material: "3BSE070142R1",
      qty: 5,
      price: 82.25,
      amount: 411.25,
    },
    {
      poNumber: "3165378098",
      item: 10,
      material: "3BSE070214-EN",
      qty: 5,
      price: 54.3,
      amount: 271.5,
    },
    {
      poNumber: "3165378098",
      item: 11,
      material: "3BSE070544",
      qty: 5,
      price: 66.88,
      amount: 334.4,
    },
    {
      poNumber: "3165378098",
      item: 12,
      material: "1SDX082281R1",
      qty: 5,
      price: 2528.45,
      amount: 12642.25,
    },
    {
      poNumber: "3165378098",
      item: 13,
      material: "5MTH001578",
      qty: 5,
      price: 31360,
      amount: 156800.0,
    },
    {
      poNumber: "3165378098",
      item: 14,
      material: "1SDA071381R1",
      qty: 15,
      price: 1035.77,
      amount: 15536.55,
    },
    {
      poNumber: "3165378098",
      item: 15,
      material: "1SDA073881R1",
      qty: 10,
      price: 1035.77,
      amount: 10357.7,
    },
    {
      poNumber: "3165378098",
      item: 16,
      material: "1SBL911074R8010",
      qty: 8,
      price: 36.99,
      amount: 295.92,
    },
    {
      poNumber: "3165378098",
      item: 17,
      material: "1SBL921074R8010",
      qty: 9,
      price: 5.82,
      amount: 52.38,
    },
    {
      poNumber: "3165378098",
      item: 18,
      material: "1SBL931074R8010",
      qty: 3,
      price: 7.73,
      amount: 23.19,
    },
    {
      poNumber: "3165378098",
      item: 19,
      material: "1SBL351074R8011",
      qty: 4,
      price: 10.85,
      amount: 43.4,
    },
    {
      poNumber: "3165378098",
      item: 20,
      material: "3BYN33423297-014",
      qty: 5,
      price: 26.96,
      amount: 134.8,
    },
    {
      poNumber: "3165378098",
      item: 21,
      material: "3BYN33423297-015",
      qty: 11,
      price: 10836,
      amount: 119196.0,
    },
    {
      poNumber: "3165378098",
      item: 22,
      material: "3BSE070214-EN",
      qty: 5,
      price: 112.34,
      amount: 561.7,
    },
    {
      poNumber: "3165378098",
      item: 23,
      material: "3BSE070544",
      qty: 5,
      price: 101.1,
      amount: 505.5,
    },
    {
      poNumber: "3165378198",
      item: 1,
      material: "3BSE078762R1",
      qty: 1,
      price: 78.29,
      amount: 78.29,
    },
    {
      poNumber: "3165378198",
      item: 2,
      material: "3BSE070093R1",
      qty: 5,
      price: 84.35,
      amount: 421.75,
    },
    {
      poNumber: "3165378198",
      item: 3,
      material: "3BSE070124R1",
      qty: 5,
      price: 82.25,
      amount: 411.25,
    },
    {
      poNumber: "3165378198",
      item: 4,
      material: "3BSE070125R1",
      qty: 5,
      price: 54.3,
      amount: 271.5,
    },
    {
      poNumber: "3165378198",
      item: 5,
      material: "3BSE070126R1",
      qty: 5,
      price: 66.88,
      amount: 334.4,
    },
    {
      poNumber: "3165378198",
      item: 6,
      material: "3BSE070127R1",
      qty: 5,
      price: 66.88,
      amount: 334.4,
    },
    {
      poNumber: "3165378198",
      item: 7,
      material: "3BSE070134R1",
      qty: 5,
      price: 84.35,
      amount: 421.75,
    },
    {
      poNumber: "3165378198",
      item: 8,
      material: "3BSE070135R1",
      qty: 5,
      price: 82.25,
      amount: 411.25,
    },
    {
      poNumber: "3165378198",
      item: 9,
      material: "3BSE070142R1",
      qty: 5,
      price: 82.25,
      amount: 411.25,
    },
    {
      poNumber: "3165378198",
      item: 10,
      material: "3BSE070214-EN",
      qty: 5,
      price: 54.3,
      amount: 271.5,
    },
    {
      poNumber: "3165378198",
      item: 11,
      material: "3BSE070544",
      qty: 5,
      price: 66.88,
      amount: 334.4,
    },
    {
      poNumber: "3165378198",
      item: 12,
      material: "1SDX082281R1",
      qty: 5,
      price: 2528.45,
      amount: 12642.25,
    },
    {
      poNumber: "3165378198",
      item: 13,
      material: "5MTH001578",
      qty: 5,
      price: 31360,
      amount: 156800.0,
    },
    {
      poNumber: "3165378198",
      item: 14,
      material: "1SDA071381R1",
      qty: 5,
      price: 1035.77,
      amount: 5178.85,
    },
    {
      poNumber: "3165378198",
      item: 15,
      material: "1SDA073881R1",
      qty: 5,
      price: 1035.77,
      amount: 5178.85,
    },
    {
      poNumber: "3165378198",
      item: 16,
      material: "1SBL911074R8010",
      qty: 20,
      price: 36.99,
      amount: 184.95,
    },
    {
      poNumber: "3165378198",
      item: 17,
      material: "1SBL921074R8010",
      qty: 15,
      price: 5.82,
      amount: 116.4,
    },
    {
      poNumber: "3165378198",
      item: 18,
      material: "1SBL931074R8010",
      qty: 15,
      price: 7.73,
      amount: 115.95,
    },
    {
      poNumber: "3165378198",
      item: 19,
      material: "1SBL351074R8011",
      qty: 10,
      price: 10.85,
      amount: 162.75,
    },
    {
      poNumber: "3165378198",
      item: 20,
      material: "3BYN33423297-014",
      qty: 13,
      price: 26.96,
      amount: 269.6,
    },
    {
      poNumber: "3165378198",
      item: 21,
      material: "3BYN33423297-015",
      qty: 10,
      price: 10836,
      amount: 140868.0,
    },
    {
      poNumber: "3165378198",
      item: 22,
      material: "3BSE070214-EN",
      qty: 10,
      price: 112.34,
      amount: 1123.4,
    },
    {
      poNumber: "3165378198",
      item: 23,
      material: "3BSE070544",
      qty: 10,
      price: 101.1,
      amount: 1011.0,
    },
    {
      poNumber: "3165378918",
      item: 1,
      material: "3BSE078762R1",
      qty: 1,
      price: 78.29,
      amount: 78.29,
    },
    {
      poNumber: "3165378918",
      item: 2,
      material: "3BYN33423297-015",
      qty: 13,
      price: 10836,
      amount: 140868.0,
    },
    {
      poNumber: "3165378918",
      item: 3,
      material: "3BSE070093R1",
      qty: 5,
      price: 84.35,
      amount: 421.75,
    },
    {
      poNumber: "3165378918",
      item: 4,
      material: "3BSE078762R1",
      qty: 5,
      price: 78.29,
      amount: 391.45,
    },
    {
      poNumber: "3165378918",
      item: 5,
      material: "1SDA073881R1",
      qty: 15,
      price: 1035.77,
      amount: 5178.85,
    },
    {
      poNumber: "3165378918",
      item: 6,
      material: "3BSE070134R1",
      qty: 10,
      price: 78.1,
      amount: 1711.5,
    },
    {
      poNumber: "3165378918",
      item: 7,
      material: "3BSE070135R1",
      qty: 13,
      price: 87.88,
      amount: 878.8,
    },
    {
      poNumber: "3165378918",
      item: 8,
      material: "3BSE070142R1",
      qty: 10,
      price: 33.0,
      amount: 429.0,
    },
    {
      poNumber: "3165378918",
      item: 9,
      material: "3BSE070214-EN",
      qty: 5,
      price: 112.34,
      amount: 561.7,
    },
    {
      poNumber: "3165378918",
      item: 10,
      material: "3BSE070544",
      qty: 5,
      price: 101.1,
      amount: 505.5,
    },
    {
      poNumber: "3165378981",
      item: 1,
      material: "3BSE070124R1",
      qty: 5,
      price: 82.25,
      amount: 411.25,
    },
    {
      poNumber: "3165378981",
      item: 2,
      material: "3BSE070125R1",
      qty: 5,
      price: 54.3,
      amount: 271.5,
    },
    {
      poNumber: "3165378981",
      item: 3,
      material: "3BSE070126R1",
      qty: 5,
      price: 66.88,
      amount: 334.4,
    },
    {
      poNumber: "3165378981",
      item: 4,
      material: "1SBL921074R8010",
      qty: 20,
      price: 5.82,
      amount: 116.4,
    },
    {
      poNumber: "3165378981",
      item: 5,
      material: "3BSE070124R1",
      qty: 5,
      price: 82.25,
      amount: 411.25,
    },
    {
      poNumber: "3165378981",
      item: 6,
      material: "1SBL931074R8010",
      qty: 5,
      price: 7.73,
      amount: 115.95,
    },
    {
      poNumber: "3165378981",
      item: 7,
      material: "3BSE070125R1",
      qty: 5,
      price: 54.3,
      amount: 271.5,
    },
    {
      poNumber: "3165378981",
      item: 8,
      material: "3BSE070126R1",
      qty: 5,
      price: 66.88,
      amount: 334.4,
    },
    {
      poNumber: "3165378981",
      item: 9,
      material: "3BYN33423297-014",
      qty: 15,
      price: 26.96,
      amount: 269.6,
    },
    {
      poNumber: "3165378981",
      item: 10,
      material: "3BYN33423297-015",
      qty: 10,
      price: 10836,
      amount: 140868.0,
    },
    {
      poNumber: "3165378981",
      item: 11,
      material: "3BSE070214-EN",
      qty: 15,
      price: 112.34,
      amount: 1123.4,
    },
    {
      poNumber: "3165378981",
      item: 12,
      material: "3BSE070544",
      qty: 10,
      price: 101.1,
      amount: 1011.0,
    },
    {
      poNumber: "3165378981",
      item: 13,
      material: "3BSE070127R1",
      qty: 13,
      price: 73.2,
      amount: 951.6,
    },
  ];

  const columnsPOLines = [
    {
      dataIndex: "poNumber",
      key: "poNumber",
      title: "PO Number",
      ...getColumnSearchProps("poNumber"),
    },
    {
      dataIndex: "item",
      key: "item",
      title: "Item",
      ...getColumnSearchProps("item"),
    },
    {
      dataIndex: "material",
      key: "material",
      title: "Material",
      ...getColumnSearchProps("material"),
    },
    {
      dataIndex: "qty",
      key: "qty",
      title: "Quantity",
      ...getColumnSearchProps("qty"),
    },
    {
      dataIndex: "price",
      key: "price",
      title: "Price",
      ...getColumnSearchProps("price"),
    },
    {
      dataIndex: "amount",
      key: "amount",
      title: "Amount",
      ...getColumnSearchProps("amount"),
    },
  ];

  const dataSourceGR = [
    {
      poNumber: "3165378098",
      Item: 1,
      Material: "3BSE078762R1",
      qty: 2,
    },
    {
      poNumber: "3165378098",
      Item: 2,
      Material: "3BSE070093R1",
      qty: 10,
    },
    {
      poNumber: "3165378098",
      Item: 3,
      Material: "3BSE070124R1",
      qty: 7,
    },
    {
      poNumber: "3165378098",
      Item: 4,
      Material: "3BSE070125R1",
      qty: 7,
    },
    {
      poNumber: "3165378098",
      Item: 5,
      Material: "3BSE070126R1",
      qty: 3,
    },
    {
      poNumber: "3165378098",
      Item: 6,
      Material: "3BSE070127R1",
      qty: 10,
    },
    {
      poNumber: "3165378098",
      Item: 7,
      Material: "3BSE070134R1",
      qty: 5,
    },
    {
      poNumber: "3165378098",
      Item: 8,
      Material: "3BSE070135R1",
      qty: 2,
    },
    {
      poNumber: "3165378098",
      Item: 9,
      Material: "3BSE070142R1",
      qty: 5,
    },
    {
      poNumber: "3165378098",
      Item: 10,
      Material: "3BSE070214-EN",
      qty: 5,
    },
    {
      poNumber: "3165378098",
      Item: 11,
      Material: "3BSE070544",
      qty: 5,
    },
    {
      poNumber: "3165378098",
      Item: 12,
      Material: "1SDX082281R1",
      qty: 5,
    },
    {
      poNumber: "3165378098",
      Item: 13,
      Material: "5MTH001578",
      qty: 5,
    },
    {
      poNumber: "3165378098",
      Item: 14,
      Material: "1SDA071381R1",
      qty: 15,
    },
    {
      poNumber: "3165378098",
      Item: 15,
      Material: "1SDA073881R1",
      qty: 10,
    },
    {
      poNumber: "3165378098",
      Item: 16,
      Material: "1SBL911074R8010",
      qty: 8,
    },
    {
      poNumber: "3165378098",
      Item: 17,
      Material: "1SBL921074R8010",
      qty: 9,
    },
    {
      poNumber: "3165378098",
      Item: 18,
      Material: "1SBL931074R8010",
      qty: 3,
    },
    {
      poNumber: "3165378098",
      Item: 19,
      Material: "1SBL351074R8011",
      qty: 4,
    },
    {
      poNumber: "3165378098",
      Item: 20,
      Material: "3BYN33423297-014",
      qty: 5,
    },
    {
      poNumber: "3165378098",
      Item: 21,
      Material: "3BYN33423297-015",
      qty: 11,
    },
    {
      poNumber: "3165378098",
      Item: 22,
      Material: "3BSE070214-EN",
      qty: 5,
    },
    {
      poNumber: "3165378098",
      Item: 23,
      Material: "3BSE070544",
      qty: 5,
    },
    {
      poNumber: "3165378198",
      Item: 1,
      Material: "3BSE078762R1",
      qty: 1,
    },
    {
      poNumber: "3165378198",
      Item: 2,
      Material: "3BSE070093R1",
      qty: 5,
    },
    {
      poNumber: "3165378198",
      Item: 3,
      Material: "3BSE070124R1",
      qty: 5,
    },
    {
      poNumber: "3165378198",
      Item: 4,
      Material: "3BSE070125R1",
      qty: 5,
    },
    {
      poNumber: "3165378198",
      Item: 5,
      Material: "3BSE070126R1",
      qty: 5,
    },
    {
      poNumber: "3165378198",
      Item: 6,
      Material: "3BSE070127R1",
      qty: 5,
    },
    {
      poNumber: "3165378198",
      Item: 7,
      Material: "3BSE070134R1",
      qty: 5,
    },
    {
      poNumber: "3165378198",
      Item: 8,
      Material: "3BSE070135R1",
      qty: 5,
    },
    {
      poNumber: "3165378198",
      Item: 9,
      Material: "3BSE070142R1",
      qty: 5,
    },
    {
      poNumber: "3165378198",
      Item: 10,
      Material: "3BSE070214-EN",
      qty: 5,
    },
    {
      poNumber: "3165378198",
      Item: 11,
      Material: "3BSE070544",
      qty: 5,
    },
    {
      poNumber: "3165378198",
      Item: 12,
      Material: "1SDX082281R1",
      qty: 5,
    },
    {
      poNumber: "3165378198",
      Item: 13,
      Material: "5MTH001578",
      qty: 20,
    },
    {
      poNumber: "3165378198",
      Item: 14,
      Material: "1SDA071381R1",
      qty: 15,
    },
    {
      poNumber: "3165378198",
      Item: 15,
      Material: "1SDA073881R1",
      qty: 15,
    },
    {
      poNumber: "3165378198",
      Item: 16,
      Material: "1SBL911074R8010",
      qty: 10,
    },
    {
      poNumber: "3165378198",
      Item: 17,
      Material: "1SBL921074R8010",
      qty: 13,
    },
    {
      poNumber: "3165378198",
      Item: 18,
      Material: "1SBL931074R8010",
      qty: 10,
    },
    {
      poNumber: "3165378198",
      Item: 19,
      Material: "1SBL351074R8011",
      qty: 13,
    },
    {
      poNumber: "3165378198",
      Item: 20,
      Material: "3BYN33423297-014",
      qty: 10,
    },
    {
      poNumber: "3165378198",
      Item: 21,
      Material: "3BYN33423297-015",
      qty: 13,
    },
    {
      poNumber: "3165378198",
      Item: 22,
      Material: "3BSE070214-EN",
      qty: 10,
    },
    {
      poNumber: "3165378198",
      Item: 23,
      Material: "3BSE070544",
      qty: 10,
    },
    {
      poNumber: "3165378918",
      Item: 1,
      Material: "3BSE078762R1",
      qty: 1,
    },
    {
      poNumber: "3165378918",
      Item: 2,
      Material: "3BSE070093R1",
      qty: 5,
    },
    {
      poNumber: "3165378918",
      Item: 3,
      Material: "3BSE070124R1",
      qty: 5,
    },
    {
      poNumber: "3165378918",
      Item: 4,
      Material: "3BSE070125R1",
      qty: 5,
    },
    {
      poNumber: "3165378918",
      Item: 5,
      Material: "3BSE070126R1",
      qty: 15,
    },
    {
      poNumber: "3165378918",
      Item: 6,
      Material: "1SBL921074R8010",
      qty: 10,
    },
    {
      poNumber: "3165378918",
      Item: 7,
      Material: "3BSE070124R1",
      qty: 13,
    },
    {
      poNumber: "3165378918",
      Item: 8,
      Material: "1SBL931074R8010",
      qty: 10,
    },
    {
      poNumber: "3165378918",
      Item: 9,
      Material: "3BSE070125R1",
      qty: 10,
    },
    {
      poNumber: "3165378918",
      Item: 10,
      Material: "3BSE070126R1",
      qty: 5,
    },
    {
      poNumber: "3165378918",
      Item: 11,
      Material: "3BYN33423297-014",
      qty: 20,
    },
    {
      poNumber: "3165378918",
      Item: 12,
      Material: "3BYN33423297-015",
      qty: 5,
    },
    {
      poNumber: "3165378918",
      Item: 13,
      Material: "3BSE070214-EN",
      qty: 5,
    },
    {
      poNumber: "3165378918",
      Item: 14,
      Material: "3BSE070544",
      qty: 20,
    },
    {
      poNumber: "3165378981",
      Item: 1,
      Material: "3BSE070124R1",
      qty: 5,
    },
    {
      poNumber: "3165378981",
      Item: 2,
      Material: "3BSE070125R1",
      qty: 20,
    },
    {
      poNumber: "3165378981",
      Item: 3,
      Material: "3BSE070126R1",
      qty: 5,
    },
    {
      poNumber: "3165378981",
      Item: 4,
      Material: "1SBL921074R8010",
      qty: 5,
    },
    {
      poNumber: "3165378981",
      Item: 5,
      Material: "3BSE070124R1",
      qty: 5,
    },
    {
      poNumber: "3165378981",
      Item: 6,
      Material: "1SBL931074R8010",
      qty: 5,
    },
    {
      poNumber: "3165378981",
      Item: 7,
      Material: "3BSE070125R1",
      qty: 5,
    },
    {
      poNumber: "3165378981",
      Item: 8,
      Material: "3BSE070126R1",
      qty: 5,
    },
    {
      poNumber: "3165378981",
      Item: 9,
      Material: "3BYN33423297-014",
      qty: 5,
    },
    {
      poNumber: "3165378981",
      Item: 10,
      Material: "3BYN33423297-015",
      qty: 5,
    },
    {
      poNumber: "3165378981",
      Item: 11,
      Material: "3BSE070214-EN",
      qty: 10,
    },
    {
      poNumber: "3165378981",
      Item: 12,
      Material: "3BSE070544",
      qty: 13,
    },
  ];

  const columnsGR = [
    {
      dataIndex: "poNumber",
      key: "poNumber",
      title: "PO Number",
    },
    {
      dataIndex: "Item",
      key: "Item",
      title: "Item",
    },
    {
      dataIndex: "Material",
      key: "Material",
      title: "Material",
    },
    {
      dataIndex: "qty",
      key: "qty",
      title: "Quantity",
    },
  ];
  const handleButtonClick = (tableName) => {
    setCurrentTable(tableName);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDateString(getFormattedDate());
    }, 1000); // Update dateString every second (1000 milliseconds)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []); // Empty dependency array ensures effect runs only on mount and unmount

  function getFormattedDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
  }
  return (
    <Layout>
      <div style={{}}>
        <div style={{ padding: 10 }}>
          <Button
            // type={currentTable === "PO Header" ? "primary" : "default"}
            onClick={() => handleButtonClick("PO Header")}
            style={{ marginRight: "10px" }}
          >
            PO Header
          </Button>
          {/* <Button
            type={currentTable === "PO Lines" ? "primary" : "default"}
            onClick={() => handleButtonClick("PO Lines")}
            style={{ marginRight: "10px" }}
          >
            PO Lines
          </Button> */}
          <Button
            // type={currentTable === "GR" ? "primary" : "default"}
            onClick={() => handleButtonClick("GR")}
            style={{ width: 100 }}
          >
            GR
          </Button>
        </div>
        <span
          style={{
            display: "flex",
            justifyContent: "start",
            fontWeight: "400",

            padding: 5,
          }}
        >
          Date: {dateString}
        </span>
        {currentTable === "PO Header" && (
          <div style={{ padding: 5 }}>
            <Table dataSource={dataSourcePOHeader} columns={columnsPOLines} />
          </div>
        )}
        {/* {currentTable === "PO Lines" && (
          <Table
            dataSource={dataSourcePOLines}
            columns={columnsPOLines}
            bordered
            pagination={false}
          />
        )} */}
        {currentTable === "GR" && (
          <Table dataSource={dataSourceGR} columns={columnsGR} />
        )}
      </div>
    </Layout>
  );
};

export default SourceData;
