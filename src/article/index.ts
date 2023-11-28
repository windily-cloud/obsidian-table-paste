import { App, Notice } from "obsidian"
import SupabaseService from "src/supabase"
import { createMd5 } from "src/utils/createMd5"

export const uploadCurrentFile = async (app: App, supabaseService: SupabaseService) => {
    const currentFile = app.workspace.getActiveFile()
    if (!currentFile) {
        new Notice("No active file")
        return
    }
    const fileContent = await app.vault.read(currentFile)
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
    const article = {
        uid,
        title: currentFile.basename,
        content: fileContent,
        hash: createMd5(fileContent).toString(),
    }
    return await supabaseService.uploadArticle(article)
}