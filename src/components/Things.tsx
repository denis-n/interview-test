// List all the things.
// Add a simple form to add a thing
// , another form to add a ChildThing to an existing Thing (In memory)
import * as React from "react";
import { connect } from "react-redux";

import { create, remove } from "../data/actions/ThingActions";
import { IThing } from "../data/types";
import { IAppState } from "../store";

import ThingForm from "./ThingForm";

interface IProps {
  things: IThing[];
  create(name: string): void;
  remove(id: string): void;
}

interface IState {
  isAdding: boolean;
}

class Things extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isAdding: false,
  };

  public handleShowThingForm = () => {
    this.setState({ isAdding: true });
  }

  public handleSave = (name: string) => {
    this.props.create(name);

    this.handleCancel();
  }

  public handleCancel = () => {
    this.setState({
      isAdding: false,
    });
  }

  public render() {
    const { things } = this.props;

    const { isAdding } = this.state;

    return (
      <React.Fragment>
        <h1>
          All Things:{" "}
          <button type="button" onClick={this.handleShowThingForm}>
            Add
          </button>
        </h1>
        <ul>
          {isAdding && (
            <li>
              <ThingForm cancel={this.handleCancel} save={this.handleSave} />
            </li>
          )}

          {things.map((x) => (
            <li key={x.id}>
              {x.id}: {x.name}
            </li>
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

const mapDispatchToProps = {
  create,
  remove,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Things);
