const paymentRoutes = {
    getPlans: '/v1/api/plans',
    getUsePayment: (userId:string) => `/v1/api/plans/user/${userId}`,
    payment: (stripeCustomerId:string) => `/v1/api/plans/subs/${stripeCustomerId}`,
  };
  
  export default paymentRoutes;
  