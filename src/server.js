const fs = require('fs')

const express = require("express")

//const template = fs.readFileSync('./config/template.html', 'utf-8');
// SSR 중요 모듈.
const renderer = require("vue-server-renderer").createRenderer()

const server = express()
const {createApp} = require("../dist/main")

server.get("*", (req, res) => {
  const { app } = createApp()
  const context = { url: req.url, meta: app.$meta() }

  // Vue.js를 번들링된 js만으로 내보내는것이 아니라, 컴파일 완료된 HTML 파일로 제공할 수 있다.
  renderer.renderToString(app, context).then(html => {
    // vue-meta 제공 데이터 추출
    const {
      title, htmlAttrs, headAttrs, bodyAttrs, link,
      style, script, noscript, meta
    } = context.meta.inject();

    // 서버에서 진행하는 랜더링이므로 직접 값을 할당해준다. (이 과정에서 template.html에 있는 필요한 다른 태그도 여기에 직접 넣어야 한다.)
    // https://vue-meta.nuxtjs.org/guide/ssr.html#inject-metadata-into-page-string
    return res.send(`
      <!doctype html>
      <html ${htmlAttrs.text(true)}>
        <head ${headAttrs.text()}>
          <meta charset="utf-8">
          ${title.text()}
          ${meta.text()}
          ${link.text()}
          ${style.text()}
          ${script.text()}
          ${noscript.text()}

          <!--
            여기에 기존 글로비스 페이지 템플릿의 헤더에 있던 태그들을 넣어주면 된다.

            예) 
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="referrer" content="strict-origin-when-cross-origin">
            ... 등등

            혹은 기존 페이지에 자동화된 수 많은 css 파일들도 여기에 넣어줄 수 있다.
          -->
        </head>
        <body ${bodyAttrs.text()}>
          <!-- prepended metaInfo properties -->
          ${style.text({ pbody: true })}
          ${script.text({ pbody: true })}
          ${noscript.text({ pbody: true })}

          <!-- app -->
          ${html}

          <!-- appended metaInfo properties -->
          ${style.text({ body: true })}
          ${script.text({ body: true })}
          ${noscript.text({ body: true })}
        </body>
      </html>
    `)
  })
})

server.listen(8080, () => console.log("Started server on port 8080."))
