import React from 'react'

const Navbar = () => {
  return (
    <nav className="sticky top-0 flex justify-between bg-stone-600 text-white py-5">
      <div className="logo">
        <span className="font-bold text-4xl mx-9">
          TaskTick
        </span>
      </div>
      <ul className="flex gap-10 mx-9 items-center">
        <li className="cursor-pointer hover:font-bold text-xl">Home</li>
        <li className="cursor-pointer hover:font-bold text-xl">Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
