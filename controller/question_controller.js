let express = require('express')
let questionRouter = new express.Router()
let authenMiddleware = require('../middleware/authen_middleware')

let {
    createQuestion,
    getQuestion,
    updateQuestion,
    deleteQuestion,
    getAllQuestion
} = require('../service/question_service')

questionRouter.post('/', authenMiddleware.checkAuth, async (req, res) => {
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

questionRouter.get('/:questionId', authenMiddleware.checkAuth, async (req, res) => {
    try {
        let questionId = req.params.questionId;
        let result = await getQuestion(questionId);
        if (result === null) {
            return res.status(404).send({ message: "Not found Question" });
        }
        return res.send({
            message: "Sucessfully",
            data: result
        })
    }
    catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
})

questionRouter.put("/:questionId", authenMiddleware.checkAuth, async (req, res) => {
    try {
        let questionId = req.params.questionId;
        let description = req.body.description;
        // let validator = await questionValidator(req);
        // if (validator !== null) {
        //     return res.send({ message: validator });
        // }
        let result = await updateQuestion(questionId, description);
        if (result === null) {
            return res.status(404).send({ message: "Not found Question" });
        }
        return res.send({
            message: "Update successfully.",
            data: result
        });
    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
});


questionRouter.delete("/:questionId", authenMiddleware.checkAuth, async (req, res) => {
    try {
        let questionId = req.params.questionId;
        let result = await deleteQuestion(questionId);
        if (result === null) {
            return res.status(404).send({ message: "Not found Question" });
        }
        return res.send({
            message: "Delete successfully.",
            data: result
        });
    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
});

questionRouter.get("/", authenMiddleware.checkAuth, async (req, res) => {
    try {
        let result = await getAllQuestion();
        if (result === null) {
            return res.status(404).send({ message: "Not found Question" });
        }
        return res.send({
            message: "Sucess successfully.",
            data: result
        });
    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
})

module.exports = questionRouter