import React, { useEffect, useState } from 'react'
import ListItem from './list-item/list-item'
import FavItems from './list-item/favorite-list-item'
import axios from 'axios'

const binForPeople = []
const binForPlanets = []
const List = ({ tabSelected }) => {
  const [people, setPeople] = useState([])
  const [planets, setPlanets] = useState([])
  const [favoritePeople, setFavoritePeople] = useState([])
  const [favoritePlanets, setFavoritePlanets] = useState([])
  const baseUrl = 'https://swapi.dev/api/people/'
  const baseUrlPlanets = 'https://swapi.dev/api/planets/'

  useEffect(() => {
    callApi(setPeople, baseUrl)
    callApiPlanets(setPlanets, baseUrlPlanets)

    // eslint-disable-next-line
  }, [])

  function setToFavoriteList (element, from) {
    // add element to fav
    if (from === 'people') {
      console.log('setToFavorite fired')
      if (binForPeople.some((el) => el.name === element.name)) {
        // check if element already exist in the list
        window.alert('already exists')
      } else {
        let bin = []
        bin = [...bin, element] // set new element in bin
        binForPeople.push(...bin) // save it in global binForPeople to keep data
        setFavoritePeople([...binForPeople]) // save it to state
      }
    } else {
      console.log('setToFavorite fired')
      if (binForPlanets.some((el) => el.name === element.name)) {
        // check if element already exist in the list
        window.alert('already exists')
      } else {
        let bin = []
        bin = [...bin, element] // set new element in bin
        binForPlanets.push(...bin) // save it in global binForPlanets to keep data
        setFavoritePlanets([...binForPlanets]) // save it to state
      }
    }
  }

  function removeFromFavorite (element, from) {
    // remove element
    if (from === 'people') {
      const indexPeople = binForPeople.indexOf(element) // find index of specific element
      if (indexPeople > -1) {
        binForPeople.splice(indexPeople, 1) // remove if correct index found
      }
      setFavoritePeople([...binForPeople]) // add the new list to state (with element removed)
    } else {
      const indexPlanets = binForPlanets.indexOf(element) // find index of specific element
      if (indexPlanets > -1) {
        binForPlanets.splice(indexPlanets, 1) // remove if correct index found
      }
      setFavoritePlanets([...binForPlanets]) // add the new list to state (with element removed)
    }
  }
  
  return (
    <div className='listComponent'>
      <div className='listItemContainer'>
        {tabSelected === 'Search' ? (
          <ListItem
            data={people}
            dataPlanets={planets}
            addFav={(element, from) => setToFavoriteList(element, from)}
          />
        ) : (
          <FavItems
            favData={favoritePeople}
            favDataPlanets={favoritePlanets}
            remFav={(elem, from) => removeFromFavorite(elem, from)}
          />
        )}
      </div>
    </div>
  )
}

const temp2 = []
function callApi (setPeople, baseUrl) {
  axios
    .get(`${baseUrl}`)
    .then((res) => {
      temp2.push(...res.data.results)
      setPeople([...temp2])
      if (res.data.next !== null) {
        callApi(setPeople, res.data.next)
      }
    })
    .catch((err) => console.log('ERROR ---> ' + err))
}

const temp2Plantes = []
function callApiPlanets (setPlanets, baseUrlPlanets) {
  

  axios
    .get(`${baseUrlPlanets}`)
    .then((res) => {
      temp2Plantes.push(...res.data.results)
      setPlanets([...temp2Plantes])
      if (res.data.next !== null) {
        callApiPlanets(setPlanets, res.data.next)
      }
    })
    .catch((err) => console.log('ERROR ---> ' + err))
}

export default List
