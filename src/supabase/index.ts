import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { Notice } from 'obsidian'
import WindilyHelper from 'src/main'
import type { Database } from 'src/types/database'

interface Article {
    uid: string
    title: string
    content: string
    metadata: any
    hash: string
}

export default class SupabaseService {
    supabase: SupabaseClient
    constructor(plugin: WindilyHelper) {
        const supabase = createClient<Database>(plugin.settings.supabaseUrl, plugin.settings.supabasePrivateKey)
        this.supabase = supabase
    }

    async uploadArticle(article: Article) {
        const remoteArticle = await this.getArticle(article.uid)

        // 如果文章不存在，就上传
        if (!remoteArticle) {
            const { error } = await this.supabase
                .from('article')
                .insert({
                    uid: article.uid,
                    title: article.title,
                    content: article.content,
                    metadata: article.metadata,
                    hash: article.hash
                })

            if (error) {
                new Notice("上传文章失败：" + error.message)
            } else {
                new Notice("上传文章成功")
            }
            return
        }

        // 如果文章没有更新，就不上传
        if (remoteArticle && remoteArticle.hash === article.hash) {
            new Notice("文章没有更新")
            return
        }

        // 如果文章有更新，就更新
        if (remoteArticle && remoteArticle.hash !== article.hash) {
            const { error } = await this.supabase
                .from('article')
                .update({
                    title: article.title,
                    content: article.content,
                    metadata: article.metadata,
                    hash: article.hash
                })
                .eq('uid', article.uid)

            if (error) {
                new Notice("更新文章失败" + error.message)
            } else {
                new Notice("更新文章成功")
            }
        }
    }

    async getArticle(uid: string) {
        const { data, error } = await this.supabase
            .from('article')
            .select()
            .eq('uid', uid)
            .single()

        if (error) {
            new Notice(error.message)
        }
        return data
    }

    async getArticles() {
        const { data, error } = await this.supabase
            .from('article')
            .select()

        if (error) {
            new Notice(error.message)
        }
        return data
    }

    async deleteArticle(uid: string) {
        const { data, error } = await this.supabase
            .from('article')
            .delete()
            .eq('uid', uid)

        if (error) {
            new Notice(error.message)
        }
        return data
    }

}