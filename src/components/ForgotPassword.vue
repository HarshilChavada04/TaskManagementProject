<template>
    <q-dialog v-model="blnShowForgotPassword" persistent backdrop-filter="blur(30px)">
        <q-card style="border-radius: 20px; width: 500px;">
            <q-card-section class="row justify-end q-pa-sm">
              <q-btn icon="close" class="bg-blue-4 text-white" size="sm" round dense @click="blnShowForgotPassword = false" />
            </q-card-section>
            <q-card-section class="text-center">
                <div>
                    <img src="../assets/forgot_password.png" width="50%">
                </div>
                <span class="text-h5" style="font-weight: 500;">Forgot your password?</span><br>
                <span style="font-size: 12px;" class="text-grey-7">Enter your email so that we can send you password reset link.</span>
            </q-card-section>
            <q-card-section class="q-mx-md q-mb-lg">
                <div>
                    <label>Email</label>
                    <q-input v-model="strEmail" flat dense outlined placeholder="Enter your email"></q-input>
                    <q-btn label="Send Email" :disable="strEmail.trim() === ''" style="border-radius: 10px;" no-caps class="full-width q-mt-lg bg-primary text-white"></q-btn>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ForgotPassword',
    props: {
        blnShowDialog: {
            default: false,
        },
    },
    data() {
        return {
            blnShowForgotPassword: this.blnShowDialog,
            strEmail: '',
        }
    },
})
</script>
<style scoped>
.bg-custom{
    background-color: #D6DCFF;
}
.q-card{
    box-shadow: 0 1px 75px #D6DCFF, 0 0px 30px 20px #D6DCFF, 0 0px 0px 0px #D6DCFF;
    transition: transform 0.6s;
}
</style>