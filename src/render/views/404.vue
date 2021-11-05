<template>
  <div class="fxg-1 fxsh-0 d-f fxd-c" style="background: #f0f2f5;">
    <div class="wscn-http404 fxg-1 fxsh-0 d-f ai-c jc-c">
      <div class="pic-404">
        <img alt="404" class="pic-404__parent" :src="IMG_404">
        <img alt="404" class="pic-404__child left" :src="IMG_404_CLOUD">
        <img alt="404" class="pic-404__child mid" :src="IMG_404_CLOUD">
        <img alt="404" class="pic-404__child right" :src="IMG_404_CLOUD">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">
          OOPS!
        </div>
        <div class="bullshit__info">
          您似乎进到了一个次元世界，请点击以下按钮返回主页或者发送错误报告
        </div>
        <a class="bullshit__return-home" href="/">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IMG_404 from '@/render/assets/404_images/404.png'
import IMG_404_CLOUD from '@/render/assets/404_images/404_cloud.png'
import { useStore } from 'vuex'
// console.log(useStore().state.template.testData)
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404 {
  max-width: 1200px;

  .pic-404 {
    position: relative;
    float: left;
    width: 600px;
    padding: 150px 0;
    overflow: hidden;

    &__parent {
      width: 100%;
    }

    &__child {
      position: absolute;

      &.left {
        top: 17px;
        left: 220px;
        width: 80px;
        opacity: 0%;
        animation-name: c;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-delay: 1s;
        animation-fill-mode: forwards;
      }

      &.mid {
        top: 10px;
        left: 420px;
        width: 46px;
        opacity: 0%;
        animation-name: CloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-delay: 1.2s;
        animation-fill-mode: forwards;
      }

      &.right {
        top: 100px;
        left: 500px;
        width: 62px;
        opacity: 0%;
        animation-name: CloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-delay: 1s;
        animation-fill-mode: forwards;
      }

      @keyframes CloudLeft {
        0% {
          top: 17px;
          left: 220px;
          opacity: 0%;
        }

        20% {
          top: 33px;
          left: 188px;
          opacity: 100%;
        }

        80% {
          top: 81px;
          left: 92px;
          opacity: 100%;
        }

        100% {
          top: 97px;
          left: 60px;
          opacity: 0%;
        }
      }

      @keyframes CloudMid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0%;
        }

        20% {
          top: 40px;
          left: 360px;
          opacity: 100%;
        }

        70% {
          top: 130px;
          left: 180px;
          opacity: 100%;
        }

        100% {
          top: 160px;
          left: 120px;
          opacity: 0%;
        }
      }

      @keyframes CloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0%;
        }

        20% {
          top: 120px;
          left: 460px;
          opacity: 100%;
        }

        80% {
          top: 180px;
          left: 340px;
          opacity: 100%;
        }

        100% {
          top: 200px;
          left: 300px;
          opacity: 0%;
        }
      }
    }
  }

  .bullshit {
    position: relative;
    float: left;
    width: 300px;
    padding: 150px 0;
    overflow: hidden;

    &__oops {
      margin-bottom: 20px;
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0%;
      animation-name: SlideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }

    &__headline {
      margin-bottom: 10px;
      font-size: 20px;
      line-height: 24px;
      color: #1482f0;
      opacity: 0%;
      animation-name: SlideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }

    &__info {
      margin-bottom: 30px;
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0%;
      animation-name: SlideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }

    &__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      font-size: 14px;
      line-height: 36px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      background: #1482f0;
      border-radius: 100px;
      opacity: 0%;
      animation-name: SlideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }

    @keyframes SlideUp {
      0% {
        opacity: 0%;
        transform: translateY(60px);
      }

      100% {
        opacity: 100%;
        transform: translateY(0);
      }
    }
  }
}
</style>
