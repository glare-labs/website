<template>
    <NavigationBar ripple-unbounded class="navigation-bar">
        <NavigationTab :label="link.label" v-for="link of links" :key="link.url">
            <Icon>{{ link.iconString }}</Icon>
        </NavigationTab>
    </NavigationBar>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { Icon } from '@glare-labs/vue-mdc/icon'
import { SNavigableController } from '@glare-labs/vue-mdc/internals'
import type { INavigableController, INavigableControllerHost } from '@glare-labs/vue-mdc/internals'
import { NavigationBar } from '@glare-labs/vue-mdc/navigation-bar'
import { NavigationTab } from '@glare-labs/vue-mdc/navigation-tab'
import { links } from './links'

const handleChange = (e: Event) => {
    const values = (e as CustomEvent).detail
    const link = links.find(e => e.label === values.label)
    if (!link) {
        return
    }
    if (values.indexAfterUpdate === values.indexBeforeUpdate) {
        return
    }
    e.preventDefault()
    e.stopPropagation()
    window.location.href = link.url
}

onMounted(() => {
    const bar = document.querySelector('.navigation-bar') as HTMLElement

    const url = window.location.pathname
    const index = links.findIndex(e => e.url === url);

    // @ts-ignore
    ((bar as INavigableControllerHost)[SNavigableController])!.activeIndex = index

    bar.addEventListener('change', handleChange)
})
onBeforeUnmount(() => {
    const bar = document.querySelector('.navigation-bar') as HTMLElement
    bar.removeEventListener('change', handleChange)
})
</script>

<style scoped></style>
