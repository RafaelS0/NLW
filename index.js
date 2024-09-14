const { select, input , checkbox} = require('@inquirer/prompts')
const  fs =  require("fs").promises

let mensagem = "Bem vindo ao App"
let metas

const carregarMetas = async () => {
    try{
    const dados = await fs.readFile("metas.json", "utf-8")
    metas = JSON.parse(dados)
    }
    catch(erro){
    metas = []
    }
}

const salvarMetas = async ( ) => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null , 2 ))
}

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
   mensagem = "Meta(s) concluída(s)!"
}

const cadastrarMeta = async () => {
   const meta = await input({ message: "Digite a meta:"})

   if(meta.length == 0){
   mensagem = "A meta não pode ser vazia."
   return 
   }

    metas.push({
    value: meta, 
    checked: false
  })
  mensagem = "Meta cadastrada com sucesso"
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
    return meta.checked
    })
    if(realizadas.length == 0 ){
        mensagem = "Não existe metas realizadas!"
        return
    }
    await select({
     message: "Metas realizadas:" + realizadas.length,
     choices: [...realizadas]
    })
}

const metasAbertas = async () => {
 const abertas = metas.filter((meta) => {
    return meta.checked != true
 })
 
 if(abertas.length == 0 ){
    mensagem = "Não existem metas abertas!"
    return 
 }
  await select({
    message: "Metas Abertas:" + abertas.length,
    choices: [...abertas]
  })
}

const deletarMetas  = async () => {
  const metasDesmarcadas = metas.map (( meta) => {
  return {value: meta.value, checked: false}
  })

    const deletarItem = await checkbox({
        message:"Selecione o item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
     })

    deletarItem.forEach((item) => {
    metas = metas.filter((meta) => {
    return meta.value != item
     })
    })

    mensagem = "Deletado com sucesso!"
}

const mostrarMensagem = () => {
    console.clear()

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}


const start = async () => {
   await  carregarMetas()
    while(true){  
        await salvarMetas()
        mostrarMensagem()

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
            name: "Deletar metas",
            value: "deletar"
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

                case "deletar":
                await deletarMetas()
                
                break

                case "sair":
                console.log("Encerrando..")
                return

        }
    }
}

start()
