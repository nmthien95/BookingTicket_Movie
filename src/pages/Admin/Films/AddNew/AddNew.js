import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import Group from "antd/lib/input/Group";
import { useFormik } from "formik";
import { values } from "lodash";
import moment from "moment";
import React, { Fragment } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { themPhimUpLoadHinhAction } from "../../../../redux/action/QuanLyPhimAction";
import { GROUPID } from "../../../../util/settings/config";

const AddNew = () => {
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (values) => {
      //tạo đối tượng form data => Đưa giá trị values từ formik vào formData
      values.maNhom = GROUPID;
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            alert("Vui lòng chọn hình ảnh");
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      //Gọi api gửi các giá trị formdata về backend xử lý
      dispatch(themPhimUpLoadHinhAction(formData));
    },
  });
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState("");

  const handleChangeSwitch = (name) => {
    return (values) => {
      formik.setFieldValue(name, values);
    };
  };
  const handleChangeInputNumber = (name) => {
    return (values) => {
      formik.setFieldValue(name, values);
    };
  };
  const handleChangeFile = async (e) => {
    //Laasy file từ e
    let file = e.target.files[0];
    console.log("file: ", file);
    // image/png, image/jpeg, image/gif
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image / jpg"
    ) {
      // lưu vào formilk
      await formik.setFieldValue("hinhAnh", file);
      //tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        //load base 64 img

        setImgSrc(e.target.result); //Hifnh base 64
        console.log(imgSrc);
      };

      //   formik.setErrors()
    }
  };
  const handleChangeDatePicker = (values) => {
    let ngayKhoiChieu = moment(values);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  return (
    <Fragment>
      <h3 className="text-theme text-center text-bold text-3xl mb-10">
        Thêm Mới phim
      </h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: "default",
        }}
      >
        <Form.Item label="Tên Phim">
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            onChange={handleChangeFile}
            name="hinhAnh"
            type="file"
            accept="image/png, image/jpeg, image/gif,image/jpg"
          />
          <br />
          {imgSrc ? (
            <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
          ) : (
            ""
          )}
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            format={"DD/MM/YYYY"}
            values={moment(formik.values.ngayKhoiChieu)}
            onChange={handleChangeDatePicker}
          />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            min={1}
            max={10}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <div className="flex justify-center">
          <button
            type="submit"
            className="flex justify-center font-medium btn-theme p-2"
          >
            Thêm phim
          </button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AddNew;
