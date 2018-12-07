import CommonModelReducer from '@/utils/CommonModelReducer'

export class TemplateState {}

export default {
  namespace: "template",
  state    : {
    ...new TemplateState()
  },
  reducers: {
    ...new class extends CommonModelReducer {}()
  },
  effects: {}
}
