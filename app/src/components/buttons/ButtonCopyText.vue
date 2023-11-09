<template>
    <button
        class="button button--copy pointer"
        @click="copyToClipboard( textToCopy )"
        :title="buttonText"
    >
        <icon-Copy/>
    </button>
    <div 
        v-if="showPopoverMessage" 
        :class="{
            'popover popover--copy position--absolute': true,
            'show': showPopoverMessage
        }"
    >
        {{ popoverText }}
    </div>
</template>
  
<script setup>
import { defineAsyncComponent, ref, toRefs } from 'vue';

// Components
const iconCopy = defineAsyncComponent( () => import( '@/components/icons/IconCopy.vue' ) );

// Props
const props = defineProps({
    textToCopy: {
        type: String,
        required: true,
        default: ''
    },
    buttonText: {
        type: String,
        required: true,
        default: 'Copy'
    },
    popoverText: {
        type: String,
        required: true,
        default: 'Copied'
    }
});
const { textToCopy, buttonText, popoverText } = toRefs( props );

const showPopoverMessage = ref( false );

/**
 * Copy text to clipboard and then shows a message for 2 seconds saying the text was copied.
 * 
 * @param {*} textToCopy
 * 
 */
const copyToClipboard = textToCopy => {
    navigator.clipboard.writeText( textToCopy )
        .then( () => {
            showPopoverMessage.value = true;

            setTimeout( () => {
                showPopoverMessage.value = true;
            }, 2000 ); // Hide popover after 2 seconds
        });
};
</script>
  
<style lang="scss" scoped>
    .button {
        &--copy {
            background: transparent;

            svg {
                width: 20px;
                height: auto;
            }
        }
    }
    .popover {
        font-size: 12px;
        width: max-content;
        max-width: 200px;
        background: rgba( 0, 0, 0, 0.8 );
        color: $color-white;
        padding: 5px;
        border-radius: 4px;
        @include transform-position ( -25px, 0, unset, unset, translateX( 90% ) );
        transition: opacity 0.3s ease-in-out;
        opacity: 0;
        pointer-events: none;
    }

    .popover.show {
        opacity: 1;
        pointer-events: auto;
    }
</style>