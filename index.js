const { select, input , checkbox} = require('@inquirer/prompts')

let metas = []

const listarMetas = async ( ) =>{
 const result = await checkbox({
    message:"Use as setas para navegar, o espaço para marca ou desmarcar e o Enter para finalizar.",
    choices: [...metas],
    instructions: false,
 })
    if(result.length == 0) {
    return
   }
    
   metas.forEach((m) => {
    m.checked = false
   })
 

  result.forEach((resposta) => {
   const meta = metas.find((m) => {
          return m.value == resposta
   })
   meta.checked = true
  }) 
   console.log("Meta(s) concluída(s)!")   
}

const cadastrarMeta = async () => {
   const meta = await input({ message: "Digite a meta:"})

   if(meta.length == 0){
   console.log("A meta não pode ser vazia.")
   return 
   }

    metas.push({
    value: meta, 
    checked: false
  })
}

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
            
               await cadastrarMeta()  
               console.log("Cadastrado com sucesso!")
               break
            
               case "listar":
            
                await listarMetas()
                break
            
                case "sair":
                console.log("Encerrando..")
                return

        }
    }
}

start()