import { atom } from "recoil";

const progress = atom({
  key: "progress",
  default: 0,
});

export default progress;
