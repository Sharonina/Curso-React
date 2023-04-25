import React from "react";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const SECURITY_CODE = "paradigma";

  // action creators: ayudan a que el código ya NO sea imperativo, sino declarativo
  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onError = () => dispatch({ type: actionTypes.error });
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });

  const onWrite = ({ target: { value } }) => {
    dispatch({ type: actionTypes.write, payload: value });
  };

  React.useEffect(() => {
    console.log("Iniciando el efecto");

    if (state.loading) {
      //setError(false);
      setTimeout(() => {
        console.log("Haciendo la validación");

        if (state.value === SECURITY_CODE) {
          // para usar el reducer, se debe mandar llamar al dispatch, el cual recibe un objeto con type y/o payload
          //tipo de estado que se quiere obtener, debe tener el mismo nombre del reducer
          // ahora mandamos llamar el creator action types
          onConfirm();
        } else {
          onError();
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
          onChange={onWrite}
          placeholder="Código de seguridad"
        />
        <button onClick={onCheck}>Comprobar</button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Pedimos confirmación, ¿Tas segurx de eliminar UseReducer?</p>
        <button onClick={onDelete}>Sí, eliminar</button>
        <button onClick={onReset}>Nop, me arrepentí</button>
      </>
    );
  } else {
    return (
      <>
        <p>Eliminado con éxito</p>
        <button onClick={onReset}>Volver a atrás</button>
      </>
    );
  }
}

const initialState = {
  value: "",
  loading: false,
  error: false,
  deleted: false,
  confirmed: false,
};

// ayudan a evitar typos
const actionTypes = {
  confirm: "CONFIRM",
  write: "WRITE",
  delete: "DELETE",
  reset: "RESET",
  error: "ERROR",
  check: "CHECK",
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
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
