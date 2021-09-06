let express = require('express')
let answerRouter = new express.Router()
let authenMiddleware = require('../middleware/authen_middleware')

let {
    createAnswer,
    getAnswer,
    updateAnswer,
    deleteAnswer,
    getAnswerByQuestionId,
} = require('../service/answer_service')

/********************************************************************************************************************
 * Method: POST
 * Router: /answer
 * Description:  Create Answers (write in database)
 *     when user access to api /answer by POST method, firstly, check Authentication, then get data from request of
 *                  body -> send data to service to create answer and send notice for user        
*******************************************************************************************************************/

answerRouter.post('/', authenMiddleware.checkAuth, async (req, res) => {
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

/********************************************************************************************************************
 * Method: GET
 * Router: /answer/:answerId
 * Description:  Read answer from database
 *when user access to api /answer/:answerId by GET method,, firstly, check Authentication, then get data from request of
 *                  params -> send data to service to check and get answer by answerId
*******************************************************************************************************************/

answerRouter.get('/:answerId', authenMiddleware.checkAuth, async (req, res) => {
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

/********************************************************************************************************************
 * Method: PUT
 * Router: /answer/:answerId
 * Description:  Update answer (modify in database)
 when user access to api /answer/:answerId by PUT method, firstly, check Authentication, then get data from request of
 *                  params and body-> send data to service to check and update answer by answerId
*******************************************************************************************************************/
answerRouter.put("/:answerId", authenMiddleware.checkAuth, async (req, res) => {
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


/********************************************************************************************************************
 * Method: DELETE
 * Router: /answer/:answerId
 * Description:  Delete answer (delete in database)
 when user access to api /answer/:answerId by DELETE method,, firstly, check Authentication, then get data from request of
 *                  params and body-> send data to service to check and delete answer by answerId
*******************************************************************************************************************/

answerRouter.delete("/:answerId", authenMiddleware.checkAuth, async (req, res) => {
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

/********************************************************************************************************************
 * Method: GET
 * Router: /answers/question/:questionId
 * Description:  Get answers by questionId 
        when user access to api /answers/question/:questionId by GET method,, firstly, check Authentication, 
         then get data from request of params -> send data to service to check and get answer by questionId
*******************************************************************************************************************/
answerRouter.get('/question/:questionId', authenMiddleware.checkAuth, async (req, res) => {
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