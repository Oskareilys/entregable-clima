import React from 'react'
import { useRef } from 'react';
import './styles/CityInputCard.css'

const CityInputCard = ({ setCityInput }) => {
    const inputSearch = useRef()
    console.log(inputSearch.current)

    const handleSubmit = e => {
        e.preventDefault()
        setCityInput(inputSearch.current.value)
    }


  return (
    <form className='city' onSubmit={handleSubmit}>
    <input className='city__input' ref={inputSearch} type="text" />
    <button className='city__btn'>Buscar</button>
  </form>
  )
}

export default CityInputCard