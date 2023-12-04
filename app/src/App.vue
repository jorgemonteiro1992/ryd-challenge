<template>
    <div class="cheap-gas container display--flex flex--center">
        <base-filters>
            <base-filter
                label-text="Brand"
            >
                <Dropdown 
                    v-model="filters.brand" 
                    :options="dropOptions.brands" 
                    option-label="name" 
                    placeholder="Select a brand"
                />
            </base-filter>

            <base-filter
                label-text="Fuel Type"
            >
                <Dropdown 
                    v-model="filters.type" 
                    :options="dropOptions.fuelTypes" 
                    option-label="name" 
                    placeholder="Select a fuel type"
                />
            </base-filter>

            <base-filter>
                <input-checkbox 
                    id="onlyOpenStations"
                    v-model:checked="filters.onlyOpenStations"
                    name="onlyOpenStations"
                    label="Show opened stations only."
                    :checked="filters.onlyOpenStations"
                />
            </base-filter>
        </base-filters>
        <list-stations>
            <item-station
                v-for="station in stations.list" 
                :key="station.id"
                class="stations__station"
                :station="station"
                :filters="filters"
            />
        </list-stations>
    </div>
</template>

<script setup>
import { reactive, onMounted, defineAsyncComponent, watch } from 'vue';
import  { get, objectToQueryString } from '@/utils/request';
import  endpoints from '@/configs/endpoints';
import  { fuelTypes } from '@/configs/consts';

// Components
const listStations = defineAsyncComponent( () => import( '@/components/ListStations.vue' ) );
const itemStation = defineAsyncComponent( () => import( '@/components/ItemStation.vue' ) );
const inputCheckbox = defineAsyncComponent( () => import( '@/components/inputs/InputCheckbox.vue' ) );
const baseFilters = defineAsyncComponent( () => import( '@/components/BaseFilters.vue' ) );
const baseFilter = defineAsyncComponent( () => import( '@/components/BaseFilter.vue' ) );
import Dropdown from 'primevue/dropdown';

// Object containing the list of all fetched stations and the station with the cheapest prices based on the current filters 
const stations = reactive({
    all: [],
    list: [],
    cheapest: null
});

// Variable that saves the filters the user can manipulate.
const filters = reactive({
    brand: {
        name: 'Any'
    },
    type: {
        name: 'e5'
    },
    onlyOpenStations: true
});

// Onject containing 
const request = reactive({
    baseUrl: import.meta.env.VITE_TANKERKOENIG_BASE_URL,
    endpoint: endpoints.stations.list,
    params: {
        lat: '52.521',
        lng: '13.438',
        rad: 30,
        sort: 'price',
        type: 'e5',
        apikey: import.meta.env.VITE_TANKERKOENIG_API_KEY
    },
    response: null,
    errors: null
});

// Object that saves the options of the dropdowns of the page
const dropOptions = reactive({
    brands: [
        { name: 'Any' } 
    ],
    fuelTypes
});

onMounted( async () => {
    fetchStations({ request });
});

// Composes URL, request data to API and save response/errors.
const fetchStations = ({ request }) => {
    // Prepares full URL and request stations to the API
    const url = `${request.baseUrl}${request.endpoint}?${objectToQueryString( request.params )}`;

    /**
     * Requests stations from API based on the parameters provided
     * In case of sucess, saves the response request.response and the list in stations.list
     * In case of failure, saves the response in request.errors
     * 
     */
    get({ url }).then( response => {
        request.response = response;        
        if ( response.status === 'ok' ) {    
            stations.list = response.stations;

            // Gets all available unique brands
            let allBrands = [ ...new Set( stations.list.map( station => station.brand ) ) ];
            allBrands = allBrands.map( brand => ({ name: brand }) );

            dropOptions.brands = [ { name: 'Any' }, ...allBrands ]; // update brand options of brand filter dropdown
        }
    }).catch( errors => {
        request.errors = errors;
    });
};

watch( 
    // Watches when the value of filter 'type' changes, so a new API request can be made with the new data.
    () => filters.type, newType => {
        if ( newType?.name )
            request.params.type = newType.name;

        fetchStations({ request });
    });
</script>

<style lang="scss" scoped>
    @import '@/styles/inputs.scss';
    .cheap-gas {
        flex-direction: column;
        gap: 20px;
    }
</style>