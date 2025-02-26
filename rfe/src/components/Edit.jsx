import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Edit({
  editData,
  setEditData,
  updateData,
  setUpdateData,
  scooters,
  handleSaveUpdate,
}) {
  const [todaysDate, setTodaysDate] = useState("");
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
          <form action="">
            <div className="modal-body">
              <div className="mb-3">
                Registracijos kodas: <b>{editData.registrationCode}</b>
              </div>
              <div className="mb-3">
                Paspirtuko id: <b>{editData.id}</b>
              </div>
              <div className="mb-3">
                <div className="mb-3">
                  Paspirtuko užimtumas:
                  <b> {editData.isBusy === 1 ? "Užimtas" : "Laisvas"}</b>
                </div>
                Rezervuoti:
                <input
                  type="checkbox"
                  name="isBusy"
                  checked={Boolean(editData.isBusy)}
                  onChange={handleSaveUpdate}
                />
                <div className="mb-3"></div>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Nuvažiuoti kilometrai:
                  <b>
                    {" "}
                    {
                      scooters.filter(
                        (scooter) =>
                          scooter.registrationCode === editData.registrationCode
                      )[0].totalRideKilometers
                    }
                    km
                  </b>
                </label>
              </div>
              <div className="mb-3">
                <label className="form-label">Pridėti prie ridos:</label>
                <input
                  type="number"
                  name="totalRideKilometers"
                  onChange={handleUpdate}
                />
                <span> km</span>
              </div>
              <div className="mb-3">
                <label className="form-label">Paskutinė panaudojimo data</label>
                <input
                  type="date"
                  name="lastUseTime"
                  onChange={handleUpdate}
                  required
                  value={
                    editData.lastUseTime === ""
                      ? todaysDate
                      : editData.lastUseTime
                  }
                />
                <button
                  className="green"
                  type="button"
                  onClick={() => {
                    const newDate = new Date().toISOString().split("T")[0];
                    setTodaysDate(newDate);
                    handleUpdate({
                      target: { name: "lastUseTime", value: newDate },
                    });
                  }}
                >
                  Šiandienos data
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="red" onClick={handleClose}>
                Atšaukti
              </button>
              <button
                type="button"
                className="green"
                onClick={(_) => handleSaveUpdate(editData.id)}
              >
                Išsaugoti
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
