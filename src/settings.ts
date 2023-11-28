import { App, PluginSettingTab, Setting } from 'obsidian';
import WindilyHelper from './main';

export default class WindilyHelperSettingTab extends PluginSettingTab {
    plugin: WindilyHelper;

    constructor(app: App, plugin: WindilyHelper) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: 'Supabase设置' });

        new Setting(containerEl)
            .setName('Supabase URL')
            .setDesc('Enter your Supabase URL')
            .addText(text => text
                .setPlaceholder('Enter your Supabase URL')
                .setValue(this.plugin.settings.supabaseUrl)
                .onChange(async (value) => {
                    this.plugin.settings.supabaseUrl = value;
                    await this.plugin.saveSettings();

                    if (this.plugin.settings.supabaseUrl && this.plugin.settings.supabasePrivateKey) {
                        await this.plugin.initSupabaeService()
                    }
                }));

        new Setting(containerEl)
            .setName('Supabase Private Key')
            .setDesc('Enter your Supabase Private Key')
            .addText(text => text
                .setPlaceholder('Enter your Supabase Private Key')
                .setValue(this.plugin.settings.supabasePrivateKey)
                .onChange(async (value) => {
                    this.plugin.settings.supabasePrivateKey = value;
                    await this.plugin.saveSettings();

                    if (this.plugin.settings.supabaseUrl && this.plugin.settings.supabasePrivateKey) {
                        await this.plugin.initSupabaeService()
                    }
                }));
    }
}