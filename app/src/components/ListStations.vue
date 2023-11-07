<template>
    <div class="stations display--grid">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .stations {
        @include dimensions( 100%, auto );
        gap: 20px;
        grid-template-columns: repeat( 3, 1fr );
    }

    @include responsive( max-width, 1023px ) {
        .stations {
            grid-template-columns: repeat( 2, 1fr );
        }
    }

    @include responsive( max-width, 767px ) {
        .stations {
            grid-template-columns: repeat( 1, 1fr );
        }
    }
</style>