<template>
    <div>
      <br>
      <h1>Login</h1>
      <div class="login">
        <br>
        <b-form @submit="Login">
          <b-form-group class="sr-only" id="user" label="Usuário" label-for="user-input">
            <b-form-input id="user-input" class="mb-2 mr-sm-2 mb-sm-0" v-model="login.user" required placeholder="Nome de usuário"></b-form-input>
          </b-form-group>
          <br>
          <b-form-group class="sr-only" id="password" label="Senha" label-for="password-input">
            <b-form-input id="password-input" class="mb-2 mr-sm-2 mb-sm-0" v-model="login.password" type="password" required placeholder="Senha de login"></b-form-input>
          </b-form-group>
          <br>
          <b-button type="submit" variant="success">Entrar</b-button>
        </b-form>
      </div>
    </div>
</template>
  
<script>
    export default {
        /* eslint-disable */
        name: "Login",
        data() {
            return {
                login: {
                    user: "admin",
                    password: "123",
                },
            };
        },
        methods: {
            Login(){
                //pegar token na memoria, se tiver token, manda para o servidor para validar
                //sendo valido retorna que pode acessar
                //se não tiver valido, devolve para a tela login

                // let payload = 
                this.$http
                .post("/login", this.login) //substituir depois por this.login
                .then((response) => {
                    // console.log(response);
                    console.log("--- Login data ----");
                    console.log(this.login.user);
                    //salvar no localstorige ou no coockie
                    if (this.login.user == "admin"){
                        console.log("Entrou na geração de cookie!");
                        let d = new Date();
                        d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
                        let expires = "expires=" + d.toUTCString();
                        document.cookie = "Token=" + response.data.token + ";" + expires + ";path=/";
                        this.$router.push("/cadastraproduto");
                    }else{
                        let d = new Date();
                        d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
                        let expires = "expires=" + d.toUTCString();
                        document.cookie = "Token=" + response.data.token + ";" + expires + ";path=/";
                        this.$router.push("/cadastravenda");
                    }
                })
                .catch((error) => {
                    console.error("Não foi possível realizar o Login");
                    console.error(error);
                });
            },
        },
    };
</script>
  
<style> 
    .login {
        max-width: 400px;
        margin: auto;
    }
</style>