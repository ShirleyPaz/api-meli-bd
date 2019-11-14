const Alunas = require("../model/alunas");

const fs = require("fs");

exports.get = (req, res) => {
  // console.log(req.url)
  Alunas.find((err, alunas) => {
    if (err) res.status(500).send(err);
    res.status(200).send(alunas);
  });
};

exports.getById = (req, res) => {
  const id = req.params.id;
  // if (id > 34 || id <= 0) {
  //   res.redirect(301, "https://en.wikipedia.org/wiki/Man-in-the-middle_attack");
  // }
  // res.status(200).send(alunas.find(aluna => aluna.id == id));
  Alunas.findById(id, function(err, aluna) {
    if (err) return res.status(500).send(err);
    if (!aluna) return res.status(200).send("Ops! Não encontramos essa aluna.");
    res.status(200).send(aluna);
  });
};

exports.getBooks = (req, res) => {
  // const id = req.params.id;
  // const aluna = alunas.find(aluna => aluna.id == id);
  // if (!aluna) {
  //   res.send("Nao encontrei essa garota");
  // }
  // const livrosAluna = aluna.livros;
  // const livrosLidos = livrosAluna.filter(livro => livro.leu == "true");
  // const tituloLivros = livrosLidos.map(livro => livro.titulo);
  // res.send(tituloLivros);
  const id = req.params.id;
  Alunas.findById(id, (err, aluna) => {
    if (err) res.status(500).send(err);
    if (!aluna) res.status(200).send("Ops!Não encontrei essa aluna.");
    const livros = aluna.livros.map(e => e.titulo);
    res.status(200).send(livros);
  });
};

exports.getSp = (req, res) => {
  // const nasceuSp = alunas.filter(aluna => {
  //   console.log(aluna);
  //   return aluna.nasceuEmSp == "true";
  // });
  // const meninasSp = nasceuSp.map(aluna => aluna.nome);

  Alunas.find((err, alunas) => {
    const alunasDeSp = alunas.filter(aluna => aluna.nasceuEmSp === "true");
    const nomesAlunas = alunasDeSp.map(aluna => aluna.nome);
    res.status(200).send(nomesAlunas);
  });
};

exports.getAge = (req, res) => {
  const id = req.params.id;
  // const aluna = alunas.find(item => item.id == id);
  // const dataNasc = aluna.dateOfBirth;
  // const arrData = dataNasc.split("/");
  // const dia = arrData[0];
  // const mes = arrData[1];
  // const ano = arrData[2];
  // const idade = calcularIdade(ano, mes, dia);
  // res.status(200).send({ idade });
  Alunas.findById(id, (err, aluna) => {
    if (err) return res.status(500).send(err);
    if (!aluna) return res.status(200).send("Ops! Não encontramos essa aluna.");
    const dataNasc = aluna.dateOfBirth;
    // const arrData = dataNasc.split("-|T");
    const dia = dataNasc.getDate;
    const mes = dataNasc.getMonth;
    const ano = arrData.getFullYear;

    const idade = calcularIdade(ano, mes, dia);
    res.status(200).send(idade);
  });
};


function calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc) {
  const now = new Date();
  const anoAtual = now.getFullYear();
  const mesAtual = now.getMonth() + 1;
  const hoje = now.getDate();

  let idade = anoAtual - anoDeNasc;

  if (mesAtual < mesDeNasc || (mesAtual == mesDeNasc && hoje < diaDeNasc)) {
    idade -= 1;
  }
  return idade;
}

exports.post = (req, res) => {
  const { nome, dateOfBirth, nasceuEmSp, id, livros } = req.body;
  alunas.push({ nome, dateOfBirth, nasceuEmSp, id, livros });

  fs.writeFile(
    "./src/model/alunas.json",
    JSON.stringify(alunas),
    "utf8",
    function(err) {
      if (err) {
        return res.status(500).send({ message: err });
      }
      console.log("The file was saved!");
    }
  );

  return res.status(201).send(alunas);
};

exports.postBooks = (req, res) => {
  const id = req.params.id;
  const aluna = alunas.find(aluna => aluna.id == id);
  if (!aluna) {
    res.send("Nao encontrei essa garota");
  }
  const { titulo, leu } = req.body;
  alunas[aluna.id - 1].livros.push({ titulo, leu });

  fs.writeFile(
    "./src/model/alunas.json",
    JSON.stringify(alunas),
    "utf8",
    function(err) {
      if (err) {
        return res.status(500).send({ message: err });
      }
      console.log("The file was saved!");
    }
  );

  res.status(201).send(alunas[aluna.id - 1].livros);
};
