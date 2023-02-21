import React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import {Form, Button, Input, Select, Spin} from "antd";

const configuration = new Configuration({
});
const openai = new OpenAIApi(configuration);

function App() {
  const [Name, setName] = useState('');
  const [Profession, setProfession] = useState('');
  const [MoviesActedOn, setMoviesActedOn] = useState('');
  const [LanguageSpeak, setLanguageSpeak] = useState('');
  const [Industry, setIndustry] = useState('');
  const [AwardsandAchievements, setAwardsandAchievements] = useState('');
  const [result, setResult] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProfessionChange = (e) => {
    setProfession(e.target.value);
  };

  const handleMoviesActedOnChange = (e) => {
    console.log(e)
    setMoviesActedOn(e);
  };

  const handleLanguageSpeakChange = (e) => {
    console.log(e)
    setLanguageSpeak(e);
  };

  const handleIndustryChange = (e) => {
    setIndustry(e.target.value);
  };

  const handleAwardsandAchievementsChange = (e) => {
    console.log(e)
    setAwardsandAchievements(e);
  };

  const handleSubmit = async (e) => {
    //e.preventDefault();
    setResult(null);

    console.log(Name,Profession,MoviesActedOn,LanguageSpeak,Industry,AwardsandAchievements);

    let value = `Generate a unique plagiarism free profile content in one paragraph 100 words for name: ${Name},Profession: ${Profession},Movies Acted on: ${MoviesActedOn},Languages Speak: ${LanguageSpeak},Industry: ${Industry},Awards and Achievements: ${AwardsandAchievements}`;

    console.log(value)
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: value,
      temperature: 1,
      max_tokens: 800,
      top_p: 1.0,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    setResult(response.data?.choices[0].text);
  };

  return (
    <Form autoComplete="off"
      onFinish={handleSubmit}
       labelCol={{ span: 10}} 
       wrapperCol={{ span: 14}}
       >
          <Form.Item
          name="name" 
          label="Name"
          onChange={handleNameChange}
          rules={[
            {
              required: true,
              message: "please enter your name",
            },
            { whitespace: true },
            { min: 3},
          ]}
          hasFeedback
          >
           <Input placeholder="Type your name" />
         </Form.Item>

         <Form.Item
          name="profession" 
          label="Profession"
          onChange={handleProfessionChange}
          rules={[
            {
              required: true,
              message: "please enter your profession",
            },
          ]}
          hasFeedback
          >
           <Input placeholder="Type your profession" />
         </Form.Item>

          <Form.Item
          name="movies acted on" 
          label="Movies Acted On"
          onChange={handleMoviesActedOnChange}
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
          >
          <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Tags Movies"
          onChange={handleMoviesActedOnChange}
         />
        </Form.Item>

        <Form.Item
          name="languages speaks" 
          label="Languages Speaks"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
          >
          <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Languages"
          onChange={handleLanguageSpeakChange}
         />
          </Form.Item>

          <Form.Item
          name="industry" 
          label="Industry"
          onChange={handleIndustryChange}
          rules={[
            {
              required: true,
              message: "please enter your industry",
            },
          ]}
          hasFeedback
          >
           <Input placeholder="Type your industry" />
         </Form.Item>

         <Form.Item
          name="awards and achievements" 
          label="Awards and Achievements"
          onChange={handleAwardsandAchievementsChange}
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
          >
          <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Tags Awards and achievements"
          onChange={handleAwardsandAchievementsChange}
         />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
           <Button block type="primary" htmlType="submit">
             SUBMIT
           </Button>
       </Form.Item>
       <Form.Item label="Description">
        {result ? (
        <p>{result}</p>
  ) : (
    <Spin size="small" />
  )}
</Form.Item>       
        </Form>
  );
        }


export default App;
