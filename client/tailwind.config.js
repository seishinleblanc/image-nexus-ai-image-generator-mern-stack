/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      fontFamily: {
        inter: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        card: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)',
        cardhover: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      tabSize: {
        1: '1',
        2: '2',
        4: '4',
        8: '8',
      }
    },
  },
  plugins: [
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          tab: (value) => ({
            tabSize: value
          }),
        },
        { values: theme('tabSize') }
      )
    })
  ],
};



// module.exports = {
//   theme: {
    // tabSize: {
    //   1: '1',
    //   2: '2',
    //   4: '4',
    //   8: '8',
    // }
//   },
//   plugins: [
  //   plugin(function({ matchUtilities, theme }) {
  //     matchUtilities(
  //       {
  //         tab: (value) => ({
  //           tabSize: value
  //         }),
  //       },
  //       { values: theme('tabSize') }
  //     )
  //   })
  // ]
// }
