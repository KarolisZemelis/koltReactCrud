import { useEffect, useState } from "react";

export default function Edit({ editData, setEditData, setUpdateData }) {
  console.log("edit", editData);
  const handleClose = () => {
    setEditData(null);
  };
  const handleUpdate = (e) => {
    const { name, type, checked, value } = e.target;

    setEditData((prevEditData) => ({
      ...prevEditData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value, // Update editData directly
    }));

    setUpdateData((prevUpdateData) => ({
      ...prevUpdateData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value, // Update updateData
    }));
  };

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Atnaujinti paspirtuką : {editData.registrationCode}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              Registracijos kodas: <b>{editData.registrationCode}</b>{" "}
            </div>
            <div className="mb-3">
              Paspirtuko id: <b>{editData.id}</b>{" "}
            </div>
            <div className="mb-3">
              <div className="mb-3">
                Paspirtuko užimtumas:{" "}
                <b>{editData.isBusy === 1 ? "Užimtas" : "Laisvas"}</b>
              </div>
              Rezervuoti:{" "}
              <input
                type="checkbox"
                name="isBusy"
                checked={Boolean(editData.isBusy)}
                onChange={handleUpdate}
              />
              <div className="mb-3"></div>
            </div>
            <div className="mb-3">
              <label className="form-label"></label>
              <input type="range" name="" className="" />
            </div>
            <button className="blue">+</button>
          </div>
          <div className="modal-footer">
            <button type="button" className="red" onClick={handleClose}>
              Atšaukti
            </button>
            <button type="button" className="green">
              Išsaugoti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
