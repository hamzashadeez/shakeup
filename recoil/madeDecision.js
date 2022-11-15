import { atom } from "recoil";

const madeDecision = atom({
  key: "madeDecision",
  default: false,
});

export default madeDecision;
