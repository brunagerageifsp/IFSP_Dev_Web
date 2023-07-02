<template>
    <div id="form">
      <br>
      <h1>Cadastro de Venda</h1>
      <div id="form">
        <b-form inline @submit="cadastravenda">
  
          <label class="sr-only" for="input-codbarra">Código de Barra</label>
          <b-form-input 
            @keypress="listaprodutos"
            id="input-codbarra"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Digite aqui o Codigo de Barra do Produto"
            v-model="BuscaProduto.codbarra"
          ></b-form-input>
          <br>
          <p> Lista de Compras: </p>
          <div v-for="produto in BuscaProduto.produtos" :key="produto" class="pill">
            {{ ""+produto[0]+ " R$"+produto[1] }}
          </div>
          <br>
          <br>
          <br>
          <div v-if="BuscaProduto.nome_produto">{{ "Total: " + BuscaProduto.valorTotal}}
            <br>
            <br>
            <br>
            <p>Forma de Pagamento</p>
            <select v-model="BuscaProduto.formaPagamento">
                <option value="1">Dinheiro</option>
                <option value="2">Débito</option>
                <option value="3">Crédito</option>
            </select>
          </div>
            
          <div v-if="BuscaProduto.preco_produto">
              <br>
              <b-button type="submit" variant="primary">Cadastrar Venda</b-button>
          </div>  
        </b-form>
      </div>
    </div>
        
  </template>
  
  <script>
  
  export default { 
    // name: "CadastraVenda",
    // data() {
    //     return {
    //       NovaVenda: {
    //         formaPagamento: '',
    //         dataVenda: '',
    //         valorTotal: ''
    //       }
    //     }
    //   },
    name: "BuscaProduto",
    data(){
      return{
        BuscaProduto: {
            produtos: [],
            formaPagamento: '1',
            codbarra: '',
            nome_produto: '',
            preco_produto: '',
            valorTotal: '',
            dataCompra: '',
        },
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
            console.log("Entrou verifica token")
            console.log(response);
          })
      }
    },
    methods: {
        listaprodutos(e){
          if (e.key === ' ' && this.BuscaProduto.codbarra){
            this.$http.get('/listaprodutos/id?id='+this.BuscaProduto.codbarra)
            .then(response => {
                // console.log(response.data);
                // console.log(response.data.preco_produto);
                this.BuscaProduto.nome_produto = response.data.nome;
                this.BuscaProduto.preco_produto = response.data.preco;
                this.BuscaProduto.valorTotal = response.data.preco;
                this.BuscaProduto.dataCompra = new Date().toJSON().slice(0,10);
                let produto = [];
                produto[0] = response.data.nome;
                produto[1] = response.data.preco;
                this.BuscaProduto.produtos.push(produto);
                let quantidade = this.BuscaProduto.produtos.length;
                let contador = 0;
                this.BuscaProduto.valorTotal = 0;
                while (contador < quantidade){
                  this.BuscaProduto.valorTotal = this.BuscaProduto.valorTotal + this.BuscaProduto.produtos[contador][1];
                  contador++;
                }
            })
          }
        },

        cadastravenda() {
            let payload = this.$http.post('/cadastravenda', this.BuscaProduto)
            .then(response => {
            console.log(response);
            console.log(payload);
            })
            .catch(error => {
            console.log(error);
            });
        },
      },
    };

    
    // name: "ConsultaProduto",
    // data() {
    //     return {
    //       BuscaProduto: {
    //         codbarra: '',
    //         nome: '',
    //         preco: ''
    //       }
    //     }
    //   },
      
    // methods: {
    //   consultaProduto(){
    //     let payload = this.$http.get('/listaproduto/:id', this.codbarra)
    //     .then(response => {
    //       console.log(response);
    //       console.log(payload.data);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    //   },

  </script>
  
  <style>
    #form {
          max-width: 400px;
          margin: auto;
    }
    select {
        display: block;
        padding: 10px 6px;
        width: 100%;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #555;
    }
  </style>
