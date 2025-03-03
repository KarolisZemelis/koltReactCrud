export default function List({
  scooters,
  handleEdit,
  handleDeleteMessage,
  handleSort,
}) {
  return (
    <div className="card col-8 list">
      <div className="card-header list-header">
        <h5 className="card-title">KOLT pasipirtukai</h5>
        <div className="sortContainer">
          <p>Rūšiuoti pagal:</p>
          <div className="sortBtnContainer">
            <button className="green" onClick={(_) => handleSort("km")}>
              Kilometrus
            </button>
            <button className="green" onClick={(_) => handleSort("data")}>
              Datą
            </button>
          </div>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {scooters === null || scooters.length < 1 ? (
          <p className="loading">Loading scooters</p>
        ) : (
          scooters.map((scooter) => (
            <li className="list-group-item" key={scooter.id}>
              <div className="card-header registrationCode">
                <div className="codeContainer">
                  <p>Registracijos kodas: </p>
                  <div>
                    <b>{scooter.registrationCode}</b>
                  </div>
                </div>
                <div className="codeContainer">
                  <p>ID: </p>
                  <div>
                    <b>{scooter.id}</b>
                  </div>
                </div>
              </div>
              <div className="scooterDetails">
                <div className="isBusy">
                  <p>Užimtumas:</p>
                  <div
                    className="availability"
                    style={{
                      backgroundColor:
                        scooter.isBusy === 1 ? "#e53e3e" : "#48bb78",
                    }}
                  ></div>
                </div>
                <div className="lastUseTime">
                  <p>Paskutinį kartą naudotas:</p>
                  <div>
                    <b>
                      {scooter.lastUseTime !== 0
                        ? scooter.lastUseTime
                        : "Nenaudotas"}
                    </b>
                  </div>
                </div>
                <div className="totalRideKilometers">
                  <p>Kilometražas:</p>
                  <div>
                    <b>{scooter.totalRideKilometers} km</b>
                  </div>
                </div>
                <div className="btnContainer">
                  <button
                    className="secondary"
                    onClick={(_) => handleEdit(scooter.id)}
                  >
                    Redaguoti
                  </button>
                  <button
                    className="danger"
                    onClick={(_) => handleDeleteMessage(scooter.id)}
                  >
                    Trinti
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
