import {  Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)


const generateAction = async (req, res) => {
    console.log("hereee")
    const prompt = `explain ${req.body.userInput} like I am a 5 year old`
    console.log(`API: ${prompt}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 250
    })

    const basePromptOutput = baseCompletion.data.choices.pop()

    res.status(200).json({output: basePromptOutput})
}

export default generateAction