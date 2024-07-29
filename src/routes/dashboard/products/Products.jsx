import { AiOutlinePlus } from "react-icons/ai";
import React, { useState } from "react";
import { Modal, Button } from "antd";
import TableComponent from "../../../components/table/TableComponent";
import ProductForm from "../../../components/product_form/ProductForm";
const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1> </h1>
        <Button type="primary" onClick={showModal}>
          <AiOutlinePlus />
          Mahsulot Qo'shish
        </Button>
      </div>
      <TableComponent tableFor="products" />

      <Modal
        centered
        maskClosable={false}
        footer={null}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ProductForm setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
};

export default Products;
