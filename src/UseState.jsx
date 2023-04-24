import React from "react";

function UseState({ name }) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const SECURITY_CODE = "paradigma";

  React.useEffect(() => {
    console.log("Iniciando el efecto");

    if (loading) {
      //setError(false);
      setTimeout(() => {
        console.log("Haciendo la validación");

        if (value !== SECURITY_CODE) {
          setError(true);
        }
        setLoading(false);

        console.log("Terminando la validación");
      }, 3000);
    }

    console.log("Terminando el efecto");
  }, [loading]);

  console.log(value);
  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor escribe el código de seguridad</p>

      {error && !loading && <p>Error: El codigo es incorrecto</p>}
      {loading && <p>Cargando ...</p>}

      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Código de seguridad"
      />
      <button onClick={() => setLoading(true)}>Comprobar</button>
    </div>
  );
}

export { UseState };
