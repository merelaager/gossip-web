import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("privaatsuspoliitika", "routes/privacypolicy.tsx"),
  route("kontakt", "routes/contact.tsx"),
  route("login", "routes/login.tsx"),
  route("account", "routes/account.tsx"),
  layout("routes/posts.tsx", [
    ...prefix("posts", [
      index("routes/posts._index.tsx"),
      route(":postId", "routes/posts.$postId.tsx"),
      route("new", "routes/posts.new.tsx"),
      route("my", "routes/posts.my.tsx"),
      route("liked", "routes/posts.liked.tsx"),
      route("waitlist", "routes/posts.waitlist.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
