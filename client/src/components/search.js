import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";


const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        width: 160,
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        marginTop: 17,
      },
    },
  },
});

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }

  handleChange = (event, values) => {
    let final = values;

    if (event.target.value !== 0) {
      final = event.target.value;
    }

    this.setState({ username: final });
  };

  startSearch = () => {
    
    if (this.state.username != "" && this.state.username) {
      this.props.registerName(this.state.username);
    }

  };

  render() {
    return (
      <div
        style={{
          width: 650,
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          paddingLeft: 20,
          paddingBottom: 5,
        }}
      >
        <ThemeProvider theme={theme}>
          <Autocomplete
            style={{ width: 500 }}
            freeSolo
            onInput={this.handleChange}
            onChange={this.handleChange}
            options={topUsers.map((option) => option.name)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                this.startSearch();
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Username"
                margin="normal"
                variant="outlined"
              />
            )}
          />
          <Button onClick={this.startSearch}>Add profile</Button>
        </ThemeProvider>
      </div>
    );
  }
}

const topUsers = [
  { name: "8cmTrueDamage" },
  { name: "René Tuning" },
  { name: "XXXTENTACULE" },
  { name: "Vachette Hybride" },
  { name: "FULL P4U3 T5F2" },
];
