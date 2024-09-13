const { select, input , checkbox} = require('@inquirer/prompts')

let metas = []

const listarMetas = async ( ) =>{
 const result = await checkbox({
    message:"Use as setas para navegar, o espaço para marca ou desmarcar e o Enter para finalizar.",
    choices: [...metas],
    instructions: false,
 })
   
    metas.forEach((m) => {
    m.checked = false
    })

    if(result.length == 0) {
    return
   }

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

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
    return meta.checked
    })
    if(realizadas.length == 0 ){
        console.log("Não existe metas realizadas!")
        return
    }
    await select({
     message: "Metas realizadas",
     choices: [...realizadas]
    })
}

const metasAbertas = async () => {
 const abertas = metas.filter((meta) => {
    return meta.checked != true
 })
 
 if(abertas.length == 0 ){
    console.log("Não existem metas abertas! ")
    return 
 }
  await select({
    message: "Metas Abertas",
    choices: [...abertas]
  })
}



const start = async () => {
    while(true){  
        
       const opcao = await select({
        message: "<MENU>",
        choices: [{
            name: "Cadastrar meta",
            value: "cadastrar"
        },
        {
          name: "Listar metas",
          value: "listar"
        },
        {
            name: "Metas realizadas",
            value: "realizadas"
        },
        {
            name: "Metas abertas",
            value: "abertas"
          }, 
        {
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

                case "realizadas":
                await metasRealizadas()
                break
                
                case "abertas":
                await metasAbertas()
                break
            
                case "sair":
                console.log("Encerrando..")
                return

        }
    }
}

start()
