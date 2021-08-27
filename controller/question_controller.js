let express = require('express')
let questionRouter = new express.Router()

let {
    createQuestion,
    getQuestion,
} = require('../service/question_service')

questionRouter.post('/', async (req, res) => {
    try {
        let description = req.body.description;
        let result = await createQuestion(description)
        return res.send({
            message: "Sucessfully",
            data: result
        })
    }
    catch (error) {
        // console.log(error);
        return res.status(500).send({ error: 'Internal Server Error/cuong' })
    }
})

questionRouter.get('/:questionId', async (req, res) => {
    try {
        let questionId = req.params.questionId;
        let result = await getQuestion(questionId);
        if (result === null) {
            return res.status(404).send({ message: "Not found Post" });
        }
        return res.send({
            message: "Sucessfully",
            data: result
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Server Error" });
    }
})


module.exports = questionRouter