import { atom } from "recoil";

let dummy = [
  {
    dateFinished: "12/11/22",
    timeStamp: "2015-06-21T06:24:44.124Z",
    score: "09",
  },
  {
    dateFinished: "13/11/22",
    timeStamp: "2016-06-21T06:24:44.124Z",
    score: "10",
  },
  {
    dateFinished: "14/11/22",
    timeStamp: "2017-06-21T06:24:44.124Z",
    score: "07",
  },
];

const recordData = atom({
  key: "recordData",
  default: dummy,
});

export default recordData;
