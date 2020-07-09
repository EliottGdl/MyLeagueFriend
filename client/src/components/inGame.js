import React, { Component } from "react";
import { useParams } from "react-router-dom";
import MainATH from "./mainATH";
import Footer from "./footer"

export default () => {

  let { username } = useParams();
  let allUsers = username.split("=");


  return (
    <div>
    <MainATH users={allUsers}/>
    <Footer link={"https://imgur.com/gallery/kPHDsTO"}>
    All rights reserved.
    Myleaguefriends.com isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
    </Footer>
    </div>
  );
};
