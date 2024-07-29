import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "../../api/axios";

const TableComponent = ({ tableFor }) => {
  let columns;

  const [data, setData] = useState();
  console.log(data);

  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  if (tableFor === "products") {
    columns = [
      {
        title: "T/r",
        key: "id",
        render: (text, record, index) =>
          tableParams.pagination.pageSize *
            (tableParams.pagination.current - 1) +
          (index + 1),
        width: "10%",
      },
      {
        title: "Mahsulot",
        dataIndex: "product_name",
        sorter: true,
        render: (name) => name,
        width: "20%",
      },
      {
        title: "Kategoriya",
        dataIndex: "category",
        sorter: true,
        render: (category) => category,
        width: "20%",
      },
      {
        title: "Sub Kategoriya",
        dataIndex: "product_type",
        sorter: true,
        width: "20%",
      },
      {
        title: "Asl Narxi",
        dataIndex: "original_price",
        sorter: true,
        width: "20%",
      },
      {
        title: "Chegirmadagi Narxi",
        dataIndex: "sale_price",
        sorter: true,
        width: "20%",
      },
      {
        title: "Omborda Mavjud",
        dataIndex: "number_in_stock",
        sorter: true,
        width: "20%",
      },
      {
        title: "Rasmi",
        dataIndex: "product_images",
        render: (images) => (
          <img
            src={images[0]}
            className="h-12 w-12 border-2 object-contain"
            alt="image"
          />
        ),
      },
    ];
  } else {
    columns = [
      {
        title: "T/r",
        key: "id",
        render: (text, record, index) =>
          tableParams.pagination.pageSize *
            (tableParams.pagination.current - 1) +
          (index + 1),
        width: "10%",
      },
      {
        title: "Foydalanuvchi",
        dataIndex: "first_name",
        sorter: true,
        render: (name) => name,
        width: "20%",
      },
      {
        title: "Username",
        dataIndex: "username",
        sorter: true,
        render: (category) => category,
        width: "20%",
      },
      {
        title: "Role",
        dataIndex: "role",
        sorter: true,
        width: "20%",
      },
      {
        title: "Ro'yxatdan o'tgan",
        dataIndex: "registeredAt",
        sorter: true,
        width: "20%",
      },
    ];
  }

  const getRandomProductParams = (params) => ({
    pageSize: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  const fetchData = () => {
    setLoading(true);
    if (tableFor === "products") {
      axios("product/all", {
        params: getRandomProductParams(tableParams),
      }).then((res) => {
        setData(res.data?.payload);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.data?.total,
          },
        });
      });
    } else {
      axios("admin/registered-users", {
        params: getRandomProductParams(tableParams),
      }).then((res) => {
        setData(res.data?.payload);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.data?.total,
          },
        });
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Table
      columns={columns}
      rowKey="_id"
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};
export default TableComponent;
