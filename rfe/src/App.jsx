import "./app.scss";
import Create from "./components/Create";
import List from "./components/List";
import Edit from "./components/Edit";
import Delete from "./components/Delete";
import * as C from "./components/constants";
import randRCode from "./components/randRCode";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const isInitialized = useRef(false);
  const [scooters, setScooters] = useState([]);
  const [registrationCode, setRegistrationCode] = useState("");
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [sortDirectionKm, setSortDirectionKm] = useState("asc");
  const [sortDirectionDate, setSortDirectionDate] = useState("asc");
  const [message, setMessage] = useState([]);
  console.log(scooters);
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
    setSortDirectionKm((prevState) => (prevState === "asc" ? "desc" : "asc"));
    if (type === "km") {
      if (sortDirectionKm === "asc") {
        setScooters((prevScooters) => {
          const sortedScooters = [...prevScooters].sort(
            (a, b) =>
              Number(a.totalRideKilometers) - Number(b.totalRideKilometers)
          );
          setSortDirectionKm("desc");
          return sortedScooters;
        });
      } else if (sortDirectionKm === "desc") {
        setScooters((prevScooters) => {
          const sortedScooters = [...prevScooters].sort(
            (a, b) =>
              Number(b.totalRideKilometers) - Number(a.totalRideKilometers)
          );
          setSortDirectionKm("asc");
          return sortedScooters;
        });
      }
    } else if (type === "data") {
      if (sortDirectionKm === "asc") {
        setScooters((prevScooters) => {
          const sortedScooters = [...prevScooters].sort((a, b) => {
            const dateA = new Date(a.lastUseTime);
            const dateB = new Date(b.lastUseTime);

            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
              return 0;
            }
            return dateA.getTime() - dateB.getTime();
          });

          setSortDirectionDate((prevDirection) =>
            prevDirection === "asc" ? "desc" : "asc"
          );

          return sortedScooters;
        });
      } else if (sortDirectionKm === "desc") {
        setScooters((prevScooters) => {
          const sortedScooters = [...prevScooters].sort((a, b) => {
            const dateA = new Date(a.lastUseTime);
            const dateB = new Date(b.lastUseTime);

            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
              return 0;
            }
            return dateB.getTime() - dateA.getTime();
          });

          setSortDirectionDate((prevDirection) =>
            prevDirection === "asc" ? "desc" : "asc"
          );

          return sortedScooters;
        });
      }
    }
  };

  useEffect(() => {
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
  }, [scooters]);

  return (
    <div className="App">
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
