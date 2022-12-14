import { atom } from "recoil";

let data = {
  email: "",
  password: "",
  username: "",
  username2: "",
  fullname: "",
};

const authData = atom({
  key: "authData",
  default: data,
});

export default authData;
