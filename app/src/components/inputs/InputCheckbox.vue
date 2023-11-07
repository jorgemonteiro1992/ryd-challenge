<template>
    <div class="input--checkbox position--relative pointer">
        <input 
            :id="id" 
            type="checkbox" 
            :name="name"
            :value="checked"
            :checked="checked"
            class="position--absolute pointer"
            @input="onInputChange($event)"
        />
        <span class="input--checkbox__checkmark position--absolute"></span>
        <label 
            :for="id" 
            class="display--block pointer"
        >{{ label }}</label>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';

// Emits
const emit = defineEmits( [ 'update:checked' ] );

// Props
const props = defineProps({
    id: { 
        type: String, 
        required: true 
    },
    name: {
        type: String, 
        required: true 
    },
    label: {
        type: String 
    },
    checked: {
        type: Boolean 
    }
});
const { id, name, label, checked } = toRefs( props );

// Emits an event when the checked value of the input changes so the value can be updated in the parent component.
const onInputChange = event => {
    emit( 'update:checked', event.target.checked );
};
</script>

<style lang="scss" scoped>
    .input {
        &--checkbox {
            padding-left: 35px;

            input {
                opacity: 0;
                z-index: 1;
                @include dimensions( 25px );
                @include transform-position( 0, unset, unset, 0 );
                &:checked ~ .input--checkbox__checkmark {
                    background-color: $color-blue;
                    border: 1px solid $color-white;
                    &::after {
                        display: block;
                    }
                }
            }

            label {
                line-height: 25px;
                height: 25px;
            }

            &__checkmark {
                @include transform-position( 0, unset, unset, 0 );
                @include dimensions( 25px );
                @include rounded-corner( 5px );
                background-color: #eee;
                &::after {
                    content: "";
                    position: absolute;
                    display: none;
                    @include transform-position( 5px, unset, unset, 8px, rotate(45deg) );
                    @include dimensions( 5px, 10px );
                    border: solid white;
                    border-width: 0 3px 3px 0;
                }
            }

            &:hover {
                input ~ &__checkmark {
                    background-color: #ccc;
                }
            }


        }
    }

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>