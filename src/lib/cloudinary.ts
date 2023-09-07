import { v2 as Cloudinary} from "cloudinary";

const cloudinaryConfig = () => {
  const cloudinary = Cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET_KEY 
  });

  return cloudinary;
}


export default cloudinaryConfig;