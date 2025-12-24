<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// 导入仓库
import { useAccountStore, useCarStore } from "@/Store/index.ts";
import { gsap } from "gsap";

// 路由
const router = useRouter();
// 仓库
const accountStore = useAccountStore();
const carStore = useCarStore();
// 登录注册切换
const IsRoLo = ref(true);
// 邮箱
const LoginEmail = ref("");
// 密码
const LoginPassword = ref("");
const RegisterRePassword = ref("");
// 表单验证状态
const isLogin = ref(false);
// 表单实例
const formRef = ref<HTMLFormElement[]>([]);

// 消息提示
const snackbar = ref(false);
const text = ref("你好");
const timeout = ref(1000);
const colorSnack = ref("green-darken-4");
// 邮箱
const emailRules = [
  (value: string) => {
    if (!value) return "邮箱呢";
    if (
      !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
        value
      )
    ) {
      return "你需要输入正确的邮箱格式";
    }
  },
];
// 密码
const passwordRules = [
  (value: string) => {
    if (!value) return "密码呢";
  },
];
// 重复密码
const RePasswordRules = [
  (value: string) => {
    if (!value) return "密码呢";
    if (value !== LoginPassword.value) {
      return "两次密码输入不一致";
    }
  },
];

// 切换
const bodyAnimationTimeLine = gsap.timeline();
const ChangeOk = ref(true);
const GoRoLo = () => {
  if (!ChangeOk.value) {
    return;
  }
  ChangeOk.value = false;
  bodyAnimationTimeLine
    .to(LoginAnimationRefs.value[IsRoLo.value ? 0 : 1]!, {
      duration: 0.5,
      ease: "power3.inOut",
      filter: "blur(250px)",
      onComplete: () => {
        gsap.set(LoginAnimationRefs.value[!IsRoLo.value ? 0 : 1]!, {
          filter: "blur(250px)",
        });
      },
    })
    .to(LoginAnimationRefs.value[IsRoLo.value ? 1 : 0]!, {
      duration: 0.5,
      ease: "power3.inOut",
      alpha: 1,
      filter: "blur(0px)",
      onStart: () => {
        IsRoLo.value = !IsRoLo.value;
        formRef.value[0].reset();
        formRef.value[1].reset();
        isLogin.value = null;
        gsap.set(LoginAnimationRefs.value[!IsRoLo.value ? 1 : 0]!, {
          filter: "blur(250px)",
        });
      },
      onComplete: () => {
        ChangeOk.value = true;
      },
    });
};
// 登录成功
const isLoginSubmit = async () => {
  if (isLogin.value) {
    if (IsRoLo.value) {
      const res = await accountStore.LoginMethods({
        CountEmail: LoginEmail.value,
        CountPassword: LoginPassword.value,
      });
      if (res.code === 200) {
        snackbar.value = true;
        text.value = res.message;
        colorSnack.value = "green-darken-4";
          console.log(2);
        setTimeout(async() => {
          router.push("/"); 
          await carStore.getCarList(accountStore.Email);
        }, 2500);
      } else {
        snackbar.value = true;
        text.value = res.message;
        colorSnack.value = "red-darken-4";
      }
    } else {
      const res = await accountStore.RegisterMethods({
        CountEmail: LoginEmail.value,
        CountPassword: LoginPassword.value,
      });
      if (res.code === 200) {
        snackbar.value = true;
        text.value = res.message;
        colorSnack.value = "green-darken-4";
        setTimeout(() => {
          GoRoLo();
        }, 1500);
      } else {
        snackbar.value = true;
        text.value = res.message;
        colorSnack.value = "red-darken-4";
      }
    }
  }
};

const LoginAnimationRefs = ref<HTMLElement[]>([]);
const LoginHeaderAnimationRefs = ref<HTMLElement[]>([]);
// 开场动画
const LoginAnimation = async () => {
  gsap.from(LoginAnimationRefs.value[IsRoLo.value ? 0 : 1]!, {
    duration: 1,
    x: 100,
    alpha: 0,
    ease: "power3.inOut",
  });
  gsap.from(LoginHeaderAnimationRefs.value[IsRoLo.value ? 0 : 1]!, {
    alpha: 0,
    duration: 0.6,
    delay: 0.5,
    rotate: -15,
    y: 100,
    ease: "power3.inOut",
  });
};
onMounted(() => {
  LoginAnimation();
});
</script>
<template>
  <div class="Login">
    <v-snackbar
      style="top: 100px"
      location="top"
      :color="colorSnack"
      variant="tonal"
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}
      <template v-slot:actions>
        <v-btn :color="colorSnack" variant="tonal" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- 登录 -->
    <div
      class="body"
      :ref="(el)=>LoginAnimationRefs.push(el as HTMLElement)"
      v-show="IsRoLo"
    >
      <div
        class="header"
        :ref="(el)=>LoginHeaderAnimationRefs.push(el as HTMLElement)"
      >
        <div class="top1">
          <div class="Gr"></div>
          <span>Login</span>
        </div>

        <div class="des" style="overflow: hidden">
          <span class="des_span1">
            <span>如果你有账号</span>
            <span style="user-select: none" class="register" @click="GoRoLo"
              >注册</span
            >
          </span>
          <span
            class="des_span2"
            :ref="(el)=>LoginHeaderAnimationRefs.push(el as HTMLElement)"
            >请登录</span
          >
        </div>
      </div>
      <v-form
        :ref="(el)=>formRef.push(el as HTMLFormElement)"
        @submit="isLoginSubmit()"
        v-model="isLogin"
        @submit.prevent
        class="FormTick"
      >
        <v-text-field
          v-model="LoginEmail"
          :rules="emailRules"
          label="E-mail"
        ></v-text-field>
        <v-text-field
          v-model="LoginPassword"
          :rules="passwordRules"
          type="password"
          label="Password"
        ></v-text-field>
        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
      </v-form>
    </div>
    <!-- 注册 -->
    <div
      class="body"
      :ref="(el)=>LoginAnimationRefs.push(el as HTMLElement)"
      v-show="!IsRoLo"
    >
      <div class="header">
        <div class="top1">
          <div class="Gr"></div>
          <span>Register</span>
        </div>
        <div class="des">
          <span class="des_span1">
            <span>如果你有账号</span>
            <span class="register" @click="GoRoLo">登录</span>
          </span>
          <span
            class="des_span2"
            :ref="(el)=>LoginHeaderAnimationRefs.push(el as HTMLElement)"
            >请注册</span
          >
        </div>
      </div>
      <v-form
        :ref="(el)=>formRef.push(el as HTMLFormElement)"
        @submit="isLoginSubmit()"
        v-model="isLogin"
        @submit.prevent
        class="FormTick"
      >
        <v-text-field
          v-model="LoginEmail"
          :rules="emailRules"
          label="E-mail"
        ></v-text-field>
        <v-text-field
          v-model="LoginPassword"
          :rules="passwordRules"
          type="password"
          label="Password"
        ></v-text-field>
        <v-text-field
          v-model="RegisterRePassword"
          :rules="RePasswordRules"
          type="password"
          label="RePassword"
        ></v-text-field>
        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
      </v-form>
    </div>
  </div>
</template>
<style scoped lang="scss">
.Login {
  margin-top: 130px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  margin-bottom: 50px;

  & .body {
    &::selection {
      color: #000;
      background-color: #ffbf00;
    }
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 30px;
    height: 80vh;
    width: 400px;
    background-color: #1a1915;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    & .header {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      & .top1 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        & .Gr {
          width: 50px;
          margin-right: 10px;
          height: 3px;
          background-color: #ffbf00;
        }
        & span {
          font-size: 28px;
          letter-spacing: 2px;
          color: #ffbf00;
        }
      }
      & .des {
        width: 100%;
        font-weight: 800;
        font-size: 30px;
        justify-content: center;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        & .des_span1 {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #ffffff;
          & .register {
            font-size: 20px;
            cursor: pointer;
            color: #ffbf00;
          }
        }
        & .des_span2 {
          font-family: "微软雅黑";
          -webkit-text-stroke: 1px #ccc;
          color: transparent;
          font-size: 40px;
        }
      }
    }
    & .FormTick {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      & .v-input {
        max-height: 80px;
        width: 100%;
      }
      & .mt-2 {
        font-size: 24px;
        max-height: 50px;
      }
    }
  }
}
</style>
