import "./app.scss";
import Create from "./components/Create";
import List from "./components/List";
import Edit from "./components/Edit";
import Delete from "./components/Delete";
import Statistics from "./components/Statistics";
import TopBanner from "./components/TopBanner";
import * as C from "./components/constants";
import randRCode from "./components/randRCode";
import heroBackground from "./components/images/hero_background.jpeg";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const isInitialized = useRef(false);
  const [scooters, setScooters] = useState([]);
  const [registrationCode, setRegistrationCode] = useState("xxxxxxxx");
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [sortDirectionKm, setSortDirectionKm] = useState("asc");
  const [sortDirectionDate, setSortDirectionDate] = useState("asc");
  const [statistics, setStatistics] = useState(C.defaultStatistics);
  const [topBanner, setTopBanner] = useState(1);
  const [message, setMessage] = useState([]);
  let id = useRef(JSON.parse(localStorage.getItem("latestScooterId")));

  const handleRegistrationCode = () => {
    setRegistrationCode(randRCode());
  };

  const handleCreate = () => {
    setScooters((prevScooters) => [
      {
        ...C.defaultScooter,
        id: id.current,
        registrationCode: registrationCode,
      },
      ...prevScooters,
    ]);
    id.current = id.current + 1;
    localStorage.setItem("latestScooterId", JSON.stringify(id.current));
    setRegistrationCode("xxxxxxxx");
  };

  const handleEdit = (id) => {
    console.log("test");
    let scooterToEdit = scooters.find((scooter) => scooter.id === id);
    setEditData({
      ...scooterToEdit,
      lastUseTime: "",
      totalRideKilometers: 0.0,
    });
  };
  console.log(editData);
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

  const handleDeleteMessage = (id) => {
    let scooterToDelete = scooters.find((scooter) => scooter.id === id);
    if (scooterToDelete.isBusy === 0) {
      setDeleteData(scooterToDelete);
    } else {
      setMessage((prevMessage) => ({
        ...prevMessage,
        error: "Paspirtukas užimtas negalima ištrinti",
      }));
      console.log("error");
    }
  };

  const handleDelete = (id) => {
    setScooters((prevScooters) =>
      prevScooters.filter((scooter) => scooter.id !== id)
    );
    setDeleteData(null);
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
    </div>
  );
}
