import { ImageFormValues } from '@/components/createImage/CreateImageForm';
import axios from 'axios';

const api_url = process.env.NEXT_PUBLIC_BASE_API_URL;

export const storeImageHandler = async (formData : ImageFormValues) => {
   const { data } = await axios.post(`${api_url}/image/store` , formData);
   return data;
}

export const getAllImageCommunity = async (page: number,searchTerm : string) => {
   if(typeof page === "number") {
      const { data } = await axios.get(`${api_url}/image/all-image?page=${page}&per_page=10&search=${searchTerm}`);
      return data;
   }

   return null;
}

export const getUserImageCollections = async (page: number = 1) => {
   const { data } = await axios.get(`${api_url}/image/collection/user?page=${1}&per_page=10`);
   return data;
}

export const deleteImageCollection = async (id : string) => {
   if(typeof id === "string") {
      const { data } = await axios.delete(`${api_url}/image/collection/delete/${id}`);
      return data;
   }
}