import { v2 as cloudinary } from 'cloudinary';

export const getprofileURL = async (profile) => {
    try {
        cloudinary.config({ 
            cloud_name: 'dwkbeuihp', 
            api_key: '573166473543391', 
            api_secret: 'CjUnzYCKIpIyStBXJr2rY7Yd3oE' 
        });

        if (!profile) {
            throw new Error("Missing profile parameter or file");
        }
        
        const result = await cloudinary.uploader.upload(profile, { public_id: "olympic_flag" });

        console.log(result);
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    }
}

