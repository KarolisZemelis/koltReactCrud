import "./buttons.scss";
const getMinDateThisYear = () => {
  const today = new Date();
  const year = today.getFullYear();
  return `${year}-01-01`; // Format: YYYY-MM-DD
};
export default function Create({
  handleRegistrationCode,
  registrationCode,
  handleCreate,
  id,
  newScooter,
  setNewScooter,
}) {
  return (
    <div className="card col-2.5 create">
      <div className="card-header">
        <h5 className="card-title">Sukurti KOLT pasipirtuką</h5>
      </div>
      <div className="card-body">
        <div className="mb-3 registration">
          <p>
            Registracijos kodas: <b>{registrationCode}</b>
          </p>
          <button className="green" onClick={handleRegistrationCode}>
            Generuoti
          </button>
        </div>
        <div className="mb-3">
          {" "}
          <p>
            ID: <b>{id.current}</b>
          </p>
        </div>
        <div className="mb-3">
          <label className="form-label">Nuvažiuoti kilometrai:</label>
          <b>
            {newScooter.totalRideKilometers}
            km
          </b>
        </div>
        <div className="mb-3 totalRide">
          <label className="form-label">Pridėti prie ridos:</label>
          <input
            type="number"
            name="totalRideKilometers"
            min={0}
            value={newScooter.totalRideKilometers}
            onChange={(e) => {
              setNewScooter((prevData) => ({
                ...prevData,
                totalRideKilometers: Number(e.target.value),
              }));
            }}
          />
          <span> km</span>
        </div>
        <div className="mb-3 lastUse">
          <div className="lastUseDate-text">
            <div>
              <p>Paskutinė naudojimo data:</p>
            </div>
            <div>
              <b>
                {newScooter.lastUseTime ? newScooter.lastUseTime : "Nenaudotas"}
              </b>
            </div>
          </div>
          <div className="addDate">
            <div>
              <label className="form-label">Panaudojimo data: </label>
              <input
                type="date"
                name="lastUseTime"
                onChange={(e) =>
                  setNewScooter((prevData) => ({
                    ...prevData,
                    lastUseTime: e.target.value,
                  }))
                }
                value={newScooter.lastUseTime}
                min={getMinDateThisYear()}
                max={(() => {
                  const now = new Date();
                  const year = now.getFullYear();
                  const month = String(now.getMonth() + 1).padStart(2, "0");
                  const day = String(now.getDate()).padStart(2, "0");
                  return `${year}-${month}-${day}`;
                })()}
              />
            </div>
            <div className="dateBtnContainer">
              <button
                className="green"
                type="button"
                onClick={() => {
                  const newDate = new Date().toISOString().split("T")[0];
                  setNewScooter((prevData) => ({
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
      <div className="card-footer create-footer">
        <button
          className="green"
          onClick={handleCreate}
          style={{
            ...(registrationCode === "xxxxxxxx"
              ? {
                  opacity: 0.5,
                  cursor: "not-allowed",
                  pointerEvents: "none",
                  backgroundColor: "#cccccc",
                  color: "#666666",
                }
              : {}),
          }}
        >
          Sukurti
        </button>
      </div>
    </div>
  );
}
