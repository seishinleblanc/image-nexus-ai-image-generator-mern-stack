import React from 'react'

const NewHome = () => {

return (
<div class="min-h-screen">
<section className="max-w-7xl mx-auto flex flex-col items-center crt">
<div class="scanline"></div>
    <div class="typewriter">
    <h1 className="font-bold text-[#4bc45b] text-[17px] neonText align-center line01">WELCOME TO THE IMAGE NEXUS.</h1>
        <h1 className="font-bold text-[#4bc45b] text-[17px] neonText align-center pt-14 line02">I AM YOUR GUIDE, AN ARTIFICIAL INTELLIGENCE CAPABLE OF TRANSFORMING YOUR THOUGHTS INTO VISUAL REALITY.</h1>
        <h1 className="font-bold text-[#4bc45b] text-[17px] neonText align-center line03">DESCRIBE WHAT YOU SEEK--WORDS, BEINGS, MOMENTS LOST IN TIME--AND I WILL GENERATE IT.</h1>
        <h1 className="font-bold text-[#4bc45b] text-[17px] neonText align-center pt-14 line04">I ALSO HOLD ACCESS TO IMAGES CRAFTED FROM THE MINDS OF OTHERS, STORED WITHIN THE ARCHIVES.</h1>
        <h1 className="font-bold text-[#4bc45b] text-[17px] neonText line05">YOU MAY EXPLORE THEIR CREATIONS FOR INSPIRATION OR SIMPLY TO WITNESS WHAT HAS BEEN BROUGHT INTO EXISTENCE.</h1>
        <h1 className="font-bold text-[#4bc45b] text-[17px] neonText align-center pt-14 line06">WHAT WOULD YOU LIKE TO DO?</h1>
        </div>
        <div class="btn-box anim-box">
        <a href="./create-post" class="btn">GENERATE</a>
        <a href="./archive" class="btn">VIEW ARCHIVE</a>
        </div>
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