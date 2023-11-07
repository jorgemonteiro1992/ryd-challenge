<template>
    <div class="filters display--flex">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .filters {
        width: 100%;
        flex-wrap: wrap;
        align-items: center;
        gap: 20px;
    }
</style>