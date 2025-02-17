import "./buttons.scss";

export default function Create({ handleCreate, registrationCode }) {
  return (
    <div className="col-4 card h-100">
      <div className="card-header">
        <h5 className="card-title">Sukurti KOLT pasipirtuką</h5>
      </div>
      <div className="card-body">
        <p>Registracijos kodas: {registrationCode}</p>
      </div>
      <div className="card-footer">
        <button className="blue" onClick={handleCreate}>
          Pridėti
        </button>
      </div>
    </div>
  );
}

// Paspirtukų aprašo viršuje (arba apačioje arba šone)
// turi būti atvaizduota tuščia forma su
// naujam paspirtukui įvesti skirtais laukeliais
//  ir mygtukas “Pridėti” formos vykdymui.
// Laukeliui isBusy skirto įvedimo,
// kuriant naują paspirtuką daryti nereikia,
// nes naujai sukurtas paspirtukas visada turi būti “laisvas”.
// registrationCode reikšmė turi būti sukuriama rand kodo, o ne įvedinėjama.
