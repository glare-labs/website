<template>
    <ul class="result-list">
        <template v-for="blog in props.collection">
            <li
                class="blog"
                @click="() => onBlogClick(blog)"
            >
                <h1 class="title text-title-medium line-clamp-1">{{ blog.data.title }}</h1>
                <p class="description text-body-medium line-clamp-2">{{ blog.data.description }}</p>
                <md-ripple></md-ripple>
            </li>
        </template>
    </ul>
</template>

<script setup lang="ts">
import type { TBlog } from '../../content/config';

const props = defineProps<{
    collection: Array<TBlog>
}>()

const emits = defineEmits<{
    blogClick: [TBlog]
}>()

const onBlogClick = (blog: TBlog) => {
    emits('blogClick', blog)
}

</script>

<style scoped>
ul.result-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @media (min-width: 600px) and (max-width: 840px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 840px) and (max-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: 1200px) and (max-width: 1600px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media (min-width: 1600px) {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }

    &>.blog {
        position: relative;
        padding: 16px;
        border-radius: 16px;
        background-color: var(--md-sys-color-surface-container-lowest);

        &>.title {

            color: var(--md-sys-color-on-surface);
        }

        &>.description {
            color: var(--md-sys-color-on-surface-variant);
        }
    }
}
</style>
