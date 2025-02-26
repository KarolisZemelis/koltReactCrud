import "./app.scss";
import Create from "./components/Create";
import List from "./components/List";
import Edit from "./components/Edit";
import * as C from "./components/constants";
import randRCode from "./components/randRCode";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [scooters, setScooters] = useState([]);
  const [registrationCode, setRegistrationCode] = useState("");
  const isInitialized = useRef(false);

  const handleRegistrationCode = () => {
    setRegistrationCode(randRCode());
  };

  const handleCreate = () => {
    let id = 1;
    if (scooters.length > 0) {
      id = Number(scooters[scooters.length - 1].id + 1);
    }
    setScooters((prevScooters) => [
      ...prevScooters,
      {
        ...C.defaultScooter,
        id: id,
        registrationCode: registrationCode,
      },
    ]);
    setRegistrationCode("");
  };

  const handleEdit = (id) => {};

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
      <List scooters={scooters} />
    </div>
  );
}
