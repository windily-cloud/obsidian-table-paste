import { Plugin } from 'obsidian';
import { remote } from 'electron'
import { uploadCurrentFile } from './article';
import SupabaseService from './supabase';
import { pasteSioyekProtocolData } from './sioyek';
import WindilyHelperSettingTab from './settings';

interface WindilyHelperSettings {
    supabaseUrl: string
    supabasePrivateKey: string
}

const DEFAULT_SETTINGS: WindilyHelperSettings = {
    supabaseUrl: '',
    supabasePrivateKey: ''
}

export default class WindilyHelper extends Plugin {
    settings: WindilyHelperSettings;
    private supabaseService: SupabaseService

    async onload() {
        console.log('loading windily helper plugin');

        await this.loadSettings();

        await this.addSettingTab(new WindilyHelperSettingTab(this.app, this));

        if (this.settings.supabaseUrl && this.settings.supabasePrivateKey) {
            await this.initSupabaeService()
        }

        await this.registerAllProtocols()

        await this.registerAllCommands()

        await this.registerAllShortcuts()

    }

    async initSupabaeService() {
        this.supabaseService = new SupabaseService(this)
    }

    async registerAllProtocols() {
        this.registerObsidianProtocolHandler('sioyek', (params) => {
            pasteSioyekProtocolData(this.app, params)
        })
    }

    async registerAllCommands() {
        this.addCommand({
            id: "upload-article",
            name: "Upload current article",
            callback: () => {
                uploadCurrentFile(this.app, this.supabaseService)
            }
        })
    }

    async registerAllShortcuts() {
        remote.globalShortcut.register('Alt+2', () => {
            const win = remote.getCurrentWindow()
            if (win.isMaximized()) {
                win.minimize()
            } else {
                win.maximize()
            }
        })
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    onunload() {
        console.log('unloading windily plugin');
    }
}