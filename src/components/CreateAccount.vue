<template>
    <div>
        <span style="font-size: 20px;" class="text-bold">Create an account</span><br><br>
        <q-form>
            <label>Full name</label>
            <q-input class="q-mb-lg" v-model="strFullName" outlined dense placeholder="Please enter your full name"></q-input>
            <label><span class="text-negative text-bold">*</span>User name</label>
            <q-input hide-bottom-space class="q-mb-lg" v-model="strUserName" :rules="[(val) => !!val.trim() || 'Please enter username']" no-error-icon outlined dense placeholder="Please enter your user name"></q-input>
            <label><span class="text-negative text-bold">*</span>Phone</label>
            <q-input hide-bottom-space mask="##########" no-error-icon class="q-mb-lg" :rules="[(val) => !!val || 'Please enter phone number']" v-model="strPhone" outlined dense placeholder="Please enter your phone number"></q-input>
            <label><span class="text-negative text-bold">*</span>Email</label>
            <q-input hide-bottom-space no-error-icon class="q-mb-lg" :rules="[(val) => !!val.trim() || 'Please enter email']" v-model="strEmail" outlined dense placeholder="Please enter your email"></q-input>
            <label><span class="text-negative text-bold">*</span>Password</label>
            <q-input @keypress.enter="handleCreateAccount" hide-bottom-space no-error-icon v-model="strPassword" :rules="[(val) => !!val || 'Please enter password']" :type="blnPasswordVisibility ? 'input' : 'password'" outlined dense placeholder="Please enter your password">
                <template v-slot:append>
                    <q-btn :icon="blnPasswordVisibility ? 'visibility' : 'visibility_off'" flat dense rounded @click="handlePasswordVisibility()"></q-btn>
                </template>
            </q-input>
            <div class="text-center q-mt-lg">
                <q-btn label="Create account" :disable="strUserName.trim() === '' || strPhone === '' || strEmail.trim() === '' || strPassword === ''" size="16px" style="border-radius: 10px;" class="bg-primary full-width text-white" no-caps @click="handleCreateAccount()"></q-btn>
            </div>
        </q-form>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CreateAccount',
    data() {
        return {
            strUserName: '',
            strFullName: '',
            strPhone: '',
            strEmail: '',
            strPassword: '',
            blnPasswordVisibility: false,
        }
    },
    methods: {
        handlePasswordVisibility() {
            this.blnPasswordVisibility = !this.blnPasswordVisibility;
        },
        handleCreateAccount() {
            let objData = {
                user_name: this.strUserName,
                user_phone: this.strPhone,
                user_email: this.strEmail,
                password: this.strPassword,
            }
            if (this.strFullName !== '') {
                objData.full_name = this.strFullName;
            }
            this.$api.post('v1/account/signup', objData).then((response) => {
                if (response.data.statusCode === 200) {
                    this.$emit('newUser');
                    this.$showSuccess(response.data.message);
                }
            })
        }
    }
})
</script>