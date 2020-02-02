import {
  accountBox,
  home,
  libraryBooks,
  build,
} from "project-pillow-components"

export const FOOTER_MENU = [
  {
    title: "Home",
    page: "home",
    svg: home,
  },
  {
    title: "Wiki",
    page: "wiki",
    svg: libraryBooks,
  },
  {
    title: "Tools",
    page: "tools",
    svg: build,
  },
  {
    title: "Signup",
    page: "signup",
    svg: accountBox,
  },
  {
    title: "Login",
    page: "login",
    svg: accountBox,
  },
  {
    title: "Profile",
    page: "profile",
    svg: accountBox,
  },
]
