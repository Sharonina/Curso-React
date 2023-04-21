import React from "react";

// Las clases funcionan con prototipos
class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }
  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor escribe el código de seguridad</p>
        {this.state.error && <p>Error: El codigo es incorrecto</p>}
        <input placeholder="Código de seguridad" />
        {/* this.setState((prevState) => ({ error: !prevState }))}
        > */}
        <button onClick={() => this.setState({ error: !this.state.error })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
