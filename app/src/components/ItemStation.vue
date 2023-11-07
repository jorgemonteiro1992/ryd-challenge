<template>
    <div 
        v-if="!hideStation" 
        class="station display--flex"
    >
        <div class="station__header">
            <span class="station__header__name">{{ station.name }}</span>
            <div class="station__header__coordinates">
                <span class="station__header__coordinates__lat">
                    lat: {{ station.lat }}
                </span>
                <span class="station__header__coordinates__lng">
                    lng: {{ station.lng }}
                </span>
            </div>
        </div>
        <div class="station__body display--flex">
            <span class="station__body__distance capitalize display--block">distance: {{ distance }}</span>
            <span class="station__body__price capitalize display--block">price: {{ station.price }}</span>
        </div>
    </div>
</template>

<script setup>
import { toRefs, computed } from 'vue';

// Props
const props = defineProps({
    station: Object,
    filters: Object
});
const { station, filters } = toRefs( props );

// Computed Properties
const distance = computed( () => `${ station.value.dist } km` ); // returns distance including 'km' text
/**
 * computed property that returns in which situations a station will not appear on the screen. 
 * 
 * A station will be hidden if:
 * - the filter 'show open stations' is checked but the station is closed
 * - the filter 'brand' is different than null and if filter.brand is different from station.brand 
 */
const hideStation = computed( () => {
    return ( ( filters.value?.onlyOpenStations && !station.value?.isOpen ) || 
            ( filters.value?.brand?.name !== 'Any' && filters.value?.brand?.name.toLowerCase() !== station.value?.brand.toLowerCase() ) );
});
</script>

<style lang="scss" scoped>
    .station {
        flex-direction: column;
        justify-content: space-between;
        background-color: rgba( 255, 255, 255, 0.05 );
        color: $color-white;
        padding: 15px 10px;
        @include element-border( $color-white );
        @include rounded-corner( 5px );
        &__header {
            padding-bottom: 10px;
            border-bottom: solid 1px $color-white;
            &__name {
                @include typography-specs( inherit, inherit, 700 );
            }
    
            &__coordinates {
                margin-top: 6px;
                @include typography-specs( 12px, 14px, 300 );
                &__lat {
                    margin-right: 5px;
                }
            }
        }
        &__body {
            @include position-grid( center, space-between );
            padding-top: 15px;
            @include typography-specs( inherit, inherit, 400 );
        }
    }
</style>