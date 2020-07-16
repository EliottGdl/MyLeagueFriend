import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { toChoose } from "../util";
import Typography from "@material-ui/core/Typography";
import Search from "./search";
import FriendProfile from "./friendProfile";
import Background from "../assets/background.jpg";
import ReactDOM from "react-dom";
import AnimatedNumber from "animated-number-react";
import "./styles.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Footer from "./footer";
import { Button } from "@material-ui/core";
import "./profile.css"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Profile extends Component {
  constructor(props) {
    super(props);

    let us = Array();
    let localStorage = window.localStorage;
    let actuals = localStorage.getItem("users");
    if (actuals != null) {
      us = actuals.split(";");
      us.pop();
    }

    this.state = { users: us, open: false };
  }

  deleteAuser = (deleteUser) => {
    let localStorage = window.localStorage;
    let actuals = localStorage.getItem("users");

    let nouveau = "";
    let tri = actuals.split(";");
    tri.pop();
    for (let u of tri) {
      if (
        u.toUpperCase().replace(" ", "") !=
        deleteUser.toUpperCase().replace(" ", "")
      ) {
        nouveau += u + ";";
      }
    }

    localStorage.setItem("users", nouveau);
    this.setState({
      users: tri.filter(
        (u) =>
          u.toUpperCase().replace(" ", "") !=
          deleteUser.toUpperCase().replace(" ", "")
      ),
      open: true,
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  storeAnewUser = (newUser) => {
    let localStorage = window.localStorage;
    let actuals = localStorage.getItem("users");
    if (actuals == null) {
      actuals = "";
    }

    if (actuals.indexOf(newUser) == -1 && actuals.split(";").length < 11) {
      actuals += newUser + ";";

      localStorage.setItem("users", actuals);

      let newU = this.state.users;
      newU.push(newUser);
      this.setState({ users: newU });
    }
  };

  handleChangeValue = ({ target: { value } }) => {
    this.setState({ value });
  };
  handleChangeDuration = ({ target: { value } }) => {
    this.setState({ duration: value });
  };
  formatValue = (value) => `${Number(value).toFixed(2)}%`;
  formatValueD = (value) => `${Number(value).toFixed(0)}D`;
  formatValueH = (value) => `${Number(value).toFixed(0)}H`;

  render() {
    let link =
      "http://ddragon.leagueoflegends.com/cdn/10.12.1/img/profileicon/" +
      this.props.infoJoueur.profileIconId +
      ".png";

    let result = toChoose(this.props.infoRank.tier);
    let rank = result.r;
    let averageTime = result.av;

    let wasted = this.props.infoRank.isRanked ? Math.floor(
      ((this.props.infoRank.wins + this.props.infoRank.loses) *
        (averageTime + 600)) /
        3600
    ) : 0;
    let dayW = Math.floor(wasted / 24);
    let hourW = wasted % 24;

    return (
      <div>
        <div>
          <Paper
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              height: 100,
              borderBottom: "1px solid",
              marginRight: 10,
            }}
            elevation={3}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderBottom: "1px solid",
              }}
            >
              <img src={link} alt="Icon" width="100" height="100" />
              <Typography variant="h5" gutterBottom style={{ marginLeft: 20 }}>
                {this.props.infoJoueur.name}
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: "50px",
              }}
            >
              <AnimatedNumber
                id="myNumber"
                value={this.props.infoRank.isRanked ? this.props.infoRank.winR : 0}
                formatValue={this.formatValue}
                style={{ fontSize: "40px" }}
                duration={2000}
              />
              <Typography variant="subtitle2" gutterBottom>
                ({this.props.infoRank.isRanked ? this.props.infoRank.wins : 0}W / {this.props.infoRank.isRanked ? this.props.infoRank.loses : 0}L)
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  fontSize: "50px",
                }}
              >
                <AnimatedNumber
                  id="myNumber2"
                  value={dayW}
                  formatValue={this.formatValueD}
                  style={{ fontSize: "40px" }}
                  duration={2000}
                />
                <AnimatedNumber
                  id="myNumber3"
                  value={hourW}
                  formatValue={this.formatValueH}
                  style={{ fontSize: "40px" }}
                  duration={2000}
                />
              </div>
              <Typography variant="subtitle2" gutterBottom>
                Wasted
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" gutterBottom style={{ marginRight: 20 }}>
               {this.props.infoRank.isRanked ? this.props.infoRank.tier + " " + this.props.infoRank.rank + " " + this.props.infoRank.lp + "LP" : "UNRANKED"}
              </Typography>
              <img src={rank} alt="Icon" width="100" height="100" style={{marginRight:20}}/>
              <a className="favLink" onClick={() => {window.localStorage.clear();window.location.reload();}} > Sign out </a>

            </div>


          </Paper>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 25,
            backgroundImage: "url(" + Background + ")",
            position: "fixed",
            bottom: 0,
            right: 0,
            left: 0,
            top: 101,
          }}
        >
          <Search registerName={this.storeAnewUser} />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 25,
              justifyContent: "center",
              width: "100%",
              overflow: "auto",
              height: "100%",
              flexWrap: "wrap",
            }}
          >
            {this.state.users.map((user) => (
              <FriendProfile
                deleteMe={this.deleteAuser}
                key={user}
                username={user}
              />
            ))}
            <Footer link={"https://imgur.com/gallery/kPHDsTO"}  type={"nouv"}>
              All rights reserved. Myleaguefriends.com isn't endorsed by Riot
              Games and doesn't reflect the views or opinions of Riot Games or
              anyone officially involved in producing or managing League of
              Legends. League of Legends and Riot Games are trademarks or
              registered trademarks of Riot Games, Inc. League of Legends © Riot
              Games, Inc.
            </Footer>
          </div>
        </div>
        <Snackbar
          open={this.state.open}
          autoHideDuration={7000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
            This user doesn't exist in EUW server ! Please verify if you the
            username is written correctly
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
