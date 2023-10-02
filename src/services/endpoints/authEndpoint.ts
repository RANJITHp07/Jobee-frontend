const authRoutes = {
    signin: '/v4/api/auth/signin',

    Adminsignin: '/v4/api/auth/admin/signin',

    login: '/v4/api/auth/login',

    Adminlogin: '/v4/api/auth/admin/login',

    getAdmin: (adminId: string) => `/v4/api/auth/admin/${adminId}`,

    UpdatePassword: '/v4/api/auth',

    sendEmail: '/v4/api/auth/verify',

    AdminsendEmail: '/v4/api/auth/admin/verify',

    emailVerification: '/v4/api/auth/otp',

    getUser: (id: string) => `/v4/api/auth?id=${id}`,

    getrole: (role: string) => `/v4/api/auth?role=${role}`,

    getEmail: (email: string) => `/v4/api/auth?email=${email}`,
    
    updateAuth: (email: string) => `/v4/api/auth/update/${email}`,
  };
  
  export default authRoutes;
  