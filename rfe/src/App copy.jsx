import "./app.scss";
import Create from "./components/Create";
import List from "./components/List";
import Edit from "./components/Edit";
import * as C from "./components/constants";
import randRCode from "./components/randRCode";
import { useState, useEffect } from "react";

function App() {
  const [registrationCode, setRegistrationCode] = useState("");
  const [createScooter, setCreateScooter] = useState(C.defaultScooter);
  const [scooters, setScooters] = useState([]);
  const [editData, setEditData] = useState(null);
  const [updateData, setUpdateData] = useState(null);

  const handleCreate = () => {
    let scooterArray = JSON.parse(localStorage.getItem("scooters") || "[]");
    let id = scooterArray.length + 1;

    if (scooterArray.some((scooter) => scooter.id === id)) {
      setRegistrationCode(randRCode());
    }
    const newScooter = { ...createScooter, id: id };
    setCreateScooter(newScooter);
    scooterArray.unshift(newScooter);
    localStorage.setItem("scooters", JSON.stringify(scooterArray));
    console.log(newScooter);
    setScooters((prevScooters) => [...prevScooters, newScooter]);

    setRegistrationCode(randRCode());
  };
  const handleEdit = (id) => {
    let scooters = JSON.parse(localStorage.getItem("scooters") || "[]");
    let scooterToEdit = scooters.filter((scooter) => scooter.id === id);

    setEditData(scooterToEdit[0]);
    setUpdateData(null);
  };
  const handleSaveUpdate = (id) => {
    setEditData(null);
    setScooters((prevScooters) => {
      const updatedScooters = prevScooters.map((scooter) => {
        if (scooter.id === id) {
          return {
            ...scooter,
            lastUseTime: updateData.lastUseTime,
            totalRideKilometers:
              Number(scooter.totalRideKilometers) +
              Number(updateData.totalRideKilometers),
            isBusy:
              updateData.isBusy !== undefined
                ? updateData.isBusy
                : scooter.isBusy,
          };
        }
        return scooter;
      });
      console.log("1.updated scooters", updatedScooters);
      return updatedScooters;
    });
  };

  useEffect(() => {
    setRegistrationCode(randRCode());

    let scootersArray = JSON.parse(localStorage.getItem("scooters") || "[]");

    if (scootersArray.length < 1) {
      localStorage.setItem("scooters", JSON.stringify([]));
    }

    setScooters(scootersArray);

    setCreateScooter((prevScooter) => ({
      ...prevScooter,
      registrationCode: registrationCode,
    }));
  }, []);

  useEffect(() => {
    localStorage.setItem("scooters", JSON.stringify(scooters));
  }, [scooters]);

  return (
    <div className="App">
      <Create handleCreate={handleCreate} registrationCode={registrationCode} />
      <List scooters={scooters} handleEdit={handleEdit} />
      {editData !== null && (
        <Edit
          editData={editData}
          setEditData={setEditData}
          updateData={updateData}
          setUpdateData={setUpdateData}
          scooters={scooters}
          handleSaveUpdate={handleSaveUpdate}
        />
      )}
    </div>
  );
}

export default App;
