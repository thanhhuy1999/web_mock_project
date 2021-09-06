let { Answer } = require('../models/answer');
const { get } = require('express/lib/response');

//create a function to get a user from model by id
let findOneModel = async (model, id) => {
    return await model.findOne({
        //   attributes: {exclude: ["password", "role"]},
        where: {
            id: id,
        },
    });
}

//check and import data to database
let createAnswer = async (answerDescription, questionId, isCorrect) => {
    const result = await Answer.create({
        description: answerDescription,
        questionId: questionId,
        isCorrect: isCorrect

    }
    )
    return result;
}

// get Answer from database by answerId 
let getAnswer = async (answerId) => {
    let getAnswer = await Answer.findOne({
        where: {
            id: answerId,
        }
    }
    );
    if (getAnswer === null) {
        return null;
    }

    return {
        answer: getAnswer
    }
}

//check and allow update answers
let updateAnswer = async (answerId, description, isCorrect) => {
    let getAnswer = await findOneModel(Answer, answerId);
    if (getAnswer === null) {
        return null
    }
    await Answer.update({
        description: description,
        isCorrect: isCorrect
    }, {
        where: {
            id: answerId
        }
    })
    return result = await findOneModel(Answer, answerId);

}

//check and allow delete answer
let deleteAnswer = async (answerId) => {
    let getAnswer = await findOneModel(Answer, answerId);
    if (getAnswer === null) {
        return null
    }
    await Answer.destroy({
        where: {
            id: answerId
        }
    })
    return {}
}

//allow  get answer by questionId
let getAnswerByQuestionId = async (questionId) => {
    let getAnswer = await Answer.findAll(
        {
            attributes: {
                exclude: ['isCorrect', 'questionId']

            },
            where: {

                questionId: questionId,
            }
        }
    )
    return getAnswer
}
module.exports = {
    createAnswer,
    getAnswer,
    updateAnswer,
    deleteAnswer,
    getAnswerByQuestionId,
}



