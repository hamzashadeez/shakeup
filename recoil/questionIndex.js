import { atom } from "recoil";

const questionIndex = atom({
  key: "questionIndex",
  default: 0,
});

export default questionIndex;
