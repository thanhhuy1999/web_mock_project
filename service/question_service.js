let { Question } = require('../models/question')
let { Answer } = require('../models/answer');
const { get } = require('express/lib/response');

//creat a template fuction to use after
let findOneModel = async (model, id) => {
    return await model.findOne({
        //   attributes: {exclude: ["password", "role"]},
        where: {
            id: id,
        },
    });
}

//check and import data to database
let createQuestion = async (questionDescription) => {
    const result = await Question.create({
        description: questionDescription
    }
    )
    return result;
}

// truyen vao questionId => tra ve question va 1 mang answer
let getQuestion = async (questionId) => {
    let getQuestion = await Question.findOne({

        where: {
            id: questionId,
        }
    }
    );
    if (getQuestion === null) {
        return null;
    }

    //tim cac answer co question_id = questionId
    let getAnswer = null;
    if (getQuestion !== null) {
        getAnswer = await Answer.findAll(
            {
                attributes: {
                    exclude: ['isCorrect', 'questionId']
                },
                where: {
                    questionId: questionId,
                }
            }
        )
    }
    return {
        question: getQuestion,
        answer: getAnswer,
    }
}

let updateQuestion = async (questionId, description) => {
    let getQuestion = await findOneModel(Question, questionId);
    if (getQuestion === null) {
        return null
    }
    await Question.update({
        description: description,

    }, {
        where: {
            id: questionId
        }
    })
    return result = await findOneModel(Question, questionId);

}

let deleteQuestion = async (questionId) => {
    let getQuestion = await findOneModel(Question, questionId);
    if (getQuestion === null) {
        return null
    }
    await Question.destroy({
        where: {
            id: questionId
        }
    })
    return { }
}

let getAllQuestion = async () => {
    let result = await Question.findAll()
    return result
}

module.exports = {
    createQuestion,
    getQuestion,
    updateQuestion,
    deleteQuestion,
    getAllQuestion
}



