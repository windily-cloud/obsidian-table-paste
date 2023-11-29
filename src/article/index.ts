import { App, Notice } from "obsidian"
import SupabaseService from "src/supabase"
import { createMd5 } from "src/utils/createMd5"
import updateYamlPublish from "src/utils/updateYamlPublish"

export const uploadCurrentFile = async (app: App, supabaseService: SupabaseService) => {
    const currentFile = app.workspace.getActiveFile()
    if (!currentFile) {
        new Notice("No active file")
        return
    }

    const frontMatter = await app.metadataCache.getFileCache(currentFile)?.frontmatter

    if (!frontMatter) {
        new Notice("No frontmatter")
        return
    }


    const uid = frontMatter.uid

    if (!uid) {
        new Notice("No uid")
        return
    }

    await updateYamlPublish(app, true)

    const fileContent = await app.vault.read(currentFile)
    const currentFrontMatter = await app.metadataCache.getFileCache(currentFile)?.frontmatter

    if (!currentFrontMatter) {
        new Notice("No frontmatter or published not set to true")
        return
    }

    const article = {
        uid,
        title: currentFile.basename,
        content: fileContent,
        metadata: currentFrontMatter,
        hash: createMd5(fileContent).toString(),
    }
    return await supabaseService.uploadArticle(article)
}