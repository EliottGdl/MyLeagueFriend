import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { callAPIrank, toChoose } from "../util";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

export default class TeamProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoRank: undefined,
    };
  }

  ready = async () => {
    let res = await callAPIrank(this.props.userId);
    this.setState({ infoRank: res });
  };

  componentDidMount() {
    this.ready();
  }

  render() {

    let style = {
      color: "white",
      borderStyle: "solid",
      borderColor: "white",
      paddingLeft : 10,
      paddingRight : 10,
    };

    let color =
      this.props.part == 0 ? "rgb(30, 144, 255,0.8)" : "rgb(178, 34, 34,0.8)";
    let champ = "";

    for (let champ1 of Object.entries(this.props.champions.data)) {
      if (champ1[1].id == this.props.champId) {
        console.log(champ1[1]);
        champ = champ1[1].name;
      }
    }

    if (this.state.infoRank) {
      let result = toChoose(this.state.infoRank.tier);
      let rank = result.r;
      let averageTime = result.av;
      let wasted = Math.floor(
        ((this.state.infoRank.wins + this.state.infoRank.loses) *
          (averageTime + 600)) /
          3600
      );
      let dayW = Math.floor(wasted / 24);
      let hourW = wasted % 24;

      return (
        <Paper
          elevation={3}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginLeft: 20,
            minWidth: 200,
            marginRight: 20,
            height: 320,
            backgroundColor: color,
          }}
        >
          {this.state.infoRank.isRanked ? (
            <div style={{display: "flex",
            alignItems: "center",
            flexDirection: "column",}}>
              <Typography style={{ marginTop: 15 }} variant="subtitle1">
                {this.state.infoRank.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {" (" + champ + ")"}
              </Typography>

              <img
                style={{ marginTop: 17, marginBottom: 10 }}
                src={rank}
                width="100"
                height="100"
              />
              <Typography variant="subtitle1" gutterBottom>
                {this.state.infoRank.tier} {this.state.infoRank.rank}{" "}
                {this.state.infoRank.lp}LP{" "}
                {this.state.infoRank.isFlex ? this.state.infoRank.isFlex : ""}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {this.state.infoRank.winR}% (
                {this.state.infoRank.wins + this.state.infoRank.loses} games)
              </Typography>

              {this.state.infoRank.winR > 63 ? (
                <Typography
                  style={style}
                  variant="subtitle1"
                >
                  SMURFING ?
                </Typography>
              ) : this.state.infoRank.winR > 58 ||
                (this.state.infoRank.wins + this.state.infoRank.loses > 200 &&
                  this.state.infoRank.winR > 55) ? (
                <Typography
                  style={style}
                  variant="subtitle1"
                >
                  GOOD
                </Typography>
              ) : this.state.infoRank.winR < 43 ? (
                <Typography
                  style={style}
                  variant="subtitle1"
                >
                  Very bad
                </Typography>
              ) : this.state.infoRank.wins + this.state.infoRank.loses > 1500 && this.state.infoRank.winR < 51 ? (
                <Typography
                  style={style}
                  variant="subtitle1"
                >
                  STUCK
                </Typography>)
                :
                ""
              }
            </div>
          ) : (
            champ + " UNRANKED"
          )}
        </Paper>
      );
    } else {
      return (
        <Paper
          elevation={3}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginLeft: 20,
            minWidth: 200,
            marginRight: 20,
            height: 320,
            backgroundColor: color,
          }}
        >
          <CircularProgress style={{ marginTop: 180 }} />
        </Paper>
      );
    }
  }
}
