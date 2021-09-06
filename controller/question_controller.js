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


/********************************************************************************************************************
 * Method: POST
 * Router: /question
 * Description:  Create Question by questionId (write in database)
 *     when user access to api /question by POST method, firstly, check Authentication, then get data from request of
 *                  body -> send data to service to create answer and send notice for user        
*******************************************************************************************************************/
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
        return res.status(500).send({ error: 'Internal Server Error' })
    }
})

/********************************************************************************************************************
 * Method: GET
 * Router: /question/:questionId
 * Description: Get (read) Question  by questionId (from database)
    when user access to api /question/:questionId by GET method, firstly, check Authentication, then get data 
            from request of  params -> send data to service to get question by questionId and send notice for user        
*******************************************************************************************************************/
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

/********************************************************************************************************************
 * Method: PUT
 * Router: /question/:questionId
 * Description: Update Question by questionId (from database)
    when user access to api /question/:questionId by PUT method, firstly, check Authentication, then get data 
            from request of params -> send data to service to update question by questionId and send notice for user        
*******************************************************************************************************************/
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


/********************************************************************************************************************
 * Method: DELETE
 * Router: /question/:questionId
 * Description: Delete Question by questionId (from database)
    when user access to api /question/:questionId by DELETE method, firstly, check Authentication, then get data 
            from request of params -> send data to service to delete question by questionId and send notice for user        
*******************************************************************************************************************/
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

/********************************************************************************************************************
 * Method: GET
 * Router: /question
 * Description: Get all questions (from database)
    when user access to api /question/:questionId by GET method, firstly, check Authentication, then get data 
            from request of params -> send data to service to get all question and send notice for user        
*******************************************************************************************************************/
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