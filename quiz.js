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
import PinappleSlice from "./assets/svg/Pinapple_Slice.svg";
import Orange from "./assets/svg/Orange_Slice.svg";
import Lemon from "./assets/svg/Lemon_Slice.svg";
import ChocolateSyrup from "./assets/svg/Chocolate_Syrup.svg";
import { Text } from "react-native";

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
      id: "1",
      label: "Sloe Gin",
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
      id: "1",
      label: "Triple Sec",
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
      label: "Cranberry Juice",
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
  {
    id: 6,
    label: "Which garnish is in a cosmopolitan?",
    hint: "",
    rightAnswer: {
      id: "3",
      label: "Lemon",
    },
    bottle: [
      <Vodka width={25.43} height={76.11} />,
      <TripleSec width={25.43} height={78.11} />,
      <CRANBERRY width={49.43} height={78.11} />,
      <LimeJuice width={30.22} height={78.11} />,
    ],
    option1: {
      icon: (
        <>
          <Text
            style={{
              marginTop: 10,
              fontFamily: "Truculenta-Regular",
              fontSize: 16,
            }}
          >
            Orange
          </Text>
          <Orange width={25.43} height={50.11} />
        </>
      ),
      id: "1",
    },
    option2: {
      icon: (
        <>
          <Text
            style={{
              marginTop: 10,
              fontFamily: "Truculenta-Regular",
              fontSize: 16,
            }}
          >
            Pineapple
          </Text>
          <PinappleSlice width={25.43} height={50.11} />
        </>
      ),
      id: "2",
    },
    option3: {
      icon: (
        <>
          <Text
            style={{
              marginTop: 10,
              fontFamily: "Truculenta-Regular",
              fontSize: 16,
            }}
          >
            Lemon
          </Text>
          <Lemon width={25.43} height={50.11} />
        </>
      ),
      id: "3",
    },
    option4: {
      icon: (
        <>
          <Text
            style={{
              marginTop: 5,
              fontFamily: "Truculenta-Regular",
              fontSize: 16,
              marginBottom: 5,
            }}
          >
            Chocolate Syrup
          </Text>
          <ChocolateSyrup width={25.43} height={50.11} />
        </>
      ),
      id: "4",
    },
  },
];
