import "./app.scss";
import Create from "./components/Create";
import List from "./components/List";
import Edit from "./components/Edit";
import * as C from "./components/constants";
import randRCode from "./components/randRCode";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const isInitialized = useRef(false);
  const [scooters, setScooters] = useState([]);
  const [registrationCode, setRegistrationCode] = useState("");
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const handleRegistrationCode = () => {
    setRegistrationCode(randRCode());
  };

  const handleCreate = () => {
    let id = 1;
    if (scooters.length > 0) {
      id = Number(scooters[0].id + 1);
    }
    setScooters((prevScooters) => [
      {
        ...C.defaultScooter,
        id: id,
        registrationCode: registrationCode,
      },
      ...prevScooters,
    ]);
    setRegistrationCode("");
  };

  const handleEdit = (id) => {
    let scooterToEdit = scooters.find((scooter) => scooter.id === id);
    setEditData({
      ...scooterToEdit,
      lastUseTime: "",
      totalRideKilometers: 0.0,
    });
  };

  const handleUpdate = () => {
    setScooters((prevScooters) =>
      prevScooters.map((scooter) =>
        scooter.id === editData.id
          ? {
              ...editData,
              totalRideKilometers:
                scooter.totalRideKilometers + editData.totalRideKilometers,
              lastUseTime:
                editData.lastUseTime === ""
                  ? scooter.lastUseTime
                  : editData.lastUseTime,
            }
          : scooter
      )
    );
    setEditData(null);
  };

  const handleDelete = () => {};

  useEffect(() => {
    const storedScooters = JSON.parse(localStorage.getItem("scooters"));
    if (storedScooters) {
      setScooters(storedScooters);
    } else {
      localStorage.setItem("scooters", JSON.stringify([]));
    }
    isInitialized.current = true;
  }, []);

  useEffect(() => {
    if (isInitialized.current && scooters.length > 0) {
      localStorage.setItem("scooters", JSON.stringify(scooters));
    }
  }, [scooters]);

  return (
    <div className="App">
      <Create
        handleRegistrationCode={handleRegistrationCode}
        registrationCode={registrationCode}
        handleCreate={handleCreate}
      />
      <List scooters={scooters} handleEdit={handleEdit} />
      {editData !== null ? (
        <Edit
          editData={editData}
          setEditData={setEditData}
          scooters={scooters}
          handleUpdate={handleUpdate}
        />
      ) : null}
    </div>
  );
}
