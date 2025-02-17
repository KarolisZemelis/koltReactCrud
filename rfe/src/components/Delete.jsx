import { useEffect, useState } from "react";

export default function Edit() {
  const handleClose = () => {};
  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label"></label>
              <input type="range" name="" className="" />
            </div>
            <button className="blue">+</button>
          </div>
          <div className="modal-footer">
            <button type="button" className="blue">
              Close
            </button>
            <button type="button" className="green">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
