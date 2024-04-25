import axios from "../lib/axios";

export const getRadio = async (id) => {
  try {
    const res = await axios.get(`/radio/${id}/`);
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getCurrentradiometadata = async (id) => {
  try {
    const res = await axios.get(`/current/${id}/`);
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getPlayedlist = async (id) => {
  try {
    const res = await axios.get(`/last/${id}/?limit=3`);
    return Promise.resolve(res.data.reverse());
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getNextlist = async (id) => {
  try {
    const res = await axios.get(`/next/${id}/?limit=3`);
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getRadios = async () => {
  try {
    const res = await axios.get(`/radios/`);
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};
