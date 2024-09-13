const { select } = require('@inquirer/prompts')


const start = async () => {
    while(true){
        
       const opcao = await select({
        message: "<MENU>",
        choices: [{
            name: "Cadastrar meta",
            value: "cadastrar"
        },{
          name: "Listar metas",
          value: "listar"
        },{
            name: "Sair",
            value:"sair"
        }]
       })
       
        switch(opcao){
            case "cadastrar":
                console.log("CADASTRANDO..")
                break
                case "listar":
                console.log("Listando..")
                break
                case "sair":
                console.log("Encerrando..")
                return

        }
    }
}

start()