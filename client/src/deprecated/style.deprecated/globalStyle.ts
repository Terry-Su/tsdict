export class GlobalStyle {
  bxz_bb = { boxSizing: "border-box" }
  bxz_cb = { boxSizing: "content-box" }
  d_f = { display: "flex" }
  d_ib = { display: "inline-block" }
  jc_c = { justifyContent: "center" }
  jc_fs = { justifyContent: "flex-start" }
  jc_fe = { justifyContent: "flex-end" }
  ai_c = { alignItems: "center" }
  ai_fs = { alignItems: "flex-start" }
  ai_fe = { alignItems: "flex-end" }

  flex_1 = { flex: 1 }
  w_100__h_100 = {
    width : "100%",
    height: "100%"
  }

  // combinations
  d_f__ai_c = {
    ...this.d_f,
    ...this.ai_c
  }
  d_f__jc_c__ai_c = {
    ...this.d_f,
    ...this.jc_c,
    ...this.ai_c
  }
}
export {
  GlobalStyle as GS
}
export default new GlobalStyle()
