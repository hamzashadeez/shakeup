import { atom } from 'recoil';

let data = {
    email: '',
    password: '',
    username: "",
    name: ""
}

const userData = atom({
  key: 'userData', 
  default: data, 
});

export default userData;