<template>
    <div>
        <login-page-component></login-page-component>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import LoginPageComponent from 'src/components/LoginPageComponent.vue';

export default defineComponent({
    name: 'LoginPage',
    components: {
        LoginPageComponent
    },
    data() {
        return {
            strEmail: '',
            strPassword: '',
            blnPasswordVisibility: false, 
        }
    },
    methods: {
        handlePasswordVisibility() {
            this.blnPasswordVisibility = !this.blnPasswordVisibility;
        }
    },
})
</script>
<style scoped>
.bg-color-image{
    background-color: #D5F1FF;
}
.q-card{
    box-shadow: 0 1px 75px #D5F1FF, 0 0px 30px 20px #D5F1FF, 0 0px 0px 0px #D5F1FF;
}
.hyperlink-style{
    color: rgb(33, 33, 227);
    font-weight: bold;
}
</style>