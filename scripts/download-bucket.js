import fs from 'fs'

/**
 * @param {string} contentFolderName 
 */
const createContentFolder = (contentFolderName) => {
    fs.mkdirSync(`./src/content/${contentFolderName}`)
}

/**
 * @param {string} contentFolderName 
 * @returns boolean
 */
const existContentFolder = (contentFolderName) => fs.existsSync(`./src/content/${contentFolderName}`) && fs.statSync(`./src/content/${contentFolderName}`).isDirectory()

/**
 * @param {string} collection 
 * @param {string} fileName
 * @param {string} content 
 */
const createContentFile = (collection, fileName, content) => {
    fs.writeFileSync(`./src/content/${collection}/${fileName}`, content, {
        encoding: 'utf-8',
    })
}

const buckets = [
    'blog'
]

for (const bucket of buckets) {
    if (!existContentFolder(bucket)) {
        console.log(`Create Content Folder ${bucket} Successfully.`)
        createContentFolder(bucket)
    }
}

for (const Bucket of buckets) {
    const list = await fetch(`https://function.glare-labs.uk/api/GetBlogObjects`)
    const keys = (await list.json()).Contents.map(obj => obj.Key)

    console.log(keys)


    for (const key of keys) {
        const file = await fetch(`https://function.glare-labs.uk/api/FindBlogContentByKey?key=${key}`)
        const content = await file.text()

        try {
            createContentFile(Bucket, key, content)
            console.log(`Write File ${key} Successfully. ./src/content/${Bucket}/${key}`)
        } catch (error) {
            console.error(error)
        }
    }

}
