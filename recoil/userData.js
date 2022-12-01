import { atom } from "recoil";

let data = {
  email: "",
  password: "",
  username: "",
  name: "",
};

const userData = atom({
  key: "userData",
  default: null,
});

export default userData;
