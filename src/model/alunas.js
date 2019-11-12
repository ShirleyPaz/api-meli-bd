var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var alunasSchema = new Schema({
  nome: { type: String, required: 'Nome obrigatório.' },
  dateOfBirth: { type: String, required: 'Data de nascimento obrigatória.'},
  nasceuEmSp: { type: String },
  id: { type: String },
  livros: [{ titulo: String, leu: String}]
});
