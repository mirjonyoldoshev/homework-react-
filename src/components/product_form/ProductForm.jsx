import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Form, Input, InputNumber, Select, notification } from "antd";
import "./ProductsForm.css";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import { useSelector } from "react-redux";

const { TextArea } = Input;

const ProductForm = ({ setIsModalOpen, updateProduct, setUpdateProduct }) => {
  const authData = useSelector((state) => state);
  const [categoryData] = useFetch("/product/category");
  const [productTypeData] = useFetch("/product/product-type");
  const [productImages, setProductsImages] = useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const url = updateProduct
      ? `/product/update/${updateProduct._id}`
      : "/product/create";
    const method = updateProduct ? "PUT" : "POST";

    try {
      const response = await fetch("http://localhost:8000" + url, {
        method: method,
        headers: {
          Authorization: "Bearer " + authData.token,
        },
        body: createFormData(values),
      });

      if (response.ok) {
        const message = updateProduct ? "Mahsulot Updated" : "Mahsulot Created";
        notification.success({
          message: message,
          description:
            "Mahsulot has been " +
            (updateProduct ? "updated" : "created") +
            ".",
        });
        setIsModalOpen(false);
      }
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createFormData = (values) => {
    const form = new FormData();
    form.append("product_name", values.product_name);
    form.append("category", values.category[0]);
    form.append("product_type", values.product_type[0]);
    form.append("description", values.description);
    form.append("original_price", values.original_price);
    form.append("sale_price", values.sale_price);
    form.append("number_in_stock", values.number_in_stock);

    for (let i = 0; i < productImages.length; i++) {
      form.append("product_images", productImages[i]);
    }

    return form;
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        form={form}
        layout="horizontal"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 500,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Mahsulot"
          name="product_name"
          rules={[
            {
              required: true,
              message: "Iltimos enter Mahsulot nomini!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kategoriya"
          name="category"
          rules={[
            {
              required: true,
              message: "Iltimos enter Mahsulot kategoriyasini!",
            },
          ]}
        >
          <Select
            mode="tags"
            maxCount={1}
            style={{
              width: "100%",
            }}
            options={categoryData.payload?.map((category) => ({
              key: category,
              label: category,
              value: category,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Mahsulot Turi"
          name="product_type"
          rules={[
            {
              required: true,
              message: "Iltimos enter Mahsulot turini!",
            },
          ]}
        >
          <Select
            mode="tags"
            maxCount={1}
            style={{
              width: "100%",
            }}
            options={productTypeData.payload?.map((type) => ({
              key: type,
              label: type,
              value: type,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Asl Narxi"
          name="original_price"
          rules={[
            {
              required: true,
              message: "Iltimos enter asl narxini!",
            },
          ]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>
        <Form.Item
          label="Chegirmadagi Narxi"
          name="sale_price"
          rules={[
            {
              required: true,
              message: "Iltimos enter sale price!",
            },
          ]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>
        <Form.Item
          label="Mavjud"
          name="number_in_stock"
          rules={[
            {
              required: true,
              message: "Iltimos enter ombordagi!",
            },
          ]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>
        <Form.Item
          label="Tavsif"
          name="description"
          rules={[
            {
              required: true,
              message: "Iltimos enter tavsif!",
            },
          ]}
        >
          <TextArea rows={4} style={{ resize: "none" }} />
        </Form.Item>

        <Form.Item
          label="Mahsulot Rasmlari"
          name="product_images"
          rules={[
            {
              required: true,
              message: "Iltimos enter Mahsulot rasmlarini!",
            },
          ]}
        >
          <div className="file_content">
            <div className="file_box flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-400 py-4">
              <p className="flex w-full items-center justify-center text-3xl text-sky-500">
                <AiOutlineCloudUpload />
              </p>
              <p className="text-xl">Bosing yoki rasmni surib keling</p>
              <p className="text-center text-[12px] leading-normal text-gray-400">
                PNG, JPG, JPEG, GIF , WEBP, MP4
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/jpeg,image/webp,image/png,image/jpg,video/mp4"
              name="file"
              className="input_file"
              onChange={(e) => setProductsImages(e.target.files)}
            />
          </div>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <div className="flex w-full items-center justify-center">
            <Button type="primary" htmlType="submit">
              <AiOutlinePlus />
              Mahsulot Qo'shish
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
