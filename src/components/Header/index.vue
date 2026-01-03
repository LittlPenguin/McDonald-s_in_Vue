<script setup lang="ts">
import { watch, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAccountStore, useCarStore } from "@/Store/index.ts";
const accountStore = useAccountStore();
const carStore = useCarStore();
const router = useRouter();
const route = useRoute();

//判断路径变化
const routePath = ref(route.path);
watch(
  () => route.path,
  (newpath) => {
    routePath.value = newpath;
  },
  { deep: true }
);

const goClearLogin = () => {
  accountStore.clearLogin();
};
</script>
<template>
  <div class="HeaderCom">
    <div class="HeaderCom_left" @click="router.push('/')">
      <v-icon class="iconfont icon-M headerM" size="x-large"></v-icon>
      <span>Est. 1955</span>
    </div>

    <div>
      <ul class="HeaderCom_middle">
        <li
          :class="{ active: routePath === '/menu' }"
          @click="router.push('/menu')"
        >
          <div class="span">
            Menu
            <v-icon class="iconfont icon-menu" icon="$vuetify"></v-icon>
          </div>
        </li>
        <li
          :class="{ active: routePath === '/offers' }"
          @click="router.push('/offers')"
        >
          <div class="span">
            Offers
            <v-icon class="iconfont icon-youhui" icon="$vuetify"></v-icon>
          </div>
        </li>
        <li
          :class="{ active: routePath === '/car' }"
          @click="router.push('/car')"
        >
          <div class="span">
            <v-badge
              location="top right"
              color="warning"
              :model-value="carStore.total"
              :content="carStore.total"
            >
              OrderCar
              <v-icon class="iconfont icon-shopping" icon="$vuetify"></v-icon>
            </v-badge>
          </div>
        </li>
      </ul>
    </div>
    <div style="display: flex; justify-content: center; align-items: center">
      <div
        v-if="!accountStore.Email"
        class="HeaderCom_right"
        @click="router.push('/login')"
      >
        <span style="padding: 0 10px" class="HeaderCom_ right_span"
          >My Account</span
        >
        <v-icon
          class="iconfont icon-renwu-ren headerShopping"
          size="large"
        ></v-icon>
      </div>
      <div
        v-if="accountStore.Email"
        class="HeaderCom_right"
        @click="router.push('/car')"
      >
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <div color="primary" v-bind="props">
              <span style="padding: 0 10px" class="HeaderCom_ right_span"
                >My Order</span
              >
              <v-icon
                class="iconfont icon-renwu-ren headerShopping"
                size="large"
              ></v-icon>
            </div>
          </template>
          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: center;
              cursor: pointer;
            "
            @click="goClearLogin"
          >
            退出账户?
          </div>
        </v-menu>
      </div>
      <div class="headerMenu">
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <div color="primary" v-bind="props">
              <v-icon class="iconfont icon-menu" size="large"></v-icon>
            </div>
          </template>
          <ul>
            <li style="cursor:pointer;" @click="router.push('/menu')">Menu</li>
            <li style="cursor:pointer;" @click="router.push('/offers')">Offers</li>
            <li style="cursor:pointer;" @click="router.push('/car')">OrderCar</li>
          </ul>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.HeaderCom {
  position: fixed;
  top: 0px;
  z-index: 99;
  margin-top: 20px;
  width: 100vw;
  height: 88px;
  padding: 10px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bolder;
  background-color: transparent;
  user-select: none;

  & .HeaderCom_left {
    font-size: 19px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    cursor: pointer;
    flex-direction: column;
    transition: all 0.3s ease-in-out;
    & .headerM {
      transition: all 0.3s ease-in-out;
      color: #ffc000;
    }
    &:hover {
      color: #ffc000;
    }
    &:hover .headerM {
      transform: scale(1.2);
    }
  }
  & .HeaderCom_middle {
    user-select: none;
    width: 451px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-transform: uppercase;
    font-size: 20px;
    padding: 5px;
    background-color: #ffffff0d;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px); /* 兼容 Safari */
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
    border-radius: 9999px;
    & li {
      padding: 5px 15px;
      cursor: pointer;
      transition: all 0.1s linear;
      color: white;
      mix-blend-mode: difference;
      font-weight: 800;
      text-transform: uppercase;
      flex-direction: column;
      display: flex;
      align-items: flex-end;
      line-height: 1.1;
      & .span {
        display: flex;
        justify-content: center;
        align-items: center;
        & .iconfont {
          margin: 0 5px;
          font-size: 24px;
          transition: all 0.3s ease-in-out;
        }
      }
      &::after {
        content: "";
        width: 0%;
        height: 2px;
        background-color: #ffc000;
        transition: all 0.3s ease;
      }
      &:hover {
        color: #ffc000;
        align-items: flex-start;
        & .iconfont {
          transform: translateY(-2px) scale(1.1);
        }
      }
      &:hover::after {
        width: 100%;
      }
      &.active {
        color: #ffc000;
      }
      &.active::after {
        width: 100%;
      }
    }
    @media screen and (max-width: 760px) {
      & {
        display: none;
      }
    }
  }
  & .HeaderCom_right {
    display: flex;
    justify-content: center;
    font-size: 20px;
    align-items: center;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    & .headerShopping {
      transition: all 0.3s ease-in-out;
    }
    &:hover .headerShopping {
      transition: all 0.3s ease-in-out;
      transform: scale(1.2);
    }
    &:hover .HeaderCom_right_span {
      color: #ffc000;
    }
  }
  & .headerMenu {
    cursor: pointer;
    display: none;
  }
}

@media screen and (max-width: 760px) {
  .HeaderCom {
    padding: 10px 30px;
    & .headerMenu {
      margin-left: 5px;
      display: flex !important;
    }
  }
}

@media screen and (max-width: 400px) {
  .HeaderCom {
    padding: 10px 20px;
    & .HeaderCom_left {
      font-size: 16px;
    }
    & .HeaderCom_right {
      font-size: 16px;
    }
  }
}
</style>
