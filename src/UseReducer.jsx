import React from "react";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const SECURITY_CODE = "paradigma";

  /* const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  }; */

  React.useEffect(() => {
    console.log("Iniciando el efecto");

    if (state.loading) {
      //setError(false);
      setTimeout(() => {
        console.log("Haciendo la validación");

        if (state.value === SECURITY_CODE) {
          // para usar el reducer, se debe mandar llamar al dispatch, el cual recibe un objeto con type y/o payload
          dispatch({
            //tipo de estado que se quiere obtener, debe tener el mismo nombre del reducer
            type: "CONFIRM",
          });
        } else {
          dispatch({ type: "ERROR" });
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
            dispatch({ type: "WRITE", payload: event.target.value })
          } //onWrite(event.target.value)}
          placeholder="Código de seguridad"
        />
        <button onClick={() => dispatch({ type: "CHECK" })}>Comprobar</button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Pedimos confirmación, ¿Tas segurx de eliminar UseReducer?</p>
        <button
          onClick={() => {
            dispatch({ type: "DELETE" });
          }}
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => {
            dispatch({ type: "RESET" });
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
            dispatch({ type: "RESET" });
          }}
        >
          Volver a atrás
        </button>
      </>
    );
  }
}

const initialState = {
  value: "paradigma",
  loading: false,
  error: false,
  deleted: false,
  confirmed: false,
};

const reducerObject = (state, payload) => ({
  ERROR: {
    ...state,
    error: true,
    loading: false,
  },
  CHECK: {
    ...state,
    loading: true,
  },
  CONFIRM: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  WRITE: {
    ...state,
    value: payload,
  },
  DELETE: {
    ...state,
    deleted: true,
  },
  RESET: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };
