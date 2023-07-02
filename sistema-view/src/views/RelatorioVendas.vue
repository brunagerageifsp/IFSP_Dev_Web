<template>
    <div id="form">
      <br>
      <h2>Relatório de Vendas</h2>
      <div id="form">
        <b-form inline @submit="relatoriovendas">
          <label class="sr-only" for="input-dataVendaInicio">Data Inicial</label>
          <b-form-input 
            id="input-dataVendaInicio"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Digite aqui a data inicial"
            v-model="RelatorioVendas.dataVendaInicio"
          ></b-form-input>
          <label class="sr-only" for="input-dataVendaFim">Data Final</label>
          <b-form-input 
            id="input-dataVendaFim"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Digite aqui a data final"
            v-model="RelatorioVendas.dataVendaFim"
          ></b-form-input>
          <br>
          <b-button type="submit" variant="primary">Gerar Relatório Mensal</b-button>
          
          <!-- <div v-for="produto in BuscaProduto.produtos" :key="produto" class="pill">
            {{ ""+produto[0]+ " R$"+produto[1] }}
          </div> -->

        </b-form>
        
      </div>
  
    </div>
  </template>
  
  <script>
  
  export default {
   name: "RelatorioVendas",
   data() {
      return {
        RelatorioVendas: {
          dataVendaInicio: '',
          dataVendaFim:  ''
        }
      }
    },
    mounted: function () {
      console.log("---- Token cookie ---");
      console.log(document.cookie);
      console.log(!(document.cookie != ""));
      if(!(document.cookie != "")){
        console.log("Entrou no redirect");
        this.$router.push("/login");
      }else{
        console.log("--- Verifica token ---")
        this.$http.get('/verificaToken/id?id='+document.cookie)
          .then(response => {
            if(response.role == "admin"){
              console.log("Entrou verifica token")
              console.log(response);
            }
          })
      }
    },
    methods: {
      relatoriovendas(e){
          if (e.key === ' ' && this.dataAtual){
            this.$http.get('/listavendas/:dataVenda?dataVendaInicio='+this.RelatorioVendas.dataVendaInicio+'&dataVendaFim='+this.RelatorioVendas.dataVendaFim)
            .then(response => {
                console.log(response.data);
            })
          }
        },
      },
    };
  </script>

  <style>
  #form {
          max-width: 400px;
          margin: auto;
      }
  </style>