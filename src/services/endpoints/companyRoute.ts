const companyRoutes = {
    uploadLogo: (category:string) => `/v1/api/upload?category=${category}`,

    createCompany: '/v3/api/company',

    getJobs: (id:string) => `/v3/api/company/getjobs/${id}`,

    getCompany: (id:string) => `/v3/api/company/${id}`,

    updateCompany: (id:string) => `/v3/api/company/${id}`,

    getReviews: (id:string) => `/v3/api/company/review/${id}`,

    postReview: '/v3/api/company/review',

    getAllCompanies: '/v3/api/company/getAll/companies',

    searchCompany: '/v3/api/company/search/companies',
    
    getPhoto: `/v1/api/upload`,
  };
  
  export default companyRoutes;
  