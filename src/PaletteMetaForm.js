import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css'

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      newPaletteName: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { newPaletteName } = this.state;
    const { hideForm, handleSubmit } = this.props;

    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        onClose={hideForm}
      >
        <DialogTitle id="form-dialog-title">Create a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
          <DialogContent>
            <DialogContentText>
              Go ahead and enter a title for your new Palette. Make sure it is
              Unique.
            </DialogContentText> 
            <Picker />
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              name="newPaletteName"
              onChange={this.handleChange}
              fullWidth
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter a Palette Name", "Name already used"]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default PaletteMetaForm;
