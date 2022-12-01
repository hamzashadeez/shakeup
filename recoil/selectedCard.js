import { atom } from "recoil";

const selectedCard = atom({
  key: "selectedCard",
  default: 0,
});

export default selectedCard;
