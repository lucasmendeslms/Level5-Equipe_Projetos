//Funções para as rotas

//Importar módulo
const Database = require("./database/db");
const saveOrphanage = require("./database/saveOrphanage");

//Exportar objeto
module.exports = {
  index(req, res) {
    return res.render("index");
  },

  async orphanage(req, res) {
    const id = req.query.id;

    try {
      const db = await Database;
      const results = await db.all(
        `SELECT * FROM orphanages WHERE id = "${id}"`
      );

      const orphanage = results[0];

      //Colocando as imagens que foram salvas como string em um array, separando-as pela vírgula
      orphanage.images = orphanage.images.split(",");

      //Definindo a primeira imagem que aparece na página "orphanage"
      orphanage.firstImage = orphanage.images[0];

      //Definindo a regra de abertura aos finais de semana
      if (orphanage.open_on_weekends == "0") {
        orphanage.open_on_weekends = false;
      } else {
        orphanage.open_on_weekends = true;
      }

      return res.render("orphanage", { orphanage });
    } catch (error) {
      console.log(error);
      return res.send("Erro no banco de dados!");
    }
  },

  async orphanages(req, res) {
    try {
      const db = await Database;
      const orphanages = await db.all("SELECT * FROM orphanages");
      return res.render("orphanages", { orphanages });
    } catch (error) {
      console.log(error);
      return res.send("Erro no banco de dados!");
    }
  },

  createOrphanage(req, res) {
    return res.render("create-orphanage");
  },

  async saveOrphanage(req, res) {
    const fields = req.body;

    /*Validar se todos os campos estão preenchidos*/

    //Coloca os dados do formulário em um array e verifica se existe algum campo vazio
    if (Object.values(fields).includes("")) {
      return res.send("Todos os campos devem ser preenchidos!");
    }

    try {
      //Salvar um orfanato
      const db = await Database;
      await saveOrphanage(db, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        instagram: fields.instagram,
        facebook: fields.facebook,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        open_on_weekends: fields.open_on_weekends,
      });

      //Redirecionamento para uma página após salvar
      return res.redirect("/orphanages");
    } catch (error) {
      console.log(error);
      return res.send("Erro no banco de dados!");
    }
  },
};
