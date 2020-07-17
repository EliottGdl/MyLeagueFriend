import React, { Component } from "react";
import TeamProfile from "./teamProfile";
import Backscreen from "../assets/backInGame.jpg";
import Typography from "@material-ui/core/Typography";
import { getChampionsInfo, callIsInGame } from "../util";
import { Redirect } from "react-router-dom";

export default class MainATH extends Component {
  constructor(props) {
    super(props);

    this.state = { goHome:false, gameInfo: undefined, champsInfo: undefined };
  }

  startSearchingApi = async () => {
    let res1 = await getChampionsInfo();
    let res2 = await callIsInGame(this.props.users[0]);

    this.setState({ gameInfo: res2, champsInfo: res1 });
  };

  componentDidMount() {
    document.title = 'Game info : '+this.props.users[1];
    this.startSearchingApi();
  }

  render() {
    let gameLength = 0;
    let i = 0;
    let j = 0;

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundImage: "url(" + Backscreen + ")",
          position: "fixed",
          bottom: 0,
          right: 0,
          left: 0,
          top: 0,
        }}
      >
        {this.state.goHome ? (<Redirect
          to={
            "/"
          }
        />) : 
        <Typography style={{ marginTop: 60 }} variant="h4" gutterBottom>
          In game for{" "}
          {this.state.gameInfo ? Math.floor(this.state.gameInfo.gameLength / 60): "-"} minutes
        </Typography>
        }
        {this.state.gameInfo ? (
    <React.Fragment>
    <div
              style={{
                marginTop: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {this.state.gameInfo.participants.map((elem) => {
                let team = 0;
                if (i <= 4) {
                  i++;
                  return (
                    <TeamProfile
                      part={team}
                      userId={elem.summonerId}
                      champions={this.state.champsInfo}
                      champId={elem.championId}
                    />
                  );
                }
              })}
            </div>
            <div
              style={{
                marginTop: 60,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {this.state.gameInfo.participants.map((elem) => {
                let team = 1;
                if (j > 4) {
                  return (
                    <TeamProfile
                      part={team}
                      userId={elem.summonerId}
                      champions={this.state.champsInfo}
                      champId={elem.championId}
                    />
                  );
                }
                j++;
              })}

            </div>
            <a href={"https://porofessor.gg/fr/live/euw/" + this.props.users[1]} > Click here to see the Porofessor analysis </a>

            <a onClick={() => this.setState({goHome:true})}> Return home </a>
            </React.Fragment>
        ) : (
          <div> 
          "Loading"
          <a onClick={() => this.setState({goHome:true})}> Return home </a>
          </div>

        )}
        
      </div>
    );
  }
}
