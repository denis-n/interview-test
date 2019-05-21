import * as React from "react";

import { IChildThing } from "../data/types";
import EditForm from "./EditForm";

interface IProps {
  items: IChildThing[];
  create(name: string): void;
}

interface IState {
  isFormVisible: boolean;
}

class Children extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isFormVisible: false,
  };

  public onShowForm = () => {
    this.setState({ isFormVisible: true });
  }

  public onHideForm = () => {
    this.setState({
      isFormVisible: false,
    });
  }

  public handleSave = (name: string) => {
    this.props.create(name);

    this.onHideForm();
  }

  public render() {
    const { isFormVisible } = this.state;

    const { items } = this.props;

    return (
      <React.Fragment>
        <h2>Child Things:</h2>

        <button type="button" onClick={this.onShowForm}>
          Add New Child Thing
        </button>

        {isFormVisible && (
          <EditForm
            placeholder="child thing name"
            cancel={this.onHideForm}
            save={this.handleSave}
          />
        )}

        <table className="things-table">
          <tbody>
            {items.map((x) => (
              <tr key={x.id}>
                <td>{x.id}</td>

                <td>{x.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Children;
