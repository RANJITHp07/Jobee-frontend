import userRoutes from "../services/endpoints/userEndpoints"; 
import Api from "@/services/api";

const getHeaders = (token: string) => ({
  headers: {
    Authorization: token,
  },
});

export const createProfile = async (userId: string, token: string) => {
  try {
    const res = await Api.post(userRoutes.createProfile, { userId: userId }, getHeaders(token));
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getProfile = async (userId: string, token: string) => {
  try {
    const res = await Api.get(`${userRoutes.getProfile}${userId}`, getHeaders(token));
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const statusJob = async (id: string, token: string) => {
  try {
    const res = await Api.get(`${userRoutes.statusJob}${id}`, getHeaders(token));
    return res;
  } catch (err) {
    throw err;
  }
};

export const updateprofile = async (userId: string, update: any, token: string) => {
  try {
    const res = await Api.put(`${userRoutes.updateProfile}${userId}`, update, getHeaders(token));
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const upload = async (category: string, file: FormData, token: string) => {
  try {
    const res = await Api.post(`${userRoutes.upload(category)}`, file);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateProfilephoto = async (id: string, file: string, category: string, token: string) => {
  try {
    const res = await Api.put(`${userRoutes.updateProfilePhoto}${id}?category=${category}`, { file: file }, getHeaders(token));
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getShortlist = async (id: string, token: string) => {
  try {
    const res = await Api.get(`${userRoutes.getShortlist}${id}`, getHeaders(token));
    return res;
  } catch (err) {
    throw err;
  }
};

export const unShortlist = async (id: string, token: string) => {
  try {
    const res = await Api.get(`${userRoutes.unShortlist}${id}`, getHeaders(token));
    return res;
  } catch (err) {
    throw err;
  }
};

export const statusShortlist = async (id: string, status: string[], token: string) => {
  try {
    const res = await Api.get(`${userRoutes.statusShortlist}${id}`, {
      params: {
        status: status,
      },
      ...getHeaders(token),
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const shortlistusers = async (id: string, userId: string[], token: string) => {
  try {
    const res = await Api.put(userRoutes.shortlistUsers, { id, userId }, getHeaders(token));
    return res;
  } catch (err) {
    throw err;
  }
};

export const unshortlistusers = async (id: string, userId: string, token: string) => {
  try {
    const res = await Api.put(userRoutes.unshortlistUsers, { id, userId }, getHeaders(token));
    return res;
  } catch (err) {
    throw err;
  }
};

export const getView = async (id: string, userId: string, token: string) => {
  const res = await Api.put(`${userRoutes.getView}`, { id, userId, status: "view" }, getHeaders(token));
};

export const getapplicant = async (id: string, token: string) => {
  try {
    const res = await Api.get(`${userRoutes.getapplicant}${id}`, getHeaders(token));
    return res;
  } catch (err) {
    throw err;
  }
};

export const updateStatus = async (id: string, userId: string, status: string, token: string) => {
  try {
    const res = await Api.put(`${userRoutes.updateStatus}`, { id, userId, status }, getHeaders(token));
  } catch (err) {
    throw err;
  }
};

export const jobcount = async (id: string) => {
  try {
    const res = await Api.get(`${userRoutes.jobcount}${id}`);
    return res;
  } catch (err) {
    throw err;
  }
};
