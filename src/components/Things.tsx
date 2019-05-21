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
  isThingFormVisible: boolean;
}

class Things extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isThingFormVisible: false,
  };

  public onShowThingForm = () => {
    this.setState({ isThingFormVisible: true });
  }

  public handleSave = (name: string) => {
    this.props.create(name);

    this.onHideThingForm();
  }

  public onHideThingForm = () => {
    this.setState({
      isThingFormVisible: false,
    });
  }

  public onShowConfirmDelete = (id: string) => () => {
    if (confirm("Are you sure you want to delete this beautiful thing?")) {
      this.props.remove(id);
    }
  }

  public render() {
    const { things } = this.props;

    const { isThingFormVisible } = this.state;

    return (
      <React.Fragment>
        <h1>All Things:</h1>

        <button type="button" onClick={this.onShowThingForm}>
          Add
        </button>

        {isThingFormVisible && (
          <ThingForm cancel={this.onHideThingForm} save={this.handleSave} />
        )}

        <table className="things-table">
          <tbody>
            {things.map((x) => (
              <tr key={x.id}>
                <td>{x.id}</td>

                <td>{x.name}</td>

                <td className="table__actions">
                  <button
                    type="button"
                    onClick={this.onShowConfirmDelete(x.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
