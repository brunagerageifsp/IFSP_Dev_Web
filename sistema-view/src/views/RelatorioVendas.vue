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

        </b-form>
        
      </div>
  
      <br><br>
      
      <div v-for="relatorio in RelatorioVendas.relatorio" :key="relatorio" class="pill">
        <table class="styled-table"> <thead><tr><td>Data da Venda</td><td>Valor</td></tr></thead>
          <tr><td>{{ RelatorioVendas.relatorio[0][0][0] }}</td><td>{{ "R$ " +RelatorioVendas.relatorio[0][0][1] }}</td></tr>
          <tr><td>{{ RelatorioVendas.relatorio[0][1][0] }}</td><td>{{ "R$ " +RelatorioVendas.relatorio[0][1][1] }}</td></tr>
          <tr><td>{{ RelatorioVendas.relatorio[0][2][0] }}</td><td>{{ "R$ " +RelatorioVendas.relatorio[0][2][1] }}</td></tr>
          <tr><td>{{ RelatorioVendas.relatorio[0][3][0] }}</td><td>{{ "R$ " +RelatorioVendas.relatorio[0][3][1] }}</td></tr>
          <tr class="active-row"><td>Valor Total</td><td>{{ "R$ " +RelatorioVendas.total }}</td></tr>
        </table>
                 
        <br><br>
      </div>
      <div id="relatorio">

        
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
          dataVendaFim:  '',
          relatorio: '',
          total: ''
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
      relatoriovendas(){
            this.$http.get('/listavendas/:dataVenda?dataVendaInicio='+this.RelatorioVendas.dataVendaInicio+'&dataVendaFim='+this.RelatorioVendas.dataVendaFim)
            .then(response => {
                var x = document.getElementById("relatorio");
                x.style.display = "block";
                this.RelatorioVendas.relatorio = []
                this.RelatorioVendas.relatorio[0] = []
                let contador = 0
                let total = 0
                console.log (response.data.length)
                while(response.data.length > contador){
                  this.RelatorioVendas.relatorio[0][contador] = []
                  this.RelatorioVendas.relatorio[0][contador][0] = response.data[contador].dataVenda
                  this.RelatorioVendas.relatorio[0][contador][1] = response.data[contador].valorTotal
                  total = total + response.data[contador].valorTotal
                  contador++
                }
                this.RelatorioVendas.total = total
            })
        },
      },
    };
  </script>

  <style>
  #form {
          max-width: 400px;
          margin: auto;
      }
  #relatorio {
    display: none;
  }
  .styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
}
.styled-table th,
.styled-table td {
    padding: 12px 15px;
}
.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}
.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}
    </style>