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
    let scooters = JSON.parse(localStorage.getItem("scooters") || "[]");
    let id = scooters.length + 1;

    if (scooters.map((scooter) => scooter.id === id)) {
      setRegistrationCode(randRCode());
    }
    const newScooter = { ...createScooter, id: id };
    setCreateScooter(newScooter);
    scooters.unshift(newScooter);
    localStorage.setItem("scooters", JSON.stringify(scooters));
    setRegistrationCode(randRCode());
  };
  const handleEdit = (id) => {
    let scooters = JSON.parse(localStorage.getItem("scooters") || "[]");
    let scooterToEdit = scooters.filter((scooter) => scooter.id === id);

    setEditData(scooterToEdit[0]);
  };
  useEffect(() => {
    setRegistrationCode(randRCode());
  }, []);

  useEffect(() => {
    let scooters = JSON.parse(localStorage.getItem("scooters") || "[]");
    if (scooters.length < 1) {
      localStorage.setItem("scooters", JSON.stringify([]));
    }
    setScooters(scooters);
    setCreateScooter((prevScooter) => ({
      ...prevScooter,
      registrationCode: registrationCode,
    }));
  }, [registrationCode]);

  return (
    <div className="App">
      <Create handleCreate={handleCreate} registrationCode={registrationCode} />
      <List scooters={scooters} handleEdit={handleEdit} />
      {editData !== null && (
        <Edit
          editData={editData}
          setEditData={setEditData}
          setUpdateData={setUpdateData}
        />
      )}
    </div>
  );
}

export default App;

// Sukurkite duomenų struktūrą localStorage pagal schemą:
// id: int(nuo 1);
// registrationCode: string(8);
// isBusy: int(1);
// lastUseTime: date;
// totalRideKilometres: float(du skaičiai po kablelio);

// Paspirtukų aprašo viršuje (arba apačioje arba šone)
// turi būti atvaizduota tuščia forma su
// naujam paspirtukui įvesti skirtais laukeliais
//  ir mygtukas “Pridėti” formos vykdymui.
// Laukeliui isBusy skirto įvedimo,
// kuriant naują paspirtuką daryti nereikia,
// nes naujai sukurtas paspirtukas visada turi būti “laisvas”.
// registrationCode reikšmė turi būti sukuriama rand kodo, o ne įvedinėjama.

// Naudodami React biblioteką sukurkite vieno puslapio aplikaciją (SPA),
// kurioje vartotojas galėtų atlikti pilną “Kolt” paspirtukų administravimą (CRUD).
// Kiekvienas paspirtukas turi turėti savo vizualiai atskirtą aprašą (eilutę),
// kuriame būtų pateikta visa informaciją apie jį. Šalia turi būti mygtukas “Trinti”,
// kurį paspaudus atitinkamo paspirtuko įrašas būtų pašalinamas iš localStorage.
// Šalia turi būti mygtukas “Redaguoti”,
// kurį paspaudus atitinkamo paspirtuko įrašas būtų atvaizduojamas modal lange su galimybe jį redaguoti,
// o redaguotą įrašą išsaugoti  localStorage.
