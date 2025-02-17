import { useEffect, useState } from "react";

export default function List({ scooters }) {
  console.log(scooters);
  return (
    <div className="card col-7">
      <div className="card-header">
        <h5 className="card-title">KOLT pasipirtukai</h5>
      </div>
      <ul className="list-group list-group-flush">
        {scooters.map((scooter) => (
          <li className="list-group-item" key={scooter.id}>
            <div className="registrationCode">
              <p>Registracijos kodas:</p>
              <div>{scooter.registrationCode}</div>
            </div>
            <div className="isBusy">
              <p>Užimtumas:</p>
              <div
                className="availability"
                style={{
                  backgroundColor: scooter.isBusy === 1 ? "#d30707" : "#3fca15",
                }}
              ></div>
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
            </div>
            <div className="btnContainer">
              <button className="green">Redaguoti</button>
              <button className="red">Trinti</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="card-footer">
        <button className="blue">Galbūt rušiuoti</button>
      </div>
    </div>
  );
}
