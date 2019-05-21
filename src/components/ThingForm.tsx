import * as React from "react";

interface IProps {
  save(name: string): void;
  cancel(): void;
}

interface IState {
  name: string;
}

class ThingForm extends React.PureComponent<IProps, IState> {
  public state: IState = {
    name: "",
  };

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    this.setState({
      name: value,
    });
  }

  public handleSave = () => {
    this.props.save(this.state.name);
  }

  public render() {
    const { name } = this.state;

    const { cancel } = this.props;

    const saveDisabled = !name;

    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="thing name"
          name="name"
          value={name}
          onChange={this.handleChange}
        />

        <button type="button" disabled={saveDisabled} onClick={this.handleSave}>
          Save
        </button>

        <button type="button" onClick={cancel}>
          Cancel
        </button>
      </React.Fragment>
    );
  }
}

export default ThingForm;
