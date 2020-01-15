<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <!-- list组件可以实现上拉加载 -->
      <van-list v-model="upLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in articles" :key="item.art_id.toString()">
          <div class="article_item">
            <h3 class="van-ellipsis">{{item.title}}</h3>
            <!-- 三图模式 -->
            <div class="img_box" v-if="item.cover.type===3">
              <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[0]" />
              <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[1]" />
              <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[2]" />
            </div>
            <!-- 单图模式 -->
            <div class="img_box" v-if="item.cover.type===1">
              <van-image lazy-load class="w100" fit="cover" :src="item.cover.images[0]" />
            </div>
            <div class="info_box">
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}}评论</span>
              <span>{{ item.pubdate | relTime }}</span>
              <span class="close" v-if="user.token" @click="$emit('showMoreAction',item.art_id.toString())">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import { mapState } from 'vuex'
import eventBus from '../../../utils/eventBus'

export default {
  name: 'article-list',
  // props: ['channel_id'],
  props: {
    channel_id: {
      type: Number,
      required: true,
      default: null
    }
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      // 是否开启下拉刷新
      downLoading: false,
      // 是否开启上拉加载
      upLoading: false,
      // 是否已完成全部加载数据
      finished: false,
      // 先定义一个数组来接受上拉加载的数据
      articles: [],
      refreshSuccessText: '',
      timestamp: null // 定义一个时间戳
    }
  },
  methods: {
    async onLoad () {
      await this.$sleep()
      const result = await getArticles({
        channel_id: this.channel_id, timestamp: this.timestamp || Date.now()
      })
      this.timestamp = result.pre_timestamp
      this.articles.push(...result.results)
      if (result.pre_timestamp) {
        this.upLoading = false
      } else {
        this.finished = true
      }
    },

    async onRefresh () {
      await this.$sleep()
      console.log('a')
      const result = await getArticles({
        channel_id: this.channel_id, timestamp: Date.now()
      })
      this.downLoading = false
      if (result.results.length) {
        this.articles = result.results
        this.finished = false
        this.timestamp = result.pre_timestamp
        // this.refreshSuccessText = '已是最新数据'
      } else {
        this.refreshSuccessText = '已是最新数据'
      }
    }
  },
  created () {
    eventBus.$on('delArticle', (articleId, channelId) => {
      if (this.channel_id === channelId) {
        const index = this.articles.findIndex(item => item.art_id.toString() === articleId)
        if (index > -1) {
          this.articles.splice(index, 1)
        }
      }
    })
    eventBus.$on('delArticle', () => (this.isReport = false))
  }
}
</script>

<style lang="less" scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
