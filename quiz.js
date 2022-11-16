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
// import ClubSoda from "./assets/svg/Club_Soda.svg";
import Prosecco from "./assets/svg/Prosecco.svg";
import Peychaud from "./assets/svg/Peychaud's_Bitters.svg";
import CRANBERRY from "./assets/svg/Cranberry_Juice.svg";
import LimeJuice from "./assets/svg/Lime_Juice.svg";
import PinappleSlice from "./assets/svg/Pinapple_Slice.svg";
import Orange from "./assets/svg/Orange_Slice.svg";
import Lemon from "./assets/svg/Lemon_Slice.svg";
import OneOZ from "./assets/svg/1_oz.svg";
import One2OZ from "./assets/svg/1:2_oz.svg";
import One5OZ from "./assets/svg/1.5_oz.svg";
import TwoOZ from "./assets/svg/2_oz.svg";
import ThreeOZ from "./assets/svg/3_oz.svg";
import S1 from "./assets/svg/s1.png";
import S2 from "./assets/svg/s2.png";
import S3 from "./assets/svg/s3.png";
import S4 from "./assets/svg/s4.png";
import ChocolateSyrup from "./assets/svg/Chocolate_Syrup.svg";
import { Text, Image } from "react-native";

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
    label: "Which ingredient is in a cosmopolitan?",
    hint: "",
    rightAnswer: {
      id: "4",
      label: "Vodka",
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
    label: "Which ingredient is in a cosmopolitan?",
    hint: "",
    rightAnswer: {
      id: "1",
      label: "Triple Sec",
    },
    bottle: [
      <Wine width={30.22} height={78.52} />,
      <Vodka width={25.43} height={76.11} />,
    ],
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
    label: "Which ingredient is in a cosmopolitan?",
    hint: "",
    rightAnswer: {
      id: "2",
      label: "Cranberry Juice",
    },
    bottle: [
      <Wine width={30.22} height={78.52} />,
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
    label: "Which ingredient is in a cosmopolitan?",
    hint: "",
    rightAnswer: {
      id: "1",
      label: "Lime Juice",
    },
    bottle: [
      <Wine width={30.22} height={78.52} />,
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
      <Wine width={30.22} height={78.52} />,
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
  {
    id: 7,
    label: "How many ounces for Vodka?",
    hint: "",
    rightAnswer: {
      id: "1",
      label: "1.5 oz",
    },
    bottle: [
      <Image
        source={S1}
        resizeMode="contain"
        style={{ width: 80, height: 80 }}
      />,
    ],
    option1: {
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
            1.5 oz
          </Text>
          <One5OZ width={25.43} height={50.11} />
        </>
      ),
      id: "1",
    },
    option2: {
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
            1 oz
          </Text>
          <OneOZ width={25.43} height={50.11} />
        </>
      ),
      id: "2",
    },
    option3: {
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
            1/2 oz
          </Text>
          <One2OZ width={25.43} height={50.11} />
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
            3 oz
          </Text>
          <ThreeOZ width={35.43} height={50.11} />
        </>
      ),
      id: "4",
    },
  },

  {
    id: 8,
    label: "How many ounces for Triple Sec?",
    hint: "",
    rightAnswer: {
      id: "2",
      label: "1.2 oz",
    },
    bottle: [
      <Image
        source={S2}
        resizeMode="contain"
        style={{ width: 82, height: 82 }}
      />,
    ],
    option1: {
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
            2 oz
          </Text>
          <TwoOZ width={25.43} height={50.11} />
        </>
      ),
      id: "1",
    },
    option2: {
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
            1/2 oz
          </Text>
          <One2OZ width={25.43} height={50.11} />
        </>
      ),
      id: "2",
    },
    option3: {
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
            3 oz
          </Text>
          <ThreeOZ width={40.43} height={50.11} />
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
            1 oz
          </Text>
          <OneOZ width={35.43} height={50.11} />
        </>
      ),
      id: "4",
    },
  },
  {
    id: 9,
    label: "How many ounces for Cranberry Juice?",
    hint: "",
    rightAnswer: {
      id: "3",
      label: "1/2 oz",
    },
    bottle: [
      <Image
        source={S3}
        resizeMode="contain"
        style={{ width: 82, height: 82 }}
      />,
    ],
    option1: {
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
            1.5 oz
          </Text>
          <One5OZ width={25.43} height={50.11} />
        </>
      ),
      id: "1",
    },
    option2: {
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
            3 oz
          </Text>
          <ThreeOZ width={45.43} height={50.11} />
        </>
      ),
      id: "2",
    },
    option3: {
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
            1/2 oz
          </Text>
          <One2OZ width={26.43} height={50.11} />
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
            1 oz
          </Text>
          <OneOZ width={35.43} height={50.11} />
        </>
      ),
      id: "4",
    },
  },
  {
    id: 10,
    label: "How many ounces for Lime Juice?",
    hint: "",
    rightAnswer: {
      id: "1",
      label: "1/2 oz",
    },
    bottle: [
      <Image
        source={S4}
        resizeMode="contain"
        style={{ width: 82, height: 82 }}
      />,
    ],
    option1: {
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
            1/2 oz
          </Text>
          <One2OZ width={26.43} height={50.11} />
        </>
      ),
      id: "1",
    },
    option2: {
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
            1 oz
          </Text>
          <OneOZ width={30.43} height={50.11} />
        </>
      ),
      id: "2",
    },
    option3: {
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
            3 oz
          </Text>
          <ThreeOZ width={40.43} height={50.11} />
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
            1.5 oz
          </Text>
          <One5OZ width={35.43} height={50.11} />
        </>
      ),
      id: "4",
    },
  },
];

export const order = [
  { id: 1, name: "Chill glass" },
  { id: 2, name: "Fill shaker with ingredients and ice" },
  { id: 3, name: "Shake" },
  { id: 4, name: "Strain" },
  { id: 5, name: "Garnish" },
];
