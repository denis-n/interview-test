// List all the things.
// Add a simple form to add a thing
// , another form to add a ChildThing to an existing Thing (In memory)
import * as React from "react";
import { connect } from "react-redux";

import { IThing } from "../data/models";
import { IAppState } from "../store";

interface IProps {
  things: IThing[];
}

class Things extends React.PureComponent<IProps> {
  public render() {
    const { things } = this.props;

    return (
      <React.Fragment>
        <h1>All Things:</h1>
        <ul>
          {things.map((x) => (
            <li key={x.id}>{x.name}</li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: IAppState) => {
  return {
    things: store.thingState.things,
  };
};

export default connect(mapStateToProps)(Things);
