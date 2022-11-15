import Rocks from "./assets/svg/Rocks.svg";
import Wine from "./assets/svg/Wine.svg";
import Martine from "./assets/svg/Martini.svg";
import Flute from "./assets/svg/Flute.svg";
import Sloe from "./assets/svg/Sloe_Gin.svg";
import Vodka from "./assets/svg/Vodka.svg";
import Amaretto from "./assets/svg/Amaretto.svg";
import Aperol from "./assets/svg/Aperol.svg";
import TripleSec from "./assets/svg/Triple_Sec.svg";
import Southern from "./assets/svg/Southern_Comfort.svg";
import ClubSoda from "./assets/svg/Club_Soda.svg";
import Prosecco from "./assets/svg/Prosecco.svg";
import Peychaud from "./assets/svg/Peychaud's_Bitters.svg";
import CRANBERRY from "./assets/svg/Cranberry_Juice.svg";
import LimeJuice from "./assets/svg/Lime_Juice.svg";

export const quizData = [
  {
    id: 1,
    label: "Which glass is for a cosmopolitan?",
    hint: "",
    rightAnswer: {
      id: "3",
      label: "Martini",
    },
    bottle: [],
    option1: {
      icon: <Rocks width={49.43} height={78.11} />,
      id: "1",
    },
    option2: {
      icon: <Wine width={30.22} height={78.52} />,
      id: "2",
    },
    option3: {
      icon: <Martine width={44.43} height={78.11} />,
      id: "3",
    },
    option4: {
      icon: <Flute width={25.43} height={76.11} />,
      id: "4",
    },
  },
  {
    id: 2,
    label: "Which glass is for a cosmopolitan?????",
    hint: "",
    rightAnswer: {
      id: "2",
      label: "Wine",
    },
    bottle: [<Wine width={30.22} height={78.52} />],
    option1: {
      icon: <Sloe width={49.43} height={78.11} />,
      id: "1",
    },
    option2: {
      icon: <Amaretto width={44.43} height={78.11} />,
      id: "2",
    },
    option3: {
      icon: <Southern width={30.22} height={78.52} />,
      id: "3",
    },
    option4: {
      icon: <Vodka width={25.43} height={76.11} />,
      id: "4",
    },
  },
  {
    id: 3,
    label: "Which glass is for a cosmopolitan?????",
    hint: "",
    rightAnswer: {
      id: "2",
      label: "Wine",
    },
    bottle: [<Vodka width={25.43} height={76.11} />],
    option1: {
      icon: <TripleSec width={25.43} height={78.11} />,
      id: "1",
    },
    option2: {
      icon: <Sloe width={49.43} height={78.11} />,
      id: "2",
    },
    option3: {
      icon: <Aperol width={25.43} height={78.11} />,
      id: "3",
    },
    option4: {
      icon: <Amaretto width={44.43} height={78.11} />,
      id: "4",
    },
  },
  {
    id: 4,
    label: "Which glass is for a cosmopolitan?????",
    hint: "",
    rightAnswer: {
      id: "2",
      label: "Wine",
    },
    bottle: [
      <Vodka width={25.43} height={76.11} />,
      <TripleSec width={25.43} height={78.11} />,
    ],
    option1: {
      icon: <Southern width={30.22} height={78.52} />,
      id: "1",
    },
    option2: {
      icon: <CRANBERRY width={49.43} height={78.11} />,
      id: "2",
    },
    option3: {
      icon: <Prosecco width={25.43} height={78.11} />,
      id: "3",
    },
    option4: {
      icon: <Peychaud width={30.43} height={78.11} />,
      id: "4",
    },
  },
  {
    id: 5,
    label: "Which glass is for a cosmopolitan?????",
    hint: "",
    rightAnswer: {
      id: "1",
      label: "Lime Juice",
    },
    bottle: [
      <Vodka width={25.43} height={76.11} />,
      <TripleSec width={25.43} height={78.11} />,
      <CRANBERRY width={49.43} height={78.11} />,
    ],
    option1: {
      icon: <LimeJuice width={30.22} height={78.11} />,
      id: "1",
    },
    option2: {
      icon: <Sloe width={49.43} height={78.11} />,
      id: "2",
    },
    option3: {
      icon: <Aperol width={25.43} height={78.11} />,
      id: "3",
    },
    option4: {
      icon: <Amaretto width={44.43} height={78.11} />,
      id: "4",
    },
  },
];
