var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlunasSchema = new Schema({
  nome: { type: String, required: "Nome obrigatório." },
  dateOfBirth: { type: Date, required: "Data de nascimento obrigatória." },
  nasceuEmSp: { type: String },
  id: { type: String },
  livros: [{ titulo: String, leu: String }]
});

const Alunas = mongoose.model('Alunas', AlunasSchema);

module.exports = Alunas;
