function levelOfService(ride) {
  let levelOfService
  if (ride.length > 1) {
    levelOfService = 'Noober Pool'
  } else if (ride[0].purpleRequested) {
    levelOfService = 'Noober Purple'
  } else if (ride[0].numberOfPassengers > 3) {
    levelOfService = 'Noober XL'
  } else {
    levelOfService = 'Noober X'
  }
  return levelOfService
}

function renderRides(ridesArray) {
  for (let i = 0; i < ridesArray.length; i++) {
    let ride = ridesArray[i]

    document.querySelector('.rides').insertAdjacentHTML('beforeend', `
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        <i class="fas fa-car-side"></i>
        <span>${levelOfService(ride)}</span>
      </h1>
    `)

    let borderClass
    let backgroundClass
    if (levelOfService(ride) == 'Noober Purple') {
      borderClass = 'border-purple-500'
      backgroundClass = 'bg-purple-600'
    } else {
      borderClass = 'border-gray-900'
      backgroundClass = 'bg-gray-600'
    }

    for (let i = 0; i < ride.length; i++) {
      let leg = ride[i]

      document.querySelector('.rides').insertAdjacentHTML('beforeend', `
        <div class="border-4 ${borderClass} p-4 my-4 text-left">
          <div class="flex">
            <div class="w-1/2">
              <h2 class="text-2xl py-1">${leg.passengerDetails.first} ${leg.passengerDetails.last}</h2>
              <p class="font-bold text-gray-600">${leg.passengerDetails.phoneNumber}</p>
            </div>
            <div class="w-1/2 text-right">
              <span class="rounded-xl ${backgroundClass} text-white p-2">
                ${leg.numberOfPassengers} passengers
              </span>
            </div>
          </div>
          <div class="mt-4 flex">
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">PICKUP</div>
              <p>${leg.pickupLocation.address}</p>
              <p>${leg.pickupLocation.city}, ${leg.pickupLocation.state} ${leg.pickupLocation.zip}</p>
            </div>
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">DROPOFF</div>
              <p>${leg.dropoffLocation.address}</p>
              <p>${leg.dropoffLocation.city}, ${leg.dropoffLocation.state} ${leg.dropoffLocation.zip}</p>
            </div>
          </div>
        </div>
      `)
    }
  }
}

window.addEventListener('DOMContentLoaded', async function() {
  let allRidesButton = document.querySelector('#all-filter')
  let nooberPurpleButton = document.querySelector('#noober-purple-filter')
  let nooberPoolButton = document.querySelector('#noober-pool-filter')
  let nooberXLButton = document.querySelector('#noober-xl-filter')
  let nooberXButton = document.querySelector('#noober-x-filter')
  let rideData = await fetch('https://kiei451.com/api/rides.json')
  let allRides = await rideData.json()
  let buttons = [allRidesButton, nooberPurpleButton, nooberPoolButton, nooberXLButton, nooberXButton]
  let levelOfServiceList = ['all', 'Noober Purple', 'Noober Pool', 'Noober XL', 'Noober X']
  let button
  let background

  function clearBG(buttons){
    for (let n = 0; n < buttons.length; n++){
      let b = buttons[n]
      b.classList.remove('bg-blue-200')
      b.classList.remove('bg-purple-200')
    }
  }

  function getBG(levelOfService){
    if (levelOfService == 'Noober Purple'){
      background = 'bg-purple-200'
    } else{
      background = 'bg-blue-200'
    }
  }

  for (let r = 0; r < buttons.length; r++){
    button = buttons[r]
    button.addEventListener('click', async function(event){
      event.preventDefault()
      // clearBG(buttons)
      // getBG(levelOfServiceList[r])
      // button.classList.add(background)
      // Couldn't get the button shading to work with this looped version, the color is correct on each click but only the last button gets the background color
      console.log(`You are viewing ${levelOfServiceList[r]} rides.`)
      document.querySelector('.rides').innerHTML = ''
      let selectedRides = []
      if (levelOfServiceList[r] == 'all'){
        for (let z = 0; z < allRides.length; z++){
          let ride = allRides[z]
          selectedRides.push(ride)
        }
      } else{
        for (let i = 0; i < allRides.length; i++){
          let ride = allRides[i]
          if (levelOfService(ride) == levelOfServiceList[r]){
            selectedRides.push(ride)
          }
        }
      }
      renderRides(selectedRides)
    })
  }

  // allRidesButton.addEventListener('click', async function(event){
  //   event.preventDefault()
  //   console.log('You are viewing all rides.')
  //   clearBG(buttons)
  //   allRidesButton.classList.add('bg-blue-200')
  //   document.querySelector('.rides').innerHTML = ''
  //   renderRides(allRides)
  // })

  // nooberPurpleButton.addEventListener('click', async function(event){
  //   event.preventDefault()
  //   console.log('You are viewing Noober Purple rides.')
  //   clearBG(buttons)
  //   nooberPurpleButton.classList.add('bg-purple-200')
  //   document.querySelector('.rides').innerHTML = ''
  //   let purpleRides = []
  //   for (let i = 0; i < allRides.length; i++){
  //     let ride = allRides[i]
  //     if (levelOfService(ride) == 'Noober Purple'){
  //       purpleRides.push(ride)
  //     }
  //   }
  //   renderRides(purpleRides)
  // })
  
  // nooberPoolButton.addEventListener('click', async function(event){
  //   event.preventDefault()
  //   console.log('You are viewing Noober Pool rides.')
  //   clearBG(buttons)
  //   nooberPoolButton.classList.add('bg-blue-200')
  //   document.querySelector('.rides').innerHTML = ''
  //   let poolRides = []
  //   for (let i = 0; i < allRides.length; i++){
  //     let ride = allRides[i]
  //     if (levelOfService(ride) == 'Noober Pool'){
  //       poolRides.push(ride)
  //     }
  //   }
  //   renderRides(poolRides)
  // })
  
  // nooberXLButton.addEventListener('click', async function(event){
  //   event.preventDefault()
  //   console.log('You are viewing Noober XL rides.')
  //   clearBG(buttons)
  //   nooberXLButton.classList.add('bg-blue-200')
  //   document.querySelector('.rides').innerHTML = ''
  //   let xLRides = []
  //   for (let i = 0; i < allRides.length; i++){
  //     let ride = allRides[i]
  //     if (levelOfService(ride) == 'Noober XL'){
  //       xLRides.push(ride)
  //     }
  //   }
  //   renderRides(xLRides)
  // })
  
  // nooberXButton.addEventListener('click', async function(event){
  //   event.preventDefault()
  //   console.log('You are viewing Noober X rides.')
  //   clearBG(buttons)
  //   nooberXButton.classList.add('bg-blue-200')
  //   document.querySelector('.rides').innerHTML = ''
  //   let xRides = []
  //   for (let i = 0; i < allRides.length; i++){
  //     let ride = allRides[i]
  //     if (levelOfService(ride) == 'Noober X'){
  //       xRides.push(ride)
  //     }
  //   }
  //   renderRides(xRides)
  // })
})

