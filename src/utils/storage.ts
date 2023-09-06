import cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

import { env } from '@/env'

export function createCloudinaryStorage() {
  cloudinary.v2.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  })

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
      public_id: (req, file) => file.originalname,
    },
  })

  return storage
}
