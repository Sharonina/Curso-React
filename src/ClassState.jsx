import React from "react";

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
  UNSAFE_componentWillMount() {
    console.log("componentWillMount");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor escribe el código de seguridad</p>
        {this.state.error && <p>Error: El codigo es incorrecto</p>}
        {this.state.loading && <p>Cargando...</p>}
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
