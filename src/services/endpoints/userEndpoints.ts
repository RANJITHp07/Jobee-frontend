const userRoutes = {
    createProfile: '/v4/api/profile',

    getProfile: '/v4/api/profile/',

    statusJob: '/v4/api/profile/getusers/',

    updateProfile: '/v4/api/profile/',

    upload: (category:string) => `/v1/api/upload?category=${category}`,

    updateProfilePhoto: '/v4/api/profile/upload/',

    getShortlist: '/v4/api/profile/shortlist/',

    unShortlist: '/v4/api/profile/unshortlist/',

    statusShortlist: '/v4/api/profile/filter/',

    shortlistUsers: '/v4/api/profile/user/shortlist',

    unshortlistUsers: '/v4/api/profile/user/unshortlist',

    getView: '/v4/api/profile/status/jobapplied',

    getapplicant: '/v4/api/profile/jobapplied/',

    updateStatus: '/v4/api/profile/status/jobapplied',

    jobcount: '/v4/api/profile/countjobapplication/',
  };
  
  export default userRoutes;
