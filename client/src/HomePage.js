import React, { Component } from "react";
import Search from "./components/search.js";
import Profile from "./components/profile.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Backscreen from "./assets/runeterraHome.jpg";
import { callAPIuser, callAPIrank, callIsInGame } from "./util";
import { Redirect } from "react-router-dom";
import Footer from "./components/footer";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import CookieConsent from "react-cookie-consent";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    let userN = undefined;
    let localStorage = window.localStorage;
    userN = localStorage.getItem("mainUser");

    this.state = {
      isLoading: true,
      basicUsername: userN,
      infoRank: null,
      infoJoueur: null,
      inGame: null,
    };
  }

  registerBaseUser = async (username) => {
    let localStorage = window.localStorage;
    localStorage.setItem("mainUser", username);
    this.setState({ basicUsername: username });
    let res1 = await callAPIuser(username);
    let res2 = await callAPIrank(res1.id);
    let res3 = await callIsInGame(res1.id);
    this.setState({
      isLoading: false,
      infoRank: res2,
      infoJoueur: res1,
      inGame: res3,
    });
  };

  startLoading = async (username) => {
    let res1 = await callAPIuser(username);
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
    if (
      this.state.basicUsername != null &&
      this.state.infoRank == null &&
      this.state.infoJoueur == null
    ) {
      this.startLoading(this.state.basicUsername);
      document.title = this.state.basicUsername + " profile";
    } else {
      document.title = "Home page";
    }
  }

  render() {
    return (
      <div>
        {this.state.inGame == null ? (
          <div>
            {this.state.basicUsername && true ? (
              this.state.isLoading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: 400,
                  }}
                >
                  Your profile is loading, please wait a few second (refresh the
                  page if it's to long) ...
                  <CircularProgress style={{ marginTop: 20 }} />
                </div>
              ) : (
                <div>
                  <Profile
                    infoJoueur={this.state.infoJoueur}
                    infoRank={this.state.infoRank}
                  />
                </div>
              )
            ) : (
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
                <ThemeProvider theme={theme}>
                  <Typography
                    variant="h2"
                    gutterBottom
                    style={{
                      color: "white",
                      marginTop: 280,
                      textAlign: "center",
                    }}
                  >
                    Check out how your friends are doing in league ranked
                  </Typography>
                  <Typography
                    variant="h2"
                    gutterBottom
                    style={{ color: "white", textAlign: "center" }}
                  >
                    But first, tell us what's your username ?
                  </Typography>
                </ThemeProvider>

                <Search registerName={this.registerBaseUser} />
                <CookieConsent
                  location="bottom"
                  buttonText="Accept"
                  style={{display:"flex",flexDirection:"row",alignItems:"center", background: "#2B373B" }}

                  buttonStyle={{ color: "#4e503b", fontSize: "13px", width : 200}}
                  expires={150}
                >
                  This website uses cookies to enhance the user experience. By continuing your visit you agree to the use of them.
                </CookieConsent>
                <Footer
                  link={
                    "https://www.pexels.com/fr-fr/photo/astronomie-celebrites-ciel-constellation-355465/"
                  }
                >
                  All rights reserved. Myleaguefriends.com isn't endorsed by
                  Riot Games and doesn't reflect the views or opinions of Riot
                  Games or anyone officially involved in producing or managing
                  League of Legends. League of Legends and Riot Games are
                  trademarks or registered trademarks of Riot Games, Inc. League
                  of Legends © Riot Games, Inc.
                </Footer>
              </div>
            )}
          </div>
        ) : (
          <Redirect
            to={
              "/inGame/" +
              this.state.infoJoueur.id +
              "=" +
              this.state.infoJoueur.name
            }
          />
        )}
      </div>
    );
  }
}
//"https://imgur.com/gallery/kPHDsTO"}
