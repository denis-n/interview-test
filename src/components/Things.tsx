// List all the things.
// Add a simple form to add a thing
// , another form to add a ChildThing to an existing Thing (In memory)
import * as React from "react";
import { connect } from "react-redux";

import {
  create,
  createChild,
  getChildren,
  remove,
} from "../data/actions/ThingActions";
import { IChildThing, IThing } from "../data/types";
import { IAppState } from "../store";

import Children from "./Children";
import EditForm from "./EditForm";

interface IProps {
  things: IThing[];
  create(name: string): void;
  remove(id: string): void;
  getChildren(id: string): void;
  createChild(parentId: string, name: string): void;
}

interface IState {
  isThingFormVisible: boolean;
  selectedId: null | string;
}

class Things extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isThingFormVisible: false,
    selectedId: null,
  };

  public onShowThingForm = () => {
    this.setState({ isThingFormVisible: true });
  }

  public onHideThingForm = () => {
    this.setState({
      isThingFormVisible: false,
    });
  }

  public handleSaveThing = (name: string) => {
    this.props.create(name);

    this.onHideThingForm();
  }

  public onShowConfirmDelete = (id: string) => () => {
    if (confirm("Are you sure you want to delete this beautiful thing?")) {
      this.props.remove(id);

      if (this.state.selectedId === id) {
        this.setState({
          selectedId: null,
        });
      }
    }
  }

  public onShowChildren = (thing: IThing) => () => {
    this.setState((prevState) => {
      let selectedId: null | string = thing.id;

      if (prevState.selectedId === thing.id) {
        selectedId = null;
      }

      if (selectedId) {
        this.props.getChildren(selectedId);
      }

      return {
        selectedId,
      };
    });
  }

  public handleSaveNewChild = (name: string) => {
    const { selectedId } = this.state;

    if (selectedId) {
      this.props.createChild(selectedId, name);
    }
  }

  public render() {
    const { things } = this.props;

    const { isThingFormVisible, selectedId } = this.state;

    let selectedChildThings: IChildThing[] = [];

    if (selectedId) {
      const thing = things.find((x) => x.id === selectedId);

      if (thing) {
        selectedChildThings = thing.children;
      }
    }

    return (
      <React.Fragment>
        <h1>All Things:</h1>

        <button type="button" onClick={this.onShowThingForm}>
          Add New Thing
        </button>

        {isThingFormVisible && (
          <EditForm
            placeholder="thing name"
            cancel={this.onHideThingForm}
            save={this.handleSaveThing}
          />
        )}

        <table className="things-table">
          <tbody>
            {things.map((x) => (
              <tr
                key={x.id}
                className={`${x.id === selectedId ? "selected" : ""}`}
              >
                <td>{x.id}</td>

                <td>{x.name}</td>

                <td className="table__actions">
                  <button type="button" onClick={this.onShowChildren(x)}>
                    Show Children
                  </button>

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

        {selectedId && (
          <Children
            create={this.handleSaveNewChild}
            items={selectedChildThings}
          />
        )}
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
  getChildren,
  createChild,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Things);
