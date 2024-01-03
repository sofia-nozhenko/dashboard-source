// Плагины

import replace from "gulp-replace"; //Search and replace
import plumber from "gulp-plumber"; //Обработка ошибок
import notify from "gulp-notify"; // Сообщения(подсказки)
import browserSync from "browser-sync"; //Local server
import newer from "gulp-newer"; // Проерка обновлений
import ifPlugin from "gulp-if"; //Условное ветвление при выполнении условия выполняем код

// Export object
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browserSync: browserSync,
    newer: newer,
    if: ifPlugin,
};
