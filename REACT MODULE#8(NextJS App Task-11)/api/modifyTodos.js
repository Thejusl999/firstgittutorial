// '/api/modifyTodos' page   -   For making http requests

import { MongoClient } from "mongodb";
async function handler(req,res){
    if(req.method==='POST'){
        const data=req.body;
        const client=await MongoClient.connect('mongodb+srv://tj999:tjtest@cluster0.9vuybed.mongodb.net/todos?retryWrites=true&w=majority');
        const db=client.db();
        const todosCollection=db.collection('todos');
        await todosCollection.insertOne(data);
        client.close();
        res.status(201).json({message:'Todo inserted!'});
    }
}
export default handler;