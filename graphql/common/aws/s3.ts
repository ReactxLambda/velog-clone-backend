import {S3} from 'aws-sdk'



export class S3Image {
  private static instance: S3Image
  private static S3 : S3

  private constructor(){
    S3Image.instance = this
    S3Image.S3 = new S3({
      accessKeyId: process.env.NODE_ENV === "development" ? process.env.AWS_ACCESS_KEY : undefined,
      secretAccessKey: process.env.NODE_ENV === "development" ? process.env.AWS_SECRET_KEY : undefined,
      signatureVersion: 'v4',
      region: 'ap-northeast-2',
    })
  }

  static getInstance() {
    if (!S3Image.instance) {
      S3Image.instance = new S3Image()
    }
    return this.instance
  }

  createPreSignUrl = async(key : string, mime: string) : Promise<string> => {
    return await S3Image.S3.getSignedUrlPromise("putObject",{
      Bucket: process.env.AWS_S3_IMAGE_BUCKET,
      Expires: 60,
      Key: key,
      ContentType : mime,
      ACL: 'public-read',
    })
  }
}