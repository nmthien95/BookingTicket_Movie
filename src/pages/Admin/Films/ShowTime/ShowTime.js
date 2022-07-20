import { Button, Cascader, Form, InputNumber, Select } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import { quanLyRapService } from "../../../../services/QuanLyRapService";
import { useFormik } from "formik";
import moment from "moment";
import { quanLyDatVeService } from "../../../../services/QuanLyDatVeService";
import { history } from "../../../../App";

const ShowTime = (props) => {
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      let result = await quanLyRapService.layThongTinHeThongthongRap();
      setState({
        ...state,
        heThongRapChieu: result.data.content,
      });
    } catch (errors) {
      console.log("error", errors.response?.data);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      console.log("values: ", values);
      try {
        const result = await quanLyDatVeService.taoLichChieu(values);
        alert(result.data.content);
        history.push("/");
      } catch (errros) {
        console.log("error", errros.response?.data);
      }
    },
  });
  const handleChangeHeThongRap = async (value) => {
    // từ hệ thống rạp call api lấy thông tin rạp
    console.log(value);
    try {
      let result = await quanLyRapService.layThongTinCumRap(value);
      setState({
        ...state,
        cumRapChieu: result.data.content,
      });
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };
  const onOk = (values) => {
    formik.setFieldValue("ngayChieuGioChieu", moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };
  const onChangeDate = (values) => {
    formik.setFieldValue("ngayChieuGioChieu", moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };
  const onChangeInputNumber = (values) => {
    formik.setFieldValue("giaVe", values * 1);
  };
  const convertSelectHTR = () => {
    return state.heThongRapChieu?.map((htr, index) => ({
      label: htr.tenHeThongRap,
      value: htr.maHeThongRap,
    }));
  };
  const convertSelectCumRap = () => {
    return state.cumRapChieu?.map((cumRap, index) => ({
      label: cumRap.tenCumRap,
      value: cumRap.maCumRap,
    }));
  };
  let film = {};
  if (localStorage.getItem("filmParams")) {
    film = JSON.parse(localStorage.getItem("filmParams"));
  }
  return (
    <Fragment>
      <h3 className="text-theme  text-3xl mb-8">Tạo lịch chiếu - {props.match.params.tenPhim}</h3>
      <div className="flex ">
        <div className="basis-1/4 px-10">
          <img src={film.hinhAnh} className="w-full" alt="sdf" />
        </div>
        <div className="basis-3/4">
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 10,
            }}
            initialValues={{
              remember: true,
            }}
            onSubmitCapture={formik.handleSubmit}
          >
            <Form.Item label="Hệ thống rạp">
              <Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Vui lòng chọn hệ thống rạp" />
            </Form.Item>
            <Form.Item label="Cụm rạp">
              <Select options={convertSelectCumRap()} onChange={handleChangeCumRap} placeholder="Vui lòng chọn cụm rạp" />
            </Form.Item>
            <Form.Item label="Ngày chiếu giờ chiếu">
              <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />
            </Form.Item>
            <Form.Item label="Giá vé">
              <InputNumber min={75000} max={150000} onChange={onChangeInputNumber} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Tạo lịch chiếu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default ShowTime;
