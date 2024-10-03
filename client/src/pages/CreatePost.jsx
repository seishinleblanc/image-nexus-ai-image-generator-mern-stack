import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if(form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://hand-of-the-alchemist.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            prompt: form.prompt, }),
        });

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch('https://hand-of-the-alchemist.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        })

        await response.json();
        navigate('/');
      } catch (err) {
        alert(err)
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a prompt and generate an image')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name] : e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt })
  }

  return (
    <section className="max-w-7xl mx-auto crt">
      <div class="scanline"></div>
      <div class="typewriter2">
      <h1 className="font-bold text-[#4bc45b] text-[17px] line07">YOU HAVE SELECTED: GENERATE</h1>
        <h1 className="font-bold text-[#4bc45b] text-[17px] line08">SOME DATA INPUT WILL BE REQUIRED.</h1>
        <h1 className="font-bold text-[#4bc45b] text-[17px] line09">PROVIDE THE FOLLOWING INFORMATION:</h1>
        {/* <p className="mt-2 text-[#4bc45b] text-[16px] max-w-[500px]">I will need to collect some data first. Please provide the following information.</p> */}
      </div>

      <form className="mt-12 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 anim-box-generate">
          <div className="flex flex-row gap-20">
          <FormField 
            labelName="YOUR NAME:"
            type="text"
            name="name"
            placeholder="Dahlia Fakename"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField 
            labelName="PROMPT:"
            type="text"
            name="prompt"
            placeholder="A vampire narrowly avoiding the sunlight"
            value={form.prompt}
            handleChange={handleChange}
            // isSurpriseMe
            // handleSurpriseMe={handleSurpriseMe}
          />
          </div>

          <div className="relative bg-transparent border border-[#4bc45b] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-96 p-3 h-96 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt="form.prompt"
                className="w-full h-full object-contain"
              />

            ): (
              <img 
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
                </div>
            )}
          </div>
        </div>

        <div className="btn-box mt-5">
          <div className="flex gap-5">
                <button
                type="button"
                onClick={generateImage}
                className="btn sm:w-64"
                >
                  {generatingImg ? 'GENERATING...' : 'GENERATE'}
                </button>
          </div>

          <div className="">
          {/* <p className="mt-2 text-[#4bc45b] text-[14px]">Once the Alchemist has created the image you want, you can share it with others in the community.</p> */}
          <button
          type="submit"
          className="btn sm:w-64"
          >
            {loading ? 'ARCHIVING...' : 'ARCHIVE IMAGE'} 
          </button>

        </div>
        </div>
      </form>
    </section>
  )
}

export default CreatePost