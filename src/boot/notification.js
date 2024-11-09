import { boot } from 'quasar/wrappers';
import { Notify } from 'quasar';

export default boot(({ app }) => {
  if (process.env.CLIENT) {
    const showNotification = (
      strMsg,
      strType = 'positive',
      intTimeInSec = 5,
      blnHtmlTrue = true,
      blnShowCloseBtn = false
    ) => {
      Notify.create({
        type: strType,
        html: blnHtmlTrue,
        message: strMsg,
        timeout: intTimeInSec * 1000,
        closeBtn: blnShowCloseBtn,
      });
    };
    const showSuccess = (strMsg) => {
      showNotification(strMsg);
    };
    const showError = (strMsg) => {
      showNotification(strMsg, 'negative');
    };

    app.config.globalProperties.$showNotification = showNotification;
    app.config.globalProperties.$showSuccess = showSuccess;
    app.config.globalProperties.$showError = showError;
  }
});
