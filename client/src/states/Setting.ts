export default class Setting {
    visibleDialogSetting: boolean = false

    origin: string = location.origin
    originHistory: string[] = []

    // # visibleDialogSetting
    SHOW_DIALOG_SETTING = () => { this.visibleDialogSetting = true }
    HIDE_DIALOG_SETTING = () => { this.visibleDialogSetting = false }
    // # origin
    SET_ORIGIN = (newOrigin: string) => { this.origin = newOrigin }
}
