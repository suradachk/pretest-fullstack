import react, { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import { Table, Input } from "antd";

const { Content } = Layout;

const baseColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
];

const covertArray = async (arr) => {
  const key = "name";
  let obj = [];
  arr.forEach(function (val) {
    obj.push({ [key]: val });
  });
  return obj;
};

function App() {
  const [filterTable, setFilterTable] = useState(null);
  const [baseData, setBaseData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios("https://api.publicapis.org/categories");
      const objData = await covertArray(response.data.categories);
      setBaseData(objData);
    };
    getData();
  }, []);

  const search = (event) => {
    const filterTables = baseData.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(event.target.value.toLowerCase())
      )
    );

    setFilterTable(filterTables);
  };

  return (
    <>
      <Content style={{ padding: "0 50px", margin: "4em auto" }}>
        <Input placeholder="Search by..." onKeyUp={search} />
        <Table
          columns={baseColumns}
          dataSource={filterTable == null ? baseData : filterTable}
        />
      </Content>
    </>
  );
}

export default App;
