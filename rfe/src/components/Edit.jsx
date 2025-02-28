export default function Edit({
  editData,
  setEditData,
  scooters,
  handleUpdate,
}) {
  const handleClose = () => {
    setEditData(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  const getMinDateThisYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    return `${year}-01-01`; // Format: YYYY-MM-DD
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
          <form onSubmit={onSubmit}>
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
                  checked={editData.isBusy}
                  onChange={(_) =>
                    setEditData((prevData) => ({
                      ...prevData,
                      isBusy: prevData.isBusy === 1 ? 0 : 1,
                    }))
                  }
                />
                <div className="mb-3"></div>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Nuvažiuoti kilometrai:
                  <b>
                    {scooters.filter(
                      (scooter) =>
                        scooter.registrationCode === editData.registrationCode
                    )[0].totalRideKilometers + editData.totalRideKilometers}
                    km
                  </b>
                </label>
              </div>
              <div className="mb-3">
                <label className="form-label">Pridėti prie ridos:</label>
                <input
                  type="number"
                  name="totalRideKilometers"
                  min={0}
                  value={editData.totalRideKilometers}
                  onChange={(e) => {
                    setEditData((prevData) => ({
                      ...prevData,
                      totalRideKilometers: Number(e.target.value),
                    }));
                  }}
                />
                <span> km</span>
              </div>
              <div className="mb-3">
                <div>
                  Paskutinė naudojimo data:
                  <b>
                    {scooters.filter(
                      (scooter) =>
                        scooter.registrationCode === editData.registrationCode
                    )[0].lastUseTime === 0
                      ? "Nenaudotas"
                      : editData.lastUseTime}
                  </b>
                </div>
                <div className="addDate">
                  <div>
                    <label className="form-label">Panaudojimo data: </label>
                    <input
                      type="date"
                      name="lastUseTime"
                      onChange={(e) =>
                        setEditData((prevData) => ({
                          ...prevData,
                          lastUseTime: e.target.value,
                        }))
                      }
                      required={editData.totalRideKilometers > 0}
                      value={editData.lastUseTime}
                      min={getMinDateThisYear()}
                    />
                  </div>
                  <div className="dateBtnContainer">
                    <button
                      className="green"
                      type="button"
                      onClick={() => {
                        const newDate = new Date().toISOString().split("T")[0];
                        setEditData((prevData) => ({
                          ...prevData,
                          lastUseTime: newDate,
                        }));
                      }}
                    >
                      Šiandienos data
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="danger" onClick={handleClose}>
                Atšaukti
              </button>
              <button type="submit" className="green">
                Išsaugoti
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
