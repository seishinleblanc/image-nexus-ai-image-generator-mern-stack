import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormField, Loader } from '../components'
import { preview } from '../assets'

const NewHome = () => {
  const navigate = useNavigate()
  const [command, setCommand] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState('home')
  const [stage, setStage] = useState('lines')
  const [form, setForm] = useState({ name: '', prompt: '', photo: '' })
  const [generatingImg, setGeneratingImg] = useState(false)

  const startGenerate = () => {
    setMode('generate')
    setStage('lines')
    setError('')
  }

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const response = await fetch('https://hand-of-the-alchemist.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        })

        const data = await response.json()

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
        setStage('image')
      } catch (err) {
        alert(err)
      } finally {
        setGeneratingImg(false)
      }
    } else {
      alert('Please enter a prompt')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (mode === 'generate' && stage === 'lines') {
      const timer = setTimeout(() => setStage('name'), 2500)
      return () => clearTimeout(timer)
    }
  }, [mode, stage])

  const handleCommand = () => {
    const cmd = command.trim().toLowerCase()
    if (cmd.includes('generate')) {
      startGenerate()
    } else if (cmd.includes('view archive')) {
      navigate('/archive')
    } else if (cmd !== '') {
      setError('ERROR: COMMAND NOT RECOGNIZED')
    }
    setCommand('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCommand()
    }
  }

return (
  <div className="min-h-screen">
    <section className="max-w-7xl mx-auto flex flex-col items-center crt">
      <div className="scanline"></div>
      {mode === 'home' && (
        <>
          <div className="typewriter">
            <h1 className="font-bold text-[#4bc45b] text-[17px] neonText align-center line01">WELCOME TO THE IMAGE NEXUS.</h1>
            <h1 className="font-bold text-[#4bc45b] text-[17px] neonText align-center pt-14 line02">I AM YOUR GUIDE, AN ARTIFICIAL INTELLIGENCE CAPABLE OF TRANSFORMING YOUR THOUGHTS INTO VISUAL REALITY.</h1>
            <h1 className="font-bold text-[#4bc45b] text-[17px] neonText align-center line03">DESCRIBE WHAT YOU SEEK--WORDS, BEINGS, MOMENTS LOST IN TIME--AND I WILL GENERATE IT.</h1>
            <h1 className="font-bold text-[#4bc45b] text-[17px] neonText align-center pt-14 line04">I ALSO HOLD ACCESS TO IMAGES CRAFTED FROM THE MINDS OF OTHERS, STORED WITHIN THE ARCHIVES.</h1>
            <h1 className="font-bold text-[#4bc45b] text-[17px] neonText line05">YOU MAY EXPLORE THEIR CREATIONS FOR INSPIRATION OR SIMPLY TO WITNESS WHAT HAS BEEN BROUGHT INTO EXISTENCE.</h1>
            <h1 className="font-bold text-[#4bc45b] text-[17px] neonText align-center pt-14 line06">WHAT WOULD YOU LIKE TO DO?</h1>
            <p className="font-bold text-[#4bc45b] text-[14px] mt-4 leading-relaxed">
              TYPE <span className="text-white">GENERATE</span> TO CREATE AN IMAGE<br />
              TYPE <span className="text-white">VIEW ARCHIVE</span> TO ACCESS SAVED IMAGES
            </p>
          </div>
          <div className="btn-box anim-box mt-4 w-full flex flex-col gap-3">
            <button onClick={startGenerate} className="btn">GENERATE</button>
            <a href="./archive" className="btn">VIEW ARCHIVE</a>
            <input
              type="text"
              placeholder="TYPE COMMAND"
              value={command}
              onChange={(e) => { setCommand(e.target.value); setError('') }}
              onKeyDown={onKeyDown}
              className="bg-transparent placeholder:text-zinc-400 placeholder:text-opacity-30 border-2 border-[#4bc45b] text-[#4bc45b] text-sm focus:ring-[#ebebed] focus:border-[#55f36a] outline-none p-3 w-full"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </>
      )}

      {mode === 'generate' && (
        <>
          <div className="typewriter2">
            <h1 className="font-bold text-[#4bc45b] text-[17px] line07">YOU HAVE SELECTED: GENERATE</h1>
            <h1 className="font-bold text-[#4bc45b] text-[17px] line08">SOME DATA INPUT WILL BE REQUIRED.</h1>
            <h1 className="font-bold text-[#4bc45b] text-[17px] line09">PROVIDE THE FOLLOWING INFORMATION:</h1>
          </div>

          {stage === 'name' && (
            <div className="mt-12 w-full max-w-xs">
              <FormField
                labelName="YOUR NAME:"
                type="text"
                name="name"
                placeholder="Dahlia Fakename"
                value={form.name}
                handleChange={handleChange}
              />
              <button type="button" onClick={() => setStage('prompt')} className="btn mt-5 w-full">CONTINUE</button>
            </div>
          )}

          {stage === 'prompt' && (
            <div className="mt-12 w-full max-w-xs">
              <FormField
                labelName="PROMPT:"
                type="text"
                name="prompt"
                placeholder="A vampire narrowly avoiding the sunlight"
                value={form.prompt}
                handleChange={handleChange}
              />
              <button type="button" onClick={generateImage} className="btn mt-5 w-full">
                {generatingImg ? 'GENERATING...' : 'GENERATE'}
              </button>
            </div>
          )}

          {stage === 'image' && (
            <div className="relative mt-12 bg-transparent border border-[#4bc45b] w-96 p-3 h-96 flex justify-center items-center">
              {form.photo ? (
                <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
              ) : (
                <img src={preview} alt="preview" className="w-9/12 h-9/12 object-contain opacity-40" />
              )}
              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  </div>
)

}

export default NewHome

{/* <div class="flex h-screen w-full items-center justify-center bg-black">
    <span class="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl box-content font-extrabold text-transparent text-center select-none">
    This is example of glowing text
  </span>
    <h1
        class="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto">
        This is example of glowing text
    </h1>
</div> */}