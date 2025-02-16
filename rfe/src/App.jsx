import "./App.scss";
import Create from "./components/Create";
import * as C from "./components/constants";
import { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Create />
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
