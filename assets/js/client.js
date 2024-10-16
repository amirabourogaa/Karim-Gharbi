document.addEventListener('DOMContentLoaded', function () {
  const calendar = document.getElementById('calendar')
  const monthYearDisplay = document.getElementById('month-year')
  const prevMonthBtn = document.getElementById('prev-month')
  const nextMonthBtn = document.getElementById('next-month')
  const modalImage = document.getElementById('modalImage') // Image in the modal
  const imageModal = new bootstrap.Modal(document.getElementById('imageModal')) // Bootstrap modal instance

  let currentMonth = new Date().getMonth()
  let currentYear = new Date().getFullYear()

  function generateCalendar (month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    calendar.innerHTML = ''
    const monthNames = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ]
    monthYearDisplay.textContent = `${monthNames[month]} ${year}`

    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyCell = document.createElement('div')
      calendar.appendChild(emptyCell)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(
        day
      ).padStart(2, '0')}`
      const dayCell = document.createElement('div')
      dayCell.classList.add('calendar-day')
      dayCell.textContent = day
      dayCell.dataset.date = dateKey

      const eventImage = localStorage.getItem(dateKey)
      if (eventImage) {
        const previewImage = document.createElement('img')
        previewImage.src = eventImage
        previewImage.alt = `Preview for ${dateKey}`
        dayCell.appendChild(previewImage)

        dayCell.classList.add('with-image') // Apply the 'with-image' class for dates with an image

        // Show full image in modal on click
        dayCell.addEventListener('click', () => {
          modalImage.src = eventImage // Set the modal image source
          imageModal.show() // Show the Bootstrap modal
        })
      }

      calendar.appendChild(dayCell)
    }
  }

  // Month navigation
  prevMonthBtn.addEventListener('click', () => {
    if (currentMonth === 0) {
      currentMonth = 11
      currentYear -= 1
    } else {
      currentMonth -= 1
    }
    generateCalendar(currentMonth, currentYear)
  })

  nextMonthBtn.addEventListener('click', () => {
    if (currentMonth === 11) {
      currentMonth = 0
      currentYear += 1
    } else {
      currentMonth += 1
    }
    generateCalendar(currentMonth, currentYear)
  })

  // Initialize the calendar
  generateCalendar(currentMonth, currentYear)

  const calendarDays = document.querySelectorAll('.calendar-day')

  // Charger les événements depuis localStorage
  function loadEvents () {
    calendarDays.forEach(day => {
      const eventDate = day.dataset.date
      const eventKey = `event_${eventDate}`
      const eventImage = localStorage.getItem(eventKey)

      if (eventImage) {
        // Créer un élément image pour le jour
        const imgPreview = document.createElement('img')
        imgPreview.src = eventImage // Assurez-vous que l'image est une URL valide
        imgPreview.classList.add('preview') // Ajouter une classe pour le style
        imgPreview.style.width = '40px' // Définir la largeur de l'image
        imgPreview.style.height = '40px' // Définir la hauteur de l'image
        imgPreview.style.objectFit = 'cover' // Couvrir sans déformer l'image
        day.appendChild(imgPreview) // Ajouter l'image au jour du calendrier

        // Ajouter un événement click pour afficher l'image dans une modal
        day.addEventListener('click', function () {
          const modalImage = document.getElementById('modalImage')
          modalImage.src = eventImage // Charger l'image dans la modal
          $('#imageModal').modal('show') // Afficher la modal
        })
      } else {
        // Si aucune image n'est associée, réinitialiser l'apparence de la date
        day.classList.remove('event-day')
        day.style.backgroundImage = '' // Supprimer l'image d'arrière-plan
      }
    })
  }

  // Charger les événements lors du chargement de la page
  loadEvents()
})
