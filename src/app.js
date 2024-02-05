import express from 'express'

const app = express() //criando uma instancia do express

//express deve fazer a leitura de json
app.use(express.json())

//mock
const selecoes = [
    {id:1,selecao:'Brasil', grupo:'G'},    
    {id:2,selecao:'Suiça', grupo:'G'},
    {id:3,selecao:'Sérvia', grupo:'G'},
    {id:4,selecao:'Camarões', grupo:'G'},

]

//função auxiliar
//buscarSelecaoPorId busca por id
function buscarSelecaoPorId(id){
    return selecoes.filter(selecao => selecao.id ==  id)
}

//buscarIndexSelecao busca index por id
function buscarIndexSelecao(id){
    return selecoes.findIndex(selecao => selecao.id == id)
}

app.post('/selecoes',(req,res)=>{
    selecoes.push(req.body)
    res.status(201).send('Selecao cadastrada com sucesso')
})

//root router 
app.get('/',(req,res)=>{
    res.send('Hellow World')
})

app.get('/selecoes',(req,res)=>{
    res.status(200).send(selecoes)
})

app.get('/selecoes/:id',(req,res)=>{
    res.json(buscarSelecaoPorId(req.params.id))
})

app.put('/selecoes/:id',(req,res)=>{
    let index = buscarIndexSelecao(req.params.id)
    selecoes[index].selecao = req.body.selecao
    selecoes[index].grupo = req.body.grupo

    res.json(selecoes)
})

app.delete('/selecoes/:id',(req,res)=>{
    let index = buscarIndexSelecao(req.params.id)
    selecoes.splice(index,1)
    res.send(`Selecao com id ${req.params.id} excluida com sucesso!`)
})


export default app
