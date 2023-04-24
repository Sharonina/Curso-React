import React from "react";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    loading: false,
    error: false,
    deleted: false,
    confirmed: false,
  });
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const SECURITY_CODE = "paradigma";

  React.useEffect(() => {
    console.log("Iniciando el efecto");

    if (state.loading) {
      //setError(false);
      setTimeout(() => {
        console.log("Haciendo la validación");

        if (state.value === SECURITY_CODE) {
          setState({ ...state, error: false, loading: false, confirmed: true });
        } else {
          setState({ ...state, error: true, loading: false });
        }

        console.log("Terminando la validación");
      }, 3000);
    }

    console.log("Terminando el efecto");
  }, [state.loading]);

  console.log(state);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor escribe el código de seguridad</p>

        {state.error && !state.loading && <p>Error: El codigo es incorrecto</p>}
        {state.loading && <p>Cargando ...</p>}

        <input
          value={state.value}
          onChange={(event) =>
            setState({ ...state, value: event.target.value })
          }
          placeholder="Código de seguridad"
        />
        <button onClick={() => setState({ ...state, loading: true })}>
          Comprobar
        </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Pedimos confirmación, ¿Tas segurx de eliminar UseState?</p>
        <button
          onClick={() => {
            setState({ ...state, deleted: true });
          }}
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => {
            setState({ ...state, confirmed: false, value: "" });
          }}
        >
          Nop, me arrepentí
        </button>
      </>
    );
  } else {
    return (
      <>
        <p>Eliminado con éxito</p>
        <button
          onClick={() => {
            setState({ ...state, confirmed: false, deleted: false, value: "" });
          }}
        >
          Volver a atrás
        </button>
      </>
    );
  }
}

export { UseState };
