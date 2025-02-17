export default function List({ scooters, handleEdit }) {
  return (
    <div className="card col-7">
      <div className="card-header">
        <h5 className="card-title">KOLT pasipirtukai</h5>
      </div>
      <ul className="list-group list-group-flush">
        {scooters.map((scooter) => (
          <li className="list-group-item" key={scooter.id}>
            <div className="card-header registrationCode">
              <p>Registracijos kodas:</p>
              <div>{scooter.registrationCode}</div>
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
                  <b>{scooter.totalRideKilometres} km</b>
                </div>
              </div>
              <div className="btnContainer">
                <button
                  className="green"
                  onClick={(_) => handleEdit(scooter.id)}
                >
                  Redaguoti
                </button>
                <button className="red">Trinti</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="card-footer">
        <button className="blue">Kažkada kažkaip rušiuoti</button>
      </div>
    </div>
  );
}
