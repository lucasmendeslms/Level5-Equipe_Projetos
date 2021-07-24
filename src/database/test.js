const Database = require('./db');
const saveOrphanage = require('./saveOrphanage');

Database.then(async db => {
    //Inserir dados na tabela
    await saveOrphanage(db, {
        
        lat: "-27.222633", 
        lng: "-49.6555874",
        name: "Lar dos Meninos",
        about: "Presta assistência a crianças de 06 a 15 anos que se encontrem em situação de risco e/ou vulnerabilidade social.",
        whatsapp: "(62) 4002-8922",
        images: [
            "https://images.unsplash.com/photo-1614270270735-e93b1234fc7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8aWR8fHx8fHwxNjI2ODE2MDQ4&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",

            "https://images.unsplash.com/photo-1594269146507-03861ba52e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8aWR8fHx8fHwxNjI2ODE2MDQw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
        ].toString(),
        instructions: "Venha como se sentir a vontade e traga muito amor e paciência para dar.",
        opening_hours: "Horário de visitas das 08h até 18h.",
        open_on_weekends: "0"
    })
    
    //Consultar dados da tabela
    const selectedOrphanages = await db.all("SELECT * FROM orphanages")
    console.log(selectedOrphanages)

    //Consultar somente 1 orphanato, pelo id
    const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "1"')
    console.log(orphanage)

    //Deletar dado da tabela
   /* 
   
   console.log(await db.run("DELETE FROM orphanages WHERE id = '4'"))
   console.log(await db.run("DELETE FROM orphanages WHERE id = '5'"))

    */

 
})