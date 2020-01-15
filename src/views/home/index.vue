<template>
  <!-- 首页 -->
  <div class="container">
    <van-tabs swipeable v-model="active">
      <van-tab  :title="item.name" v-for="item in channels" :key="item.id">
        <article-list @showMoreAction="openMoreAction" :channel_id="item.id"></article-list>
      </van-tab>
    </van-tabs>
    <span class="bar_btn"  @click="showChannelEdit= true">
      <van-icon name="wap-nav"/>
    </span>
    <van-popup :style="{ width: '80%' }" v-model="showMoreAction">
      <more-action @dislike="dislikeOrReport($event,'dislike')" @report="dislikeOrReport($event,'report')"></more-action>
    </van-popup>
    <van-action-sheet :round="false" v-model="showChannelEdit" title="编辑频道">
      <channel-edit :active="active" :channels="channels" @selectChannel="selectChannel"></channel-edit>
    </van-action-sheet>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
import ArticleList from './components/artile-list'
import { getMyChannels } from '../../api/channels'
import { disLikeArticle, reportArticle } from '../../api/article'
import MoreAction from './components/more-action'
import ChannelEdit from './components/channel-edit'

export default {
  components: {
    ArticleList,
    MoreAction,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],
      showMoreAction: false,
      articleId: null,
      showChannelEdit: false
    }
  },
  methods: {
    selectChannel (id) {
      const index = this.channels.findIndex(item => item.id === id)
      this.active = index
      this.showChannelEdit = false
    },
    async getMyChannels () {
      const result = await getMyChannels()
      this.channels = result.channels.map(item => ({
        id: item.id,
        name: item.name,
        loading: false,
        finished: false,
        articles: [],
        downLoading: false,
        timestamp: Date.now()
      }))
    },
    openMoreAction (artId) {
      this.showMoreAction = true
      this.articleId = artId
    },
    async dislikeOrReport  (params, operatetype) {
      try {
        if (this.articleId) {
          operatetype === 'dislike'
            ? await disLikeArticle({
              target: this.articleId
            }) : await reportArticle({
              target: this.articleId,
              type: params
            })
          this.$notify({ type: 'success', message: '操作成功' })
          eventBus.$emit('delArticle', this.articleId, this.channels[this.active].id)
          this.showMoreAction = false
        }
      } catch (err) {
        console.log(err)
        this.$notify({ type: 'danger', message: '操作失败' })
      }
    }
  },
  created () {
    this.getMyChannels()
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
