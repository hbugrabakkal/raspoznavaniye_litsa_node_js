async function requestExternalImage(imageUrl) {
  const res = await fetch('fetch_external_image', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ imageUrl })
  })
  if (!(res.status < 400)) {
    console.error(res.status + ' : ' + await res.text())
    throw new Error('не удалось получить изображение с URL: ' + imageUrl)
  }

  let blob
  try {
    blob = await res.blob()
    return await faceapi.bufferToImage(blob)
  } catch (e) {
    console.error('!!!:', blob)
    console.error('ошибка:', e)
    throw new Error('не удалось загрузить изображение с URL: ' + imageUrl)
  }
}

function renderNavBar(navbarId, exampleUri) {
  const examples = [
    {
      uri: 'face_detection',
      name: 'Обнаружение Лица'
    },
    {
      uri: 'face_landmark_detection',
      name: 'Обнаружение наземных ориентиров'
    },
    {
      uri: 'face_expression_recognition',
      name: 'Распознавание выражений лица'
    },
    {
      uri: 'age_and_gender_recognition',
      name: 'Возраст и гендерное признание'
    },
    {
      uri: 'face_recognition',
      name: 'Распознавание лица'
    },
    {
      uri: 'face_extraction',
      name: 'Экстракция лица'
    },
    {
      uri: 'video_face_tracking',
      name: 'Видео отслеживание лица'
    },
    {
      uri: 'webcam_face_detection',
      name: 'Веб-камера Обнаружение лиц'
    },
    {
      uri: 'webcam_face_landmark_detection',
      name: 'Веб-камера Обнаружение ориентира лиц'
    },
    {
      uri: 'webcam_face_expression_recognition',
      name: 'Распознавание выражений лица через веб-камеру'
    },
    {
      uri: 'webcam_age_and_gender_recognition',
      name: 'Веб-камера Возраст и гендерное распознавание'
    },
    {
      uri: 'bbt_face_landmark_detection',
      name: 'Обнаружение наземных ориентиров'
    },
    {
      uri: 'bbt_face_similarity',
      name: 'сходство лицо'
    },
    {
      uri: 'bbt_face_matching',
      name: 'сравнение лица '
    },
    {
      uri: 'bbt_face_recognition',
      name: 'Распознавание лица'
    },
    {
      uri: 'batch_face_landmarks',
      name: 'Batch Face Landmark Detection'
    },
    {
      uri: 'batch_face_recognition',
      name: 'Пакетное распознавание лиц'
    }
  ]

  const navbar = $(navbarId).get(0)
  const pageContainer = $('.page-container').get(0)

  const header = document.createElement('h3')
  header.innerHTML = examples.find(ex => ex.uri === exampleUri).name
  pageContainer.insertBefore(header, pageContainer.children[0])

  const menuContent = document.createElement('ul')
  menuContent.id = 'slide-out'
  menuContent.classList.add('side-nav', 'fixed')
  navbar.appendChild(menuContent)

  const menuButton = document.createElement('a')
  menuButton.href='#'
  menuButton.classList.add('button-collapse', 'show-on-large')
  menuButton.setAttribute('data-activates', 'slide-out')
  const menuButtonIcon = document.createElement('img')
  menuButtonIcon.src = 'menu_icon.png'
  menuButton.appendChild(menuButtonIcon)
  navbar.appendChild(menuButton)

  const li = document.createElement('li')
  const githubLink = document.createElement('a')
  githubLink.classList.add('waves-effect', 'waves-light', 'side-by-side')
  githubLink.id = 'github-link'
  githubLink.href = 'https://github.com/justadudewhohacks/api-litso.js'
  const h5 = document.createElement('h5')
  h5.innerHTML = 'api-litso.js'
  githubLink.appendChild(h5)
  const githubLinkIcon = document.createElement('img')
  githubLinkIcon.src = 'github_link_icon.png'
  githubLink.appendChild(githubLinkIcon)
  li.appendChild(githubLink)
  menuContent.appendChild(li)

  examples
    .forEach(ex => {
      const li = document.createElement('li')
      if (ex.uri === exampleUri) {
        li.style.background='#b0b0b0'
      }
      const a = document.createElement('a')
      a.classList.add('waves-effect', 'waves-light', 'pad-sides-sm')
      a.href = ex.uri
      const span = document.createElement('span')
      span.innerHTML = ex.name
      span.style.whiteSpace = 'nowrap'
      a.appendChild(span)
      li.appendChild(a)
      menuContent.appendChild(li)
    })

  $('.button-collapse').sideNav({
    menuWidth: 260
  })
}

function renderSelectList(selectListId, onChange, initialValue, renderChildren) {
  const select = document.createElement('select')
  $(selectListId).get(0).appendChild(select)
  renderChildren(select)
  $(select).val(initialValue)
  $(select).on('change', (e) => onChange(e.target.value))
  $(select).material_select()
}

function renderOption(parent, text, value) {
  const option = document.createElement('option')
  option.innerHTML = text
  option.value = value
  parent.appendChild(option)
}