<template>
    <v-select :options="options"></v-select>
</template>

<script>
import vSelect from 'vue-select';
export default {
    data(){
        return{
            
        }
    },
    props: {
    options: {
      type: Array,
      required: true
    }
  },
    components:{
        vSelect
    }
}
</script>
