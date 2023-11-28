import { App, Notice, ObsidianProtocolData } from "obsidian"

const pasteSioyekProtocolData = async (app: App, params: ObsidianProtocolData) => {
    if (params.text) {
        //将params.text插入到当前光标处
        const lineNumber = app.workspace.activeEditor?.editor?.getCursor().line
        if (lineNumber) {
            const lineContent = app.workspace.activeEditor?.editor?.getLine(lineNumber)
            app.workspace.activeEditor?.editor?.setLine(lineNumber, lineContent + params.text)
            app.workspace.activeEditor?.editor?.setCursor({ line: lineNumber, ch: lineContent?.length || 0 })
        }
    } else {
        new Notice("No text")
    }
}

export { pasteSioyekProtocolData }