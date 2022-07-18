import { DatePicker, Form, Input, InputNumber, Switch } from "antd";

import { useFormik } from "formik";

import moment from "moment";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhapPhimUploadAction,
  themPhimUpLoadHinhAction,
} from "../../../../redux/action/QuanLyPhimAction";
import { layThongTinChiTietPhim } from "../../../../redux/action/QuanLyRapAction";
import { GROUPID } from "../../../../util/settings/config";

const Edit = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));
  }, []);
  const { filmDetail } = useSelector((state) => state.QuanLyPhimReducer);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: filmDetail.maPhim,
      tenPhim: filmDetail.tenPhim,
      trailer: filmDetail.trailer,
      moTa: filmDetail.moTa,
      ngayKhoiChieu: filmDetail.ngayKhoiChieu,
      dangChieu: filmDetail.dangChieu,
      sapChieu: filmDetail.sapChieu,
      hot: filmDetail.hot,
      danhGia: filmDetail.danhGia,
      hinhAnh: null,
      maNhom: GROUPID,
    },
    onSubmit: (values) => {
      console.log("values: ", values);
      //tạo đối tượng form data => Đưa giá trị values từ formik vào formData
      values.maNhom = GROUPID;
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      dispatch(capNhapPhimUploadAction(formData));
      //Gọi api gửi các giá trị formdata về backend xử lý
    },
  });

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
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  return (
    <Fragment>
      <h3 className="text-theme text-center text-bold text-3xl mb-10">
        Cập nhập phim
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
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
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
            onChange={handleChangeDatePicker}
            format="DD/MM/YYYY"
            value={moment(formik.values.ngayKhoiChieu)}
          />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            value={formik.values.danhGia}
            onChange={handleChangeInputNumber("danhGia")}
            min={1}
            max={10}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <div className="flex justify-center">
          <button
            type="submit"
            className="flex justify-center font-medium btn-theme p-2"
          >
            Cập nhập phim
          </button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Edit;
