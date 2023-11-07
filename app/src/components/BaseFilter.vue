<template>
    <div class="filter">
        <label 
            v-if="labelText" 
            :for="labelFor"
            class="display--block"
        >{{ labelText }}</label>
        <slot />
    </div>
</template>
<script setup>
import { toRefs } from 'vue';

// Props
const props = defineProps({
    labelText: String,
    labelFor: String
});

const { labelText, labelFor } = toRefs( props );
</script>

<style lang="scss" scoped>
    .filter {
        & > label {
            margin: 0 8px 8px;
        }
    }

    @include responsive( 'max-width', 450px ) {
        .filter {
            width: 100%;
        }
    }
</style>