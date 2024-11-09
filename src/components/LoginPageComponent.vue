<template>
    <div class="row">
        <div class="flex flex-center bg-color-image" style="height: 100vh; width: 40vw;" >
            <img src="../assets/rb_1_bg.png" style="height: 70vh;">
        </div>
        <div class="flex flex-center col">
            <div  style="display: flex; flex-direction: column; align-items: center;">
                <img src="../assets/logo.png" alt="" width="90%" height="160vh">
                <q-card style="width: 25vw; border-radius: 20px;" :class="['q-pa-lg', { 'flip-card': blnFlipCard }]">
                    <div class="text-right">
                        <span style="font-size: 13px;">
                            {{!blnShowCreateAccountModule ? "Not registered" : "Have an account"}}? <a href="#" @click="handleRegistration()" class="hyperlink-style">{{!blnShowCreateAccountModule ? 'Create an account' : 'Login'}}</a>
                        </span>
                    </div>
                    <br>
                    <div v-if="!blnShowCreateAccountModule">
                        <span style="font-size: 15px;">Welcome back 👋</span><br>
                        <span style="font-size: 20px;" class="text-bold">Login to your account</span><br><br>
                        <label>Email</label>
                        <q-input class="q-mb-lg" v-model="strEmail" outlined dense placeholder="Please enter your email"></q-input>
                        <label>Password</label>
                        <q-input v-model="strPassword" @keydown.enter="handleLogin" :type="blnPasswordVisibility ? 'input' : 'password'" outlined dense placeholder="Please enter your password">
                            <template v-slot:append>
                                <q-btn :icon="blnPasswordVisibility ? 'visibility' : 'visibility_off'" flat dense rounded @click="handlePasswordVisibility()"></q-btn>
                            </template>
                        </q-input>
                        <p @click="blnShowForgotPasswordDialog = true; intKey++" class="forgotPasswordStyle q-mt-xs">Forgot Password?</p>
                        <div class="text-center q-mt-lg">
                            <q-btn label="Login" @click="handleLogin()" :disable="strEmail === '' || strPassword === ''" size="16px" style="border-radius: 10px;" class="bg-primary full-width text-white" :loading="blnLoading" no-caps></q-btn>
                        </div>
                    </div>
                    <create-account @newUser="handleRegistration" v-if="blnShowCreateAccountModule"></create-account>
                    <br>
                </q-card>
            </div>
        </div>
        <forgot-password :blnShowDialog="blnShowForgotPasswordDialog" :key="intKey"></forgot-password>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import CreateAccount from './CreateAccount.vue';
import ForgotPassword from "./ForgotPassword.vue";
import { useAuthStore } from 'src/stores/auth';  

export default defineComponent({
    name: 'LoginPage',
    setup() {
        const auth = useAuthStore();
        return {
            auth,
        }
    },
    data() {
        return {
            strEmail: '',
            strPassword: '',
            blnPasswordVisibility: false, 
            blnShowCreateAccountModule: false,
            blnFlipCard: false,
            blnLoading: false,
            blnShowForgotPasswordDialog: false,
            intKey: 0,
        }
    },
    components: {
      CreateAccount,  
      ForgotPassword
    },
    methods: {
        handlePasswordVisibility() {
            this.blnPasswordVisibility = !this.blnPasswordVisibility;
        },
        handleRegistration() {
            this.blnFlipCard = true;
            setTimeout(() => {
                this.blnFlipCard = false;
                this.blnShowCreateAccountModule = !this.blnShowCreateAccountModule;
            }, 600);
        },
        handleLogin() {
            let objData = {
                user_email: this.strEmail,
                password: this.strPassword
            }
            this.blnLoading = true;
            this.$api.post('v1/account/signin', objData).then((response) => {
                if (response) {
                    this.auth.login(response.data.data.signedUser, response.data.data.tokens);
                    const redirectPath = this.$route.query.redirect || '/my-tasks';
                    this.$router.push(redirectPath);
                    this.blnLoading = false;
                }
                else {
                    this.blnLoading = false;
                }
            }).catch((error) => {
                console.log(error);
                this.blnLoading = false;
            })
        }
    },
})
</script>
<style scoped>
.bg-color-image{
    background-color:#D6DCFF;
}
.forgotPasswordStyle{
    cursor: pointer;
    font-size: 13px;
    color: rgb(33, 33, 227);
}
.forgotPasswordStyle:hover{
    text-decoration: underline;
}
.q-card{
    box-shadow: 0 1px 75px #D6DCFF, 0 0px 30px 20px #D6DCFF, 0 0px 0px 0px #D6DCFF;
    transition: transform 0.6s;
}
.hyperlink-style{
    color: rgb(33, 33, 227);
    font-weight: bold;
}
.flip-card{
    transform: rotateY(90deg);
}
</style>