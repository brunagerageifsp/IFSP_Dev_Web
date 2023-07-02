// const mongoose = require('mongoose');

// const { Schema } = mongoose;

// const authSchema = new Schema({
//   user: String,
//   password: String
// });

// // Não utilizar localhost. User 127.0.0.1
// mongoose.connect('mongodb://127.0.0.1:27017')
//         .then(async () =>{
//             const Auth = mongoose.model('auth', authSchema);
//             console.log(Auth);
//             // const model = User.query({
//             //     user:"admin"
//             //  });

//             const obj = new Auth({
//                 user: "Bruna",
//                 password: "1234"
//             })
              
//             console.log(Auth);
//             await obj.save();
//             // console.log("---- Dados recebidos do MongoDB ---");
//             // console.log(model);
//         }).catch( error => console.log(error));
