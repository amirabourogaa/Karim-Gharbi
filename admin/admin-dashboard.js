document.addEventListener('DOMContentLoaded', function () {
  // Vérification de l'authentification
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html' // Rediriger vers la page de connexion
  }

  const eventForm = document.getElementById('eventForm')
  const eventList = document.getElementById('eventList')

  // Charger les événements stockés depuis localStorage
  function loadEvents () {
    eventList.innerHTML = ''
    const events = Object.keys(localStorage).filter(key =>
      key.startsWith('event_')
    )

    events.forEach(eventKey => {
      const eventImage = localStorage.getItem(eventKey)
      const eventDate = eventKey.replace('event_', '')

      // Créer un élément de liste pour chaque événement
      const listItem = document.createElement('li')
      listItem.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-center'
      )

      listItem.innerHTML = `
          <span>${eventDate}</span>
          <img src="${eventImage}" alt="Image for ${eventDate}" class="img-thumbnail" style="max-width: 50px;">
          <div>
            <button class="btn btn-sm btn-warning edit-btn" data-date="${eventDate}">Modifier</button>
            <button class="btn btn-sm btn-danger delete-btn" data-date="${eventDate}">Supprimer</button>
          </div>
        `

      eventList.appendChild(listItem)
    })
  }

  // Fonction pour ajouter ou modifier un événement
  eventForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const eventDate = document.getElementById('eventDate').value
    const eventImageInput = document.getElementById('eventImage')

    if (eventDate && eventImageInput.files[0]) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const imageBase64 = e.target.result
        const eventKey = `event_${eventDate}`

        // Enregistrer l'image dans le localStorage
        localStorage.setItem(eventKey, imageBase64)

        // Rafraîchir la liste des événements
        loadEvents()
        alert('Événement enregistré avec succès !')
      }

      reader.readAsDataURL(eventImageInput.files[0])
    } else {
      alert('Veuillez sélectionner une date et une image.')
    }
  })

  // Fonction pour supprimer un événement
  eventList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
      const eventDate = e.target.dataset.date
      const eventKey = `event_${eventDate}`

      if (
        confirm(`Voulez-vous vraiment supprimer l'événement du ${eventDate} ?`)
      ) {
        // Supprimer l'événement du localStorage
        localStorage.removeItem(eventKey)
        loadEvents() // Rafraîchir la liste
      }
    }
  })

  // Fonction pour modifier un événement (préremplir le formulaire)
  eventList.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-btn')) {
      const eventDate = e.target.dataset.date
      const eventKey = `event_${eventDate}`
      const eventImage = localStorage.getItem(eventKey)

      document.getElementById('eventDate').value = eventDate

      // Créer un fichier à partir de l'image en base64 pour le formulaire
      const blob = dataURLtoBlob(eventImage)
      const file = new File([blob], 'eventImage.png', { type: 'image/png' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      document.getElementById('eventImage').files = dataTransfer.files
    }
  })

  // Convertir base64 en Blob (nécessaire pour charger l'image dans le formulaire lors de l'édition)
  function dataURLtoBlob (dataURL) {
    const byteString = atob(dataURL.split(',')[1])
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ab], { type: mimeString })
  }

  // Charger les événements au démarrage
  loadEvents()
})
