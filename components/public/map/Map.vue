<template>
  <div :id="id" :style="{width:width+'px',height:height+'px',margin:'34px auto'}" class="m-map" />
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    point: {
      type: Array,
      default () {
        return [116.46, 39.92]
      }
    }
  },
  data () {
    return {
      id: `map`,
      key: '0dbc0dfd7c775f2a927174493eab8220',
      markers: []
    }
  },
  mounted () {
    this.id = `map${Math.random().toString().slice(4, 6)}`
    window.onMapLoad = () => {
      const map = new window.AMap.Map(this.id, {
        resizeEnable: true,
        zoom: 10
      })
      this.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        const toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)
        this.point.map((item) => {
          this.markers.push(new window.AMap.Marker({
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
            position: item
          }))
        })
        this.markers.map((item) => {
          item.setMap(map)
        })
      })
      map.setFitView()
    }
    const url = `https://webapi.amap.com/maps?v=1.4.15&key=${this.key}&callback=onMapLoad`
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  }
}
</script>
