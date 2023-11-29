import { App, Notice } from "obsidian"

// 解析当前文档内容获取yaml信息，更新published字段到该文件中
const updateYamlPublish = async (app: App, published: boolean) => {
    const currentFile = app.workspace.getActiveFile()
    if (!currentFile) {
        return
    }

    const frontMatter = await app.metadataCache.getFileCache(currentFile)?.frontmatter

    if (!frontMatter) {
        new Notice("No frontmatter")
        return
    }

    try {
        console.log(frontMatter, frontMatter.published, published)
        if (frontMatter.published === published) {
            return
        }
        if (frontMatter.published === undefined) {
            const fileContent = await app.vault.read(currentFile)

            // published字段不存在，添加published字段
            await app.vault.modify(currentFile, fileContent.replace(/mtime: (.*)\n/, "mtime: $1\npublished: " + `${published}\n`))
            return
        }

        if (frontMatter.published !== published) {
            const fileContent = await app.vault.read(currentFile)
            // published字段存在，更新published字段
            await app.vault.modify(currentFile, fileContent.replace(/published: (.*)\n/, `published: ${published}\n`))
            return
        }
    } catch (e) {
        new Notice("Error processing frontmatter")
        return
    }
}

export default updateYamlPublish