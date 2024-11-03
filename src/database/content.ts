import { GetObjectCommand, ListObjectsCommand, S3Client } from '@aws-sdk/client-s3'

export class ContentDatabase {

    private static readonly storage = new S3Client({
        region: "auto",
        endpoint: `https://3e1471e3563c12e90bee34bbfaf17ebf.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: "0f9ecd94bc5380406a2d0ca2e7bd1c4a",
            secretAccessKey:
                "61d7a181c78372fc3a16a91ee999ff68bfcd45618df59af271de989db3671d5a",
        },
    })

    public static async contentFileNames() {
        return (await this.storage.send(
            new ListObjectsCommand({
                Bucket: "content",
            }),
        )).Contents.map(e => e.Key)
    }

    public static async contents() {
        const names = await this.contentFileNames()
        const content = []
        for (const key of names) {
            const data = (await this.storage.send(new GetObjectCommand({ Bucket: "content", Key: 'vue-mdc-released.mdx' }))).Body.transformToString()
            content.push({
                data,
                slug: key,
                headline: key,
            })
        }
        return content
    }

}
