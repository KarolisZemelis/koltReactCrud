import { useEffect, useState } from "react";

export default function Delete({ deleteData, setDeleteData, handleDelete }) {
  const handleClose = () => {
    setDeleteData(null);
  };
  function getDateDifference(dateString1, dateString2) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      return "Nenaudotas";
    }

    const timeDifferenceMs = Math.abs(date1.getTime() - date2.getTime()); // Absolute difference
    const timeDifferenceDays = Math.ceil(
      timeDifferenceMs / (1000 * 60 * 60 * 24)
    );
    if (timeDifferenceDays === 1) {
      return <>{timeDifferenceDays} dieną</>;
    } else if (timeDifferenceDays >= 2 && timeDifferenceDays <= 10) {
      return <>{timeDifferenceDays} dienas</>;
    } else if (timeDifferenceDays >= 11) {
      return <>{timeDifferenceDays} dienų</>;
    }
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Pašalinti paspirtuką iš sistemos</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3 delete-message">
              <p>
                Ar tikrai norite ištrinti paspirtuką:
                <b>{deleteData.registrationCode}</b> ?
              </p>
              <p>
                Rida: <b>{deleteData.totalRideKilometers}</b> km
              </p>
              <p>
                Paskutinį kartą naudotas prieš:{" "}
                <b>
                  {deleteData.lastUseTime !== 0
                    ? getDateDifference(
                        new Date().toISOString().split("T")[0],
                        deleteData.lastUseTime
                      )
                    : "Nenaudotas"}
                </b>
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="blue" onClick={handleClose}>
              Uždaryti
            </button>
            <button
              type="button"
              className="danger"
              onClick={(_) => handleDelete(deleteData.id)}
            >
              Ištrinti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
