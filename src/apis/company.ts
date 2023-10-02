import Api from "@/services/api";
import companyRoutes from "@/services/endpoints/companyRoute"; 

const getHeaders = (token: string) => ({
   headers: {
       Authorization: token,
   },
});

export const uploadlogo = async (file: FormData, category: string) => {
    try {
        const res = await Api.post(companyRoutes.uploadLogo(category), file);
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const createCompany = async (company: any, token: string) => {
     try {
        const res = await Api.post(companyRoutes.createCompany, company, getHeaders(token));
        return res;
     } catch (err) {
        throw err;
     }
}

export const getJobs = async (id: string, token: string) => {
    try {
        const res = await Api.get(companyRoutes.getJobs(id), getHeaders(token));
        return res;
     } catch (err) {
        throw err;
     }
}

export const getCompany = async (id: string) => {
    try {
        const res = await Api.get(companyRoutes.getCompany(id));
        return res;
    } catch (err) {
        throw err;
    }
}

export const updateCompany = async (id: string, update: any, token: string) => {
    try {
        const res = await Api.put(companyRoutes.updateCompany(id), update, getHeaders(token));
        return res;
     } catch (err) {
        throw err;
     }
}

export const getReviews = async (id: string) => {
     try {
       const res = await Api.get(companyRoutes.getReviews(id));
       return res;
    } catch (err) {
        throw err;
     }
}

export const postReviews = async (id: string, username: string, review: string, rating: number, token: string) => {
    try {
      const res = await Api.post(companyRoutes.postReview, { _id: id, username: username, review: review, rating: rating }, getHeaders(token));
      return res;
   } catch (err) {
       throw err;
    }
}

export const getAllCompanies = async () => {
   try {
      const res = await Api.get(companyRoutes.getAllCompanies);
      return res;
   } catch (err) {
      throw err;
   }
}

export const searchCompany = async (search: string) => {
   try {
      const res = await Api.get(companyRoutes.searchCompany, {
         params: {
           search: search
         }
       });
       return res;
   } catch (err) {
      throw err;
   }
}

export const getPhoto = async (imageName: string) => {
   try {
      const res = await Api.get(companyRoutes.getPhoto, {
         params: {
           imageName
         }
       });
       return res;
   } catch (err) {
      throw err;
   }
}
