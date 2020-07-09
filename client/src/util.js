import Iron from "./assets/ranks/Emblem_IRON.png";
import Br from "./assets/ranks/Emblem_BRONZE.png";
import Sil from "./assets/ranks/Emblem_SILVER.png";
import Gold from "./assets/ranks/Emblem_GOLD.png";
import Plat from "./assets/ranks/Emblem_PLATINUM.png";
import Diam from "./assets/ranks/Emblem_DIAMOND.png";
import Mas from "./assets/ranks/Emblem_MASTER.png";
import Gm from "./assets/ranks/Emblem_GRANDMASTER.png";
import Chal from "./assets/ranks/Emblem_CHALLENGER.png";

export let callAPIuser = async (username) => {

  let res1 = await fetch("/profile?username=" + username);
  let res = await res1.text();
  if (res != "error") {

  let infos = JSON.parse(res);
  return infos;
  } 
  return "error";
};

export let callAPIrank = async (id) => {
  let res1 = await fetch("/rank?id=" + id);
  let res = await res1.text();

  if (res != "error") {
    res = JSON.parse(res);
    let joueur = {};
    let joueur2 = {};

    for (let i = 0; i < res.length; i++) {
      if (res[i].tier) {
        if (res[i].queueType == "RANKED_SOLO_5x5") {
          joueur.name = res[i].summonerName;
          joueur.tier = res[i].tier;
          joueur.rank = res[i].rank;
          joueur.lp = res[i].leaguePoints;
          joueur.winR =
            Math.floor((res[i].wins * 10000) / (res[i].losses + res[i].wins)) /
            100;
          joueur.wins = res[i].wins;
          joueur.loses = res[i].losses;
        } else {
          joueur2.name = res[i].summonerName;
          joueur2.tier = res[i].tier;
          joueur2.rank = res[i].rank;
          joueur2.lp = res[i].leaguePoints;
          joueur2.winR =
            Math.floor((res[i].wins * 10000) / (res[i].losses + res[i].wins)) /
            100;
          joueur2.wins = res[i].wins;
          joueur2.loses = res[i].losses;
        }
      }
    }

      joueur.isRanked = true;
      joueur2.isRanked = true;

      if (joueur.name) {
        joueur.isFlex = undefined;
        return joueur;
      } else if (joueur2.name) {
        joueur2.isFlex = "FLEX";
        return joueur2;
      } else {
        joueur.isRanked = false;
        return joueur;
      }
    
  }
  return "error";
  //Math.floor(this.props.winrate * 100) / 100
};

export let toChoose = (tier) => {
  let rank;
  let averageTime;
  let highRank = false;
  switch (tier) {
    case "IRON":
      rank = Iron;
      averageTime = 1778;
      break;
    case "BRONZE":
      rank = Br;
      averageTime = 1784;
      break;
    case "SILVER":
      rank = Sil;
      averageTime = 1757;
      break;
    case "GOLD":
      rank = Gold;
      averageTime = 1728;
      break;
    case "PLATINUM":
      rank = Plat;
      averageTime = 1674;
      break;
    case "DIAMOND":
      rank = Diam;
      averageTime = 1599;
      break;
    case "MASTER":
      rank = Mas;
      highRank = true;
      averageTime = 1543;
      break;
    case "GRANDMASTER":
      rank = Gm;
      highRank = true;

      averageTime = 1557;
      break;
    case "CHALLENGER":
      averageTime = 1571;

      highRank = true;
      rank = Chal;
      break;
  }

  return { r: rank, av: averageTime, hr: highRank };
};

export let callIsInGame = async (id) => {

  let res1 = await fetch("/current?username=" + id);
  let res = await res1.text();
  let inGame = null;

  if (res != "error") {
    res = JSON.parse(res);
    inGame = res;

    inGame.type = "UNDEFINED";
    if (res.gameQueueConfigId == 420) {
      inGame.type = "RANKED";
    } else if (res.gameQueueConfigId == 440) {
      inGame.type = "FLEX";
    } else if (res.gameQueueConfigId == 400) {
      inGame.type = "NORMAL";
    } else if (res.gameQueueConfigId == 450) {
      inGame.type = "ARAM";
    }
    console.log(res);
  }

  return inGame;
};

export let getChampionsInfo = async () => {

  let res3 = await fetch("/champion");
  let res4 = await res3.text();

  if (res4 != "error") {
    return JSON.parse(res4);
  }
  return res4;
  
};
