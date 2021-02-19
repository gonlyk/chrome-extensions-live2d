function fetch(url, cb) {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb && cb(xhr.response)
    } else {
      xhr.onerror()
    }
  }
  xhr.onerror = function () {
    let li = document.createElement('li')
    li.textContent = '加载错误'

    let ul = document.getElementById('model-list')
    ul.appendChild(li)
  }
  xhr.send()
}

let errorText = '模型需放在model目录下，配置路径为“model/” + 你的模型model.json'
function generateList(modelList, modelName) {
  let list = []
  for (let i in modelList) {
    let li = document.createElement('li')
    li.style.height = '20px'

    let text = /^model\//.test(modelList[i]) ?
      modelName[i] ? modelName[i]
      : ''
      : errorText
    let span = document.createElement('sapn')
    span.textContent = text

    let box = document.createElement('input')
    box.type = 'radio'
    box.name = 'model'
    box.style.float = 'right'
    box.onclick = function (e) {
      chrome.storage.local.set({ 'active-live2d': { on: true, model: modelList[i] } })
    }

    li.appendChild(span)
    li.appendChild(box)

    let kv = [modelList[i], li]
    list.push(kv)
  }

  return list
}

// 检查localmodel是否在modellist中
function checkLocalModel(model, modelList) {
  for (let i in modelList) {
    console.log(model, modelList[i][0])
    if (model === modelList[i][0])
      return parseInt(i)
  }
}

chrome.storage.local.get('active-live2d', function (live2d) {
  let off = document.getElementById('live2d-off')
  let on = document.getElementById('live2d-on')
  if (JSON.stringify(live2d) === '{}') {
    live2d = { on: true }
  } else {
    live2d = live2d['active-live2d']
  }
  console.log(live2d)
  if (!live2d || !live2d.on) {
    off.checked = true
  } else {
    on.checked = true
  }

  let config = chrome.runtime.getURL('config/model.config.json')
  fetch(config, function (cfg) {
    cfg = JSON.parse(cfg)
    console.log(cfg)
    if (cfg && cfg.modelList &&
      typeof cfg.modelList === 'object' &&
      cfg.modelList.length &&
      cfg.modelName &&
      typeof cfg.modelName === 'object' &&
      cfg.modelName.length) {
      let list = generateList(cfg.modelList, cfg.modelName)

      if (!list.length) return

      let model;
      let index = checkLocalModel(live2d.model, list)
      if (live2d.model && typeof index === 'number') {
        list[index][1].children[1].checked = true
        model = list[index][0]
      } else {
        list[0][1].children[1].checked = true
        model = list[0][0]
        // model失效，重置
        chrome.storage.local.set({
          'active-live2d': {
            on: live2d.on,
            model: list[0][0]
          }
        })
      }
      // 挂载
      let ul = document.getElementById('model-list')
      for (let i in list) {
        ul.appendChild(list[i][1])
      }
      // 设置禁用回调

      let off = document.getElementById('live2d-off')
      let on = document.getElementById('live2d-on')

      off.onclick = function () {
        chrome.storage.local.set({
          'active-live2d': {
            on: false,
            model: model
          }
        })
      }
      on.onclick = function () {
        chrome.storage.local.set({
          'active-live2d': {
            on: true,
            model: model
          }
        })
      }
    }
  })
})
