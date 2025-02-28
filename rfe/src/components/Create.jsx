import "./buttons.scss";

export default function Create({
  handleRegistrationCode,
  registrationCode,
  handleCreate,
}) {
  return (
    <div className="card col-2.5 create">
      <div className="card-header">
        <h5 className="card-title">Sukurti KOLT pasipirtuką</h5>
      </div>
      <div className="card-body">
        <p>
          Registracijos kodas: <b>{registrationCode}</b>
        </p>
      </div>
      <div className="card-footer create-footer">
        <button className="green" onClick={handleRegistrationCode}>
          Generuoti
        </button>
        <button
          className="green"
          onClick={handleCreate}
          style={{
            ...(registrationCode === "xxxxxxxx"
              ? {
                  opacity: 0.5,
                  cursor: "not-allowed",
                  pointerEvents: "none",
                  backgroundColor: "#cccccc",
                  color: "#666666",
                }
              : {}),
          }}
        >
          Sukurti
        </button>
      </div>
    </div>
  );
}
