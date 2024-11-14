<template>
    <ThemeProvider
        @theme-change="handleThemeChange"
        :theme="DefaultThemes.GreenLight"
    >
    </ThemeProvider>
</template>

<script setup lang="ts">
import { DefaultThemes, ThemeProvider, type IThemeProviderThemeChangeCustomEventDetail } from '@glare-labs/vue-mdc/provider'

const handleThemeChange = (e: Event) => {
    const event = e as CustomEvent<IThemeProviderThemeChangeCustomEventDetail>
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(`:root{${event.detail.styleText}}`)
    document.adoptedStyleSheets = [sheet]
}
</script>

<style scoped></style>
