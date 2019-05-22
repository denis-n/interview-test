// List all the things.
// Add a simple form to add a thing
// , another form to add a ChildThing to an existing Thing (In memory)
import * as React from "react";
import { connect } from "react-redux";

import { create, createChild, remove } from "../data/actions/ThingActions";
import { IChildThing, IThing } from "../data/types";
import { IAppState } from "../store";

import { NormalizedObjects } from "../data/reducers/thingReducer";
import Children from "./Children";
import EditForm from "./EditForm";

interface IProps {
  things: NormalizedObjects<IThing>;
  children: NormalizedObjects<IChildThing>;
  create(name: string): void;
  remove(id: string): void;
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

  public onShowChildren = (id: string) => () => {
    this.setState((prevState) => {
      let selectedId: null | string = id;

      if (prevState.selectedId === id) {
        selectedId = null;
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
    const { things, children } = this.props;

    const { isThingFormVisible, selectedId } = this.state;

    let selectedChildThings: IChildThing[] = [];

    if (selectedId) {
      selectedChildThings = children.allIds
        .filter((x) => things.byId[selectedId].children.includes(x))
        .map((x) => children.byId[x]);
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
            {things.allIds.map((x) => (
              <tr key={x} className={`${x === selectedId ? "selected" : ""}`}>
                <td>{x}</td>

                <td>{things.byId[x].name}</td>

                <td className="table__actions">
                  <button type="button" onClick={this.onShowChildren(x)}>
                    Show Children
                  </button>

                  <button type="button" onClick={this.onShowConfirmDelete(x)}>
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
    children: store.thingState.children,
  };
};

const mapDispatchToProps = {
  create,
  remove,
  createChild,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Things);
