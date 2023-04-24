import React from "react";
import { Loading } from "./Loading";

// Las clases funcionan con prototipos
class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
    };
  }

  // métodos del ciclo de vida
  //componentWillMount
  /* UNSAFE_componentWillMount() {
    console.log("componentWillMount");
  }

  componentDidMount() {
    console.log("componentDidMount");
  } */

  componentDidUpdate() {
    console.log("actualización");

    if (!!this.state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validación");

        this.setState({ loading: false });

        console.log("Terminando la validación");
      }, 3000);
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor escribe el código de seguridad</p>
        {this.state.error && <p>Error: El codigo es incorrecto</p>}
        {this.state.loading && <Loading />}
        <input placeholder="Código de seguridad" />
        {/* this.setState((prevState) => ({ error: !prevState }))}
        > */}
        <button onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
