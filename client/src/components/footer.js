//this is a higher-order component that wraps other components placing them in footer
import React from "react";

var style = {
    //backgroundColor: "rgb(100,100,100,0.6)",
    textAlign: "center",
    position: "absolute", 
    left: 0 , right: 0, bottom: 0,
    display:"flex",
    width: "100%",
    fontSize:"0.8em",
    paddingBottom : 5,
};

var style2 = {
    //backgroundColor: "rgb(100,100,100,0.6)",
    textAlign: "center",
    marginTop : 665,
    display:"flex",
    width: "100%",
    fontSize:"0.8em",
    paddingBottom : 5,
};


const Footer = ({children,link,type}) => ({



    render() {

        let finalStyle = type ? style2 : style;

        return (
            <footer style={finalStyle}>
All rights reserved. Myleaguefriends.com isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.                <br/>
                Link of the background : {link}    -     Website made by Eliott Gandiolle https://github.com/eliottgdl
            </footer>
        );
    }
});

export default Footer;