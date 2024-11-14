<template>
    <NavigationRail position="top" class="navigation-rail">
        <template #start>
            <Fab variant="tertiary">
                <Icon>search</Icon>
            </Fab>
        </template>
        <NavigationRailTab :label="link.label" v-for="link of links" :key="link.url">
            <Icon>{{ link.iconString }}</Icon>
        </NavigationRailTab>
        <template #end>
            <IconButton appearance="outlined">
                <Icon>dark_mode</Icon>
            </IconButton>
        </template>
    </NavigationRail>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { Fab } from '@glare-labs/vue-mdc/fab'
import { Icon } from '@glare-labs/vue-mdc/icon'
import { IconButton } from '@glare-labs/vue-mdc/icon-button'
import { SNavigableController } from '@glare-labs/vue-mdc/internals'
import type { INavigableController, INavigableControllerHost } from '@glare-labs/vue-mdc/internals'
import { NavigationRail } from '@glare-labs/vue-mdc/navigation-rail'
import { NavigationRailTab } from '@glare-labs/vue-mdc/navigation-rail-tab'
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
    const bar = document.querySelector('.navigation-rail') as HTMLElement

    const url = window.location.pathname
    const index = links.findIndex(e => e.url === url);

    // @ts-ignore
    ((bar as INavigableControllerHost)[SNavigableController])!.activeIndex = index

    bar.addEventListener('change', handleChange)
})
onBeforeUnmount(() => {
    const bar = document.querySelector('.navigation-rail') as HTMLElement
    bar.removeEventListener('change', handleChange)
})
</script>

<style scoped>
.navigation-rail {
    --md-fab-container-elevation: 0;
}
</style>
