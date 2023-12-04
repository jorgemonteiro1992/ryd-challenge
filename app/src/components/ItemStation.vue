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
            <span class="station__body__address capitalize display--block">{{ address }}</span>
            <span class="station__body__distance capitalize display--block">distance: {{ distance }}</span>
            <span class="station__body__price capitalize display--block">price: {{ station.price }}</span>
        </div>
        <div class="station__actions">
            <div class="station__actions__copy-address position--relative display--inline-b">
                <button-copy-text
                    :text-to-copy="address"
                    button-text="Share address"
                    popover-text="Address copied"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { toRefs, computed, defineAsyncComponent } from 'vue';

// Components
const buttonCopyText = defineAsyncComponent( () => import( '@/components/buttons/ButtonCopyText.vue' ) );

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
 * - the option 'Any' is not selected in the filter 'brand' and if filter.brand is different from station.brand
 * - the station has no price for a specific fuel type
 */
const hideStation = computed( () => {
    return ( ( filters.value?.onlyOpenStations && !station.value?.isOpen ) || 
            ( filters.value?.brand?.name !== 'Any' && filters.value?.brand?.name.toLowerCase() !== station.value?.brand.toLowerCase() ) ||
            !station.value.price );
});

// Builds and returns the address of the station.
const address = computed( () => {
    const addressArray = [];

    // TODO: change this to use a forEach instead of endless if statements
    if ( station.value.street ) addressArray.push( station.value.street ); 
    if ( station.value.houseNumber ) addressArray.push( `${station.value.houseNumber},` ); 
    if ( station.value.postCode ) addressArray.push( `${station.value.postCode}` ); 
    if ( station.value.place ) addressArray.push( `${station.value.place}` ); 

    return addressArray.join( ' ' );
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
        &:first-of-type {
            background-color: $color-green;
        }
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
            flex-wrap: wrap;
            gap: 15px;
            @include position-grid( center, space-between );
            padding-top: 15px;
            @include typography-specs( inherit, inherit, 400 );
            &__address {
                width: 100%;
            }
            &__distance {
                width: calc( 60% - 10px );
            }
            &__price {
                width: calc( 40% - 10px );
                text-align: right;
            }
        }
        &__actions {
            margin-top: 15px;
            text-align: right;
        }
    }
</style>