let { Answer } = require('../models/answer');
const { get } = require('express/lib/response');

//
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

// truyen vao answerId => tra ve answer va 1 mang answer
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
    return { }
}

let getAnswerByQuestionId = async (questionId) => {
    let getAnswer = await Answer.findAll(
        {
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



