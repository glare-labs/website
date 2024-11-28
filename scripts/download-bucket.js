import fs from 'fs'

/**
 * @param {string} contentFolderPath 
 */
const createContentFolder = (contentFolderPath) => {
    fs.mkdirSync(`${contentFolderPath}`)
}

/**
 * @param {string} contentFolderPath 
 * @returns boolean
 */
const existContentFolder = (contentFolderPath) => fs.existsSync(`${contentFolderPath}`) && fs.statSync(`${contentFolderPath}`).isDirectory()

/**
 * @param {string} contentPath 
 * @param {string} fileName
 * @param {string} content 
 */
const createContentFile = (contentPath, fileName, content) => {
    fs.writeFileSync(`${contentPath}/${fileName}`, content, {
        encoding: 'utf-8',
    })
}

const bucketMaps = [
    { bucket: 'blog', projectContentPath: './packages/blog/src/content/article' },
    { bucket: 'vue-mdc', projectContentPath: './packages/vue-mdc/src/content/article' }
]

for (const item of bucketMaps) {
    if (!existContentFolder(item.projectContentPath)) {
        console.log(`Create Content Folder ${item.projectContentPath} Successfully.`)
        createContentFolder(item.projectContentPath)
    }
}

for (const item of bucketMaps) {
    const list = await fetch(`https://function.glare-labs.uk/api/r2/blog/getObjects/${item.bucket}`)
    const keys = (await list.json()).Contents.map(obj => obj.Key)

    console.log(keys)

    for (const key of keys) {
        fetch(`https://${item.bucket}-r2.glare-labs.uk/${key}`)
            .then(res => res.text())
            .then(text => {
                try {
                    createContentFile(item.projectContentPath, key, text)
                    console.log(`Write File ${key} Successfully. ${item.projectContentPath}/${key}`)
                } catch (error) {
                    console.error(error)
                }
            })

    }

}
