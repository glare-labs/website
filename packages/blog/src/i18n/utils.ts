import { defaultLang, ui } from './ui'

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/')
    if (lang in ui) return lang as keyof typeof ui
    return defaultLang
}

export function useTranslations(lang: keyof typeof ui) {
    return (key: keyof typeof ui[typeof defaultLang]) => ui[lang][key] || ui[defaultLang][key]
}
