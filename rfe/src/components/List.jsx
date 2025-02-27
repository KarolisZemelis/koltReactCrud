export default function List({
  scooters,
  handleEdit,
  handleDeleteMessage,
  handleSort,
}) {
  return (
    <div className="card col-7 list">
      <div className="card-header">
        <h5 className="card-title">KOLT pasipirtukai</h5>
        <div>
          <div>
            <p>Rūšiuoti pagal:</p>
          </div>
          <button className="blue" onClick={(_) => handleSort("km")}>
            KM
          </button>
          <button className="blue" onClick={(_) => handleSort("data")}>
            Paskutinę naudojimo datą
          </button>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {scooters === null || scooters.length < 1 ? (
          <p className="loading">Loading scooters</p>
        ) : (
          scooters.map((scooter) => (
            <li className="list-group-item" key={scooter.id}>
              <div className="card-header registrationCode">
                <p>Registracijos kodas: </p>
                <div>
                  <b>{scooter.registrationCode}</b>
                </div>
              </div>
              <div className="scooterDetails">
                <div className="isBusy">
                  <p>Užimtumas:</p>
                  <div
                    className="availability"
                    style={{
                      backgroundColor:
                        scooter.isBusy === 1 ? "#d30707" : "#3fca15",
                    }}
                  ></div>
                </div>
                <div className="lastUseTime">
                  <p>Paskutinį kartą naudotas:</p>
                  <div>
                    {scooter.lastUseTime !== ""
                      ? scooter.lastUseTime
                      : "Nenaudotas"}
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
                    className="green"
                    onClick={(_) => handleEdit(scooter.id)}
                  >
                    Redaguoti
                  </button>
                  <button
                    className="red"
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
