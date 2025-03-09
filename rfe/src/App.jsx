import "./app.scss";
import Create from "./components/Create";
import List from "./components/List";
import Edit from "./components/Edit";
import Delete from "./components/Delete";
import Statistics from "./components/Statistics";
import TopBanner from "./components/TopBanner";
import Messages from "./components/Messages";
import * as C from "./components/constants";
import randRCode from "./components/randRCode";
import heroBackground from "./components/images/hero_background.jpeg";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const isInitialized = useRef(false);
  const [scooters, setScooters] = useState([]);
  const [registrationCode, setRegistrationCode] = useState("xxxxxxxx");
  const [newScooter, setNewScooter] = useState([C.defaultScooter]);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [sortDirectionKm, setSortDirectionKm] = useState("asc");
  const [sortDirectionDate, setSortDirectionDate] = useState("asc");
  const [statistics, setStatistics] = useState(C.defaultStatistics);
  const [topBanner, setTopBanner] = useState(1);
  const [messages, setMessage] = useState([]);
  let id = useRef(JSON.parse(localStorage.getItem("latestScooterId")));

  const handleRegistrationCode = () => {
    setRegistrationCode(randRCode());
  };

  const handleCreate = () => {
    const currentId = id.current;
    setScooters((prevScooters) => [
      {
        ...C.defaultScooter,
        id: currentId,
        registrationCode: registrationCode,
        lastUseTime: newScooter.lastUseTime,
        totalRideKilometers: newScooter.totalRideKilometers,
      },
      ...prevScooters,
    ]);
    setMessage((prevMessages) => [
      ...prevMessages,
      {
        message: "Paspirtukas sukurtas sėkmingai",
        type: "alert-primary",
        id: uuidv4(),
      },
    ]);
    id.current = id.current + 1;
    localStorage.setItem("latestScooterId", JSON.stringify(id.current));
    setRegistrationCode("xxxxxxxx");
    setNewScooter(C.defaultScooter);
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
    setMessage((prevMessages) => [
      ...prevMessages,
      {
        message: "Paspirtukas pakoreguotas sėkmingai",
        type: "alert-primary",
        id: uuidv4(),
      },
    ]);
    setEditData(null);
  };

  const handleDeleteMessage = (id) => {
    let scooterToDelete = scooters.find((scooter) => scooter.id === id);
    if (scooterToDelete.isBusy === 0) {
      setDeleteData(scooterToDelete);
    } else {
      setMessage((prevMessages) => [
        ...prevMessages,
        {
          message: "Paspirtukas užimtas, negalima ištrinti",
          type: "alert-danger",
          id: uuidv4(),
        },
      ]);
    }
  };

  const handleDelete = (id) => {
    setScooters((prevScooters) =>
      prevScooters.filter((scooter) => scooter.id !== id)
    );
    setDeleteData(null);
    setMessage((prevMessages) => [
      ...prevMessages,
      {
        message: "Paspirtukas ištrintas sėkmingai",
        type: "alert-primary",
        id: uuidv4(),
      },
    ]);
  };

  const handleSort = (type) => {
    if (type === "km") {
      if (sortDirectionKm === "asc") {
        setScooters((prevScooters) => {
          return [...prevScooters].toSorted(
            (a, b) =>
              Number(a.totalRideKilometers) - Number(b.totalRideKilometers)
          );
        });
        setSortDirectionKm((prevDirection) =>
          prevDirection === "asc" ? "desc" : "asc"
        );
      } else if (sortDirectionKm === "desc") {
        setScooters((prevScooters) => {
          return [...prevScooters].toSorted(
            (a, b) =>
              Number(b.totalRideKilometers) - Number(a.totalRideKilometers)
          );
        });
        setSortDirectionKm((prevDirection) =>
          prevDirection === "asc" ? "desc" : "asc"
        );
      }
    } else if (type === "data") {
      if (sortDirectionDate === "asc") {
        setScooters((prevScooters) => {
          setSortDirectionDate((prevDirection) =>
            prevDirection === "asc" ? "desc" : "asc"
          );
          return [...prevScooters].toSorted(
            (a, b) => Date.parse(a.lastUseTime) - Date.parse(b.lastUseTime)
          );
        });
      } else if (sortDirectionDate === "desc") {
        setScooters((prevScooters) => {
          setSortDirectionDate((prevDirection) =>
            prevDirection === "asc" ? "desc" : "asc"
          );
          return [...prevScooters].toSorted(
            (a, b) => Date.parse(b.lastUseTime) - Date.parse(a.lastUseTime)
          );
        });
      }
    }
  };

  useEffect(() => {
    if (id === 0 || id === undefined) {
      localStorage.setItem("latestScooterId", JSON.stringify(1));
    }
    const storedScooters = JSON.parse(localStorage.getItem("scooters"));
    if (storedScooters) {
      const sortedScooters = [...storedScooters].sort(
        (a, b) => Number(b.id) - Number(a.id)
      );
      setScooters(sortedScooters);
    } else {
      localStorage.setItem("scooters", JSON.stringify([]));
    }
    isInitialized.current = true;
  }, []);

  useEffect(() => {
    if (isInitialized.current) {
      localStorage.setItem("scooters", JSON.stringify(scooters));
    }
    const freeScooters = scooters.filter((s) => s.isBusy === 0).length;
    const busyScooters = scooters.filter((s) => s.isBusy === 1).length;
    let totalRideKilometers = scooters.reduce(
      (accumulator, currentScooter) =>
        accumulator + Number(currentScooter.totalRideKilometers),
      0
    );
    setStatistics((prevStatistics) => ({
      ...prevStatistics,
      totalScooters: Number(scooters.length),
      freeScooters: Number(freeScooters),
      busyScooters: Number(busyScooters),
      totalRideKilometers: Number(totalRideKilometers),
    }));
  }, [scooters]);

  return (
    <div className="App">
      {topBanner !== 0 ? <TopBanner setTopBanner={setTopBanner} /> : null}
      <div className="appBody">
        <div
          className="heroContainer"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          {scooters.length > 0 && <Statistics statistics={statistics} />}
        </div>
        <div className="mainContainer">
          <Create
            handleRegistrationCode={handleRegistrationCode}
            registrationCode={registrationCode}
            handleCreate={handleCreate}
            id={id}
            newScooter={newScooter}
            setNewScooter={setNewScooter}
          />
          <List
            scooters={scooters}
            handleEdit={handleEdit}
            handleDeleteMessage={handleDeleteMessage}
            handleDelete={handleDelete}
            handleSort={handleSort}
          />
        </div>
      </div>
      {editData !== null ? (
        <Edit
          editData={editData}
          setEditData={setEditData}
          scooters={scooters}
          handleUpdate={handleUpdate}
        />
      ) : null}
      {deleteData !== null ? (
        <Delete
          deleteData={deleteData}
          setDeleteData={setDeleteData}
          handleDelete={handleDelete}
        />
      ) : null}
      {messages !== null ? (
        <Messages messages={messages} setMessage={setMessage} />
      ) : null}
    </div>
  );
}
