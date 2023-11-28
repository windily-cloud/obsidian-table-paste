
declare module "electron" {
    export const remote: {
        baseWindow: any,
        getCurrentWindow: any,
        globalShortcut: any,
    }
}