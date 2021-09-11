<template>
  <div>{{ msg }}</div>
</template>

<script>
export default {
  name: "Hello",

  data() {
    return {
      msg: "Hello"
    }
  },

  metaInfo () {
    return {
      title: 'Autobell Global_Hyundai Glovis',
      meta: [
        { name: 'description', content: 'Autobell is one-stop used car export service by Hyundai Motors. Experience the best easiest second-hand trading platform.' },
        { name: 'keywords', content: 'Used Car, Used vehicles, Hyundai Glovis, Autobell, Korean used car, second hand car' },
        { property: 'og:title', content: 'Autobell Global_Hyundai Glovis' },
        { property: 'og:site_name', content: 'Hyundai Glovis' },
        { property: 'og:description', content: 'Autobell is one-stop used car export service by Hyundai Motors. Experience the best easiest second-hand trading platform.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.autobellglobal.com/' },
        { property: 'og:image', content: 'https://www.autobellglobal.com/preview.png' } // 없으면 제거
      ]
    }
  }
}
</script>
