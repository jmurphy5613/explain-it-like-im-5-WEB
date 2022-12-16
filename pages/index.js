import Head from 'next/head';
import { useState } from 'react';
import Typed from 'react-typed';

const Home = () => {

  const [userInput, setInput] = useState('')
  const [generating, setGenerating] = useState(false)
  const [output, setOutput] = useState('')

  const generateOnInput = async () => {
    setGenerating(true)

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userInput })
    })

    const data = await response.json()
    const { output } = data
    setOutput(output.text)
    console.log("Open AI responded...", output)
    setGenerating(false)
  }

  return (
      <div className="root">
          <Head>
              <title>GPT-3 Writer</title>
          </Head>
          <div className="container">
              <div className="header">
                  <div className="header-title">
                      <h1>explain it like I'm 5</h1>
                  </div>
                  <div className="header-subtitle">
                      <h2>
                          get any topic explained to you like you're back in
                          kindergarden
                      </h2>
                  </div>
              </div>
              <div className="prompt-container">
                  <textarea
                      className="prompt-box"
                      placeholder="Type your event name here"
                      value={userInput}
                      onChange={(e) => setInput(e.target.value)}
                  />
                  <div className="prompt-buttons">
                      <a className="generate-button" onClick={generateOnInput}>
                          <div className="generate">
                              {generating ? (
                                  <span className="loader"></span>
                              ) : (
                                  <p>Generate</p>
                              )}
                          </div>
                      </a>
                  </div>
              </div>
              {output != "" && (
                  <h1>
                      <Typed strings={["hello"]} typeSpeed={40} />
                  </h1>
              )}
          </div>
      </div>
  );
};

export default Home;
