import Api from "@/services/api";
import paymentRoutes from "../services/endpoints/paymentEndpoint";

const getHeaders = (token:string) => ({
  headers: {
    Authorization: token,
  },
});

export const getPlans = async () => {
  try {
    const res = await Api.get(paymentRoutes.getPlans);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getUsePayment = async (userId:string, token:string) => {
  try {
    const res = await Api.get(paymentRoutes.getUsePayment(userId), getHeaders(token));
    return res;
  } catch (err) {
    throw err;
  }
};

export const payment = async (stripeCustomerId:string, token:string) => {
  try {
    const res = await Api.get(paymentRoutes.payment(stripeCustomerId), getHeaders(token));
    return res;
  } catch (err) {
    throw err;
  }
};
