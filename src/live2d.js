// window.__enable_live2d__ === undefined && (window.__enable_live2d__ = true)
// L2Dwidget.init()

// let modelFolder = 'model/'
// let source = {
//   config: null,
//   model: null,
//   textures: [],
//   physics: null,
//   pose: null,
// }

// function getByte(path, cb) {
//   xhr.open("GET", path, true)
//   xhr.responseType = "arraybuffer"

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       cb && cb(xhr.responseText)
//     }
//   }
//   xhr.send()
// }

// function getConfig() {
//   let config = chrome.runtime.getURL('config/model.config.json')
//   return new Promise((resolve, reject) => {
//     try {
//       getByte(config, resolve)
//     } catch {
//       reject()
//     }
//   })
// }

// function getModel() {
//   if (!source.config || !source.config.model) return Promise.reject()

//   let model = chrome.runtime.getURL(modelFolder + source.config.model)
//   return new Promise((resolve, reject) => {
//     try {
//       getByte(model, resolve)
//     } catch {
//       reject()
//     }
//   })
// }

// function getTexture() {
//   if (!source.config || !source.config.textures) return Promise.reject()

//   let promises = []
//   let textures = source.config.textures
//   for (let texture of textures) {
//     let t = chrome.runtime.getURL(modelFolder + texture)
//     promises.push(new Promise((resolve, reject) => {
//       try {
//         getByte(t, resolve)
//       } catch {
//         reject()
//       }
//     }))
//   }
//   return Promise.all(promises)
// }

// function getExpression() {
//   if (!source.config || !source.config.expression) return Promise.reject()

  
// }

// async function main() {
//   source.config = await getConfig()
//   source.model = await getModel()
//   source.textures = await getTexture()

//   let promises = []
// }

chrome.runtime.onMessage.addListener(function(request) {
    console.log('chrome.runtime.onMessage:', request);
    if(request.on && request.model) {
        window.__live2d_model_path__ = request.model
        L2Dwidget.init();
    }
})