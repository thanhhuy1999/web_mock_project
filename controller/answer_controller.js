let express = require('express')
let answerRouter = new express.Router()

let {
    createAnswer,
    getAnswer,
    updateAnswer,
    deleteAnswer,
    getAnswerByQuestionId,
} = require('../service/answer_service')

answerRouter.post('/', async (req, res) => {
    try {
        let description = req.body.description;
        let questionId = req.body.questionId;
        let isCorrect = req.body.isCorrect;

        let result = await createAnswer(description, questionId, isCorrect)
        return res.send({
            message: "Sucessfully",
            data: result
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Internal Server Error' })
    }
})

answerRouter.get('/:answerId', async (req, res) => {
    try {
        let answerId = req.params.answerId;
        let result = await getAnswer(answerId);
        if (result === null) {
            return res.status(404).send({ message: "Not found Answer" });
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

answerRouter.put("/:answerId", async (req, res) => {
    try {
        let answerId = req.params.answerId;
        let isCorrect = req.body.isCorrect;
        let description = req.body.description;
        // let validator = await answerValidator(req);
        // if (validator !== null) {
        //     return res.send({ message: validator });
        // }
        let result = await updateAnswer(answerId, description, isCorrect);
        if (result === null) {
            return res.status(404).send({ message: "Not found Answer" });
        }
        return res.send({
            message: "Update successfully.",
            data: result
        });
    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
});


answerRouter.delete("/:answerId", async (req, res) => {
    try {
        let answerId = req.params.answerId;
        let result = await deleteAnswer(answerId);
        if (result === null) {
            return res.status(404).send({ message: "Not found Answer" });
        }
        return res.send({
            message: "Delete successfully.",
            data: result
        });
    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
});

answerRouter.get('/question/:questionId', async (req, res) => {
    try {
        let questionId = req.params.questionId;
        let result = await getAnswerByQuestionId(questionId);
        if (result === null) {
            return res.status(404).send({ message: "Not found Answer" });
        }
        return res.send({
            message: "Get answer successfully.",
            data: result
        });
    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
})


module.exports = answerRouter