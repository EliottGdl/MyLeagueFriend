import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { callAPIuser, callAPIrank, toChoose, callIsInGame } from "../util";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./Links.css";
import { Redirect, Link } from "react-router-dom";

export default class FriendProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoJoueur: undefined,
      infoRank: undefined,
      isLoading: true,
      inGame: undefined,
      redirect : false,
    };
  }

  render() {
    if (
      this.state.infoRank &&
      (this.state.infoRank.isRanked)

    ) {
      let link =
        "http://ddragon.leagueoflegends.com/cdn/10.12.1/img/profileicon/" +
        this.state.infoJoueur.profileIconId +
        ".png";

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
        <div>
        {this.state.redirect ? (<Redirect
          to={
            "/inGame/" +
            this.state.infoJoueur.id +
            "=" +
            this.state.infoJoueur.name
          }
        />) : 
        
        <Paper
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 260,
            height: 433,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 60,
            marginTop: 10,
          }}
          elevation={3}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 260,
            }}
          >
            <img
              style={{ marginTop: 20, borderRadius: "50%", marginBottom: 10 }}
              src={link}
              width="80"
              height="80"
            />

            {this.state.inGame ? (
              <Link
                to={
                  "/inGame/" +
                  this.state.infoJoueur.id +
                  "=" +
                  this.state.infoJoueur.name
                }
              >
                <Typography
                  style={{ color: "red", fontWeight: "bold" }}
                  variant="subtitle1"
                  gutterBottom
                >
                  {" "}
                  {this.state.infoJoueur.name} ({this.state.inGame.type}){" "}
                </Typography>
              </Link>
            ) : (
              <Typography variant="subtitle1" gutterBottom>
                {" "}
                {this.state.infoJoueur.name}{" "}
              </Typography>
            )}
          </div>

          <div
            style={{ width: 200, marginTop: 5, borderBottom: "1px solid" }}
          />
          <img
            style={{ marginTop: 17, marginBottom: 10 }}
            src={rank}
            width="100"
            height="100"
          />
          <Typography variant="subtitle1" gutterBottom>
            {this.state.infoRank.tier}{" "}
            {result.hr ? "" : this.state.infoRank.rank} {this.state.infoRank.lp}
            LP{" "}
            {this.state.infoRank.isFlex
              ? "(" + this.state.infoRank.isFlex + ")"
              : ""}
          </Typography>
          <Typography variant="subtitle1">
            {this.state.infoRank.winR}% (
            {this.state.infoRank.wins + this.state.infoRank.loses} games)
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "inline-block",
                height: 23,
                width: Math.floor(this.state.infoRank.winR * 2),
                background: "rgb(30, 144, 255)",
                textAlign: "center",
              }}
            >
              {" "}
              WINS{" "}
            </div>
            <div
              style={{
                display: "inline-block",
                textAlign: "center",
                height: 23,
                width: Math.floor(2 * (100 - this.state.infoRank.winR)),
                background: "rgb(178, 34, 34)",
              }}
            >
              {" "}
              LOSES{" "}
            </div>
          </div>
          <Typography variant="subtitle1">
            {dayW}D{hourW}H Wasted
          </Typography>

          <Button
            onClick={() => this.props.deleteMe(this.state.infoJoueur.name)}
          >
            Delete
          </Button>
        </Paper>
      } </div>);
    } else if (
      this.state.infoRank &&
      !(this.state.infoRank.isRanked)
    ) {
      let link =
        "http://ddragon.leagueoflegends.com/cdn/10.12.1/img/profileicon/" +
        this.state.infoJoueur.profileIconId +
        ".png";

      return (
        <Paper
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 260,
            height: 190,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 60,
            marginTop: 10,
          }}
          elevation={3}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 260,
            }}
          >
            <img
              style={{ marginTop: 20, borderRadius: "50%", marginBottom: 10 }}
              src={link}
              width="80"
              height="80"
            />
            <Typography
              variant="subtitle1"
              gutterBottom
            >
              {" "}
              {this.state.infoJoueur.name} (UNRANKED){" "}
            </Typography>
            <Button
            onClick={() => this.props.deleteMe(this.state.infoJoueur.name)}
          >
            Delete
          </Button>
          </div>
        </Paper>
      );
    } else {
      return (
        <Paper
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 260,
            height: 433,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 60,
            marginTop: 10,
          }}
          elevation={3}
        >
          <CircularProgress style={{ marginTop: 180 }} />
        </Paper>
      );
    }
  }

  prepare = async (username) => {

    let res1 = await callAPIuser(username);
    if(res1 == "error") {
      this.props.deleteMe(username)
    }
    let res2 = await callAPIrank(res1.id);
    let res3 = await callIsInGame(res1.id);

    this.setState({
      isLoading: false,
      infoRank: res2,
      infoJoueur: res1,
      inGame: res3,
    });
  };

  componentDidMount() {
    if (this.state.infoRank == null && this.state.infoJoueur == null) {
      this.prepare(this.props.username);
    }
  }
}
