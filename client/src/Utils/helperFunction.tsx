import axios from "axios";
import { localStorageUser, months } from "./globalConstants";

export const apiProvider = axios.create({});

export const getUserData = () => {
  return JSON.parse(localStorage.getItem(localStorageUser) || "{}");
};

export const getHeaders = (token: string) => {
    return {
        'Authorization': `Bearer ${token}`
    }
}

export const getReadableTime = (ISODate: string) => {
  const readable = new Date(ISODate);        
  const month = readable.getMonth();
  const date = readable.getDate();        
  const year = readable.getFullYear();

  const monthLong = months[month];
  const fulldate = monthLong + " " + date + ", " + year;
  return fulldate;
};
