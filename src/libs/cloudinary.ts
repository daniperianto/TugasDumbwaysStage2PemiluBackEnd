import { v2 as cloudinary } from "cloudinary"


export default new class CloudinaryConfig {
    upload() {
        cloudinary.config({
            secure: true,
            cloud_name: process.env.cloud_name, 
            api_key: process.env.api_key, 
            api_secret: process.env.api_secret
          });
    }

    async destination(image: any) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload("src/upload/" + image)
            return cloudinaryResponse.secure_url
        } catch (err) {
            throw err
        }
    }

    async delete(image: string) {
        try {
            const imageArray = image.split("/")
            let imageName = imageArray[imageArray.length - 1]
            imageName = imageName.slice(0, -4)

            const deleted = await cloudinary.uploader.destroy(imageName)
            console.log("image cloudinary deleted: " + deleted)

        } catch (error) {
            throw error
        }
    }
}