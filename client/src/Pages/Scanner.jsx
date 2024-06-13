// import React, { useState, useEffect } from "react";
// import { Table } from "antd";
// import Layout from "../components/Layout";

// const Process = () => {
//   const [myres, setMyres] = useState([]);


//   const columns = [
//     { title: "Key", dataIndex: "_id.key", key: "_id.key" },
//     { title: "Vendor Number", dataIndex: "_id.vendorNumber", key: "_id.vendorNumber" },
//     { title: "Name", dataIndex: "_id.Name", key: "_id.Name" },
//     { title: "PO Number", dataIndex: "_id.ponumber", key: "_id.ponumber" },
//     { title: "PO Line Item", dataIndex: "_id.poLineItem", key: "_id.poLineItem" },
//     { title: "PO Qty", dataIndex: "_id.poQty", key: "_id.poQty" },
//     { title: "Material Number", dataIndex: "_id.materialNumber", key: "_id.materialNumber" },
//     { title: "Amount", dataIndex: "_id.Amount", key: "_id.Amount" },
//     { title: "Tax", dataIndex: "_id.Tax", key: "_id.Tax" },
//     { title: "Total", dataIndex: "_id.Total", key: "_id.Total" }
    
//   ];

//   return (
//     <Layout>
//       <div style={{ width: "100%", padding: "10px" }}>
//         <Table
//           columns={columns}
//           dataSource={myres}
//           pagination={{ pageSize: 8 }}
//         />
//       </div>
//     </Layout>
//   );
// };

// export default Process;
