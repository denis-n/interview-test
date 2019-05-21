import * as React from "react";

interface IProps {
  placeholder: string;
  save(name: string): void;
  cancel(): void;
}

interface IState {
  name: string;
}

class EditForm extends React.PureComponent<IProps, IState> {
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

    const { placeholder, cancel } = this.props;

    const saveDisabled = !name;

    return (
      <div className="form">
        <div className="form__input">
          <input
            type="text"
            placeholder={placeholder}
            name="name"
            value={name}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </div>

        <div className="form__actions">
          <button
            type="button"
            disabled={saveDisabled}
            onClick={this.handleSave}
          >
            Save
          </button>

          <button type="button" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default EditForm;
