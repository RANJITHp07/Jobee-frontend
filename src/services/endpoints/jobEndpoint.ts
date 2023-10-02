const jobRoutes = {
    filter: '/v6/api/job/search/filter',
    jobForm: '/v6/api/job',
    getLocations: '/v6/api/job/location/parts',
    getRoles: '/v6/api/job/roles/parts',
    getUser: (id:string) => `/v6/api/job/${id}`,
    getJobs: (userId:string) => `/v6/api/job/jobs/company/${userId}`,
    companyFilter: '/v6/api/job/companies/filter',
    deleteJob: (JobId:string) => `/v6/api/job/${JobId}`,
    searchJob: '/v6/api/job/search',
    jobApply: '/v4/api/profile/jobapplied',
    findSimilarJobs: '/v6/api/job/findsimilar',
    userExist: (id:string) => `/v4/api/profile/userExist/${id}`,
    getcompanyJob: (id:string) => `/v6/api/job/jobs/company/${id}`,
    updateApplication: '/v6/api/job',
    getJobapplication: (param:string) => `/v6/api/job/${param}`,
    jobCompanies: '/v6/api/job/get/companies',
    Jobroleserach: '/v6/api/job/role/search',
    mutualskills: '/v6/api/job/mutual/skills',
    savedorNot: '/v6/api/job/saved/exist',
    stopRecruiting: (id:string) => `/v6/api/job/stop/recruiting/${id}`,
  };
  
  export default jobRoutes;
  