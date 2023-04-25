const initialState = {
  value: "",
  loading: false,
  error: false,
  deleted: false,
  confirmed: false,
};

/* Base para crear un reducer:
const reducer = (state, action) => {} */

const reducer = (state, action) => {
  if (action.type === "ERROR") {
    return {
      ...state,
      error: true,
      loading: false,
    };
  } else if (action.type === "CHECK") {
    return {
      ...state,
      loading: true,
    };
  } else {
    return {
      ...state,
    };
  }
};

//Forma popular de crear reducer
const reducerSwitch = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        error: true,
        loading: false,
      };
    case "CHECK":
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

// se separa en 2 partes para tener el objeto de objetos en una funcion y en otra la validacion

const reducerObject = (state) => ({
  ERROR: {
    ...state,
    error: true,
    loading: false,
  },
  CHECK: {
    ...state,
    loading: true,
  },
});

const reducerAction = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state)[action.type];
  } else {
    return state;
  }
};
