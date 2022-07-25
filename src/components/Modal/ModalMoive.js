import { CloseOutlined } from "@ant-design/icons";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IS_SHOWING } from "../../redux/types/ModalType";
import "./ModalMovie.css";
export default function ModalMovie() {
  const { isShowing, trailerUrl } = useSelector((state) => state.ShowModalReducer);
  const dispatch = useDispatch();

  return (
    <Fragment>
      {isShowing ? (
        <div
          className="modal-movie"
          onClick={() => {
            dispatch({ type: IS_SHOWING, payload: "" });
          }}
        >
          <div className="modal-video-body">
            <div className="modal-video-inner">
              <div className="modal-video-movie-wrap">
                <button className="modal-close-button">
                  <span className="text-white">
                    <CloseOutlined className="text-3xl " />
                  </span>
                </button>
                <iframe src={`${trailerUrl}`} frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen tabIndex={-1} __idm_id__={16385} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
