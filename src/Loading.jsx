import React from "react";

// Las clases funcionan con prototipos
class Loading extends React.Component {
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    return <p>Cargando...</p>;
  }
}

export { Loading };
