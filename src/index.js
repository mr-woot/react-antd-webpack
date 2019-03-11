import React from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";

import "./theme.scss";
import "./index.scss";

class App extends React.Component {
  state = {
    CaptainKirkBio: {},
    Foo: null
  };

  componentDidMount() {
    this.onGetKirkBio();
    import(/* webpackChunkName: 'Foo' */ "./Foo").then(Foo => {
      this.setState({ Foo: Foo.default });
    });
  }

  onGetKirkBio = async () => {
    try {
      const result = await fetch(
        "http://stapi.co/api/v1/rest/character/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: {
            title: "James T. Kirk",
            name: "James T. Kirk"
          }
        }
      );
      const resultJSON = await result.json();
      const character = resultJSON.characters[0];
      this.setState({ CaptainKirkBio: character });
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    const { CaptainKirkBio, Foo } = this.state;
    return <>{Foo ? <Foo /> : <p>Foo is loading</p>}</>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
