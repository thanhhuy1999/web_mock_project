let { Question } = require('../models/question')
let { Answer } = require('../models/answer')

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
                where: {
                    questionId: questionId,
                }
            }
        )
    }
    return {
        answer: getAnswer,
        question: getQuestion
    }
}

module.exports = {
    createQuestion,
    getQuestion,
}



