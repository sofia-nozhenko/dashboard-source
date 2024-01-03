// Получаем имя папки проекта
import src from "gulp";
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`; //Можно использовать rootFolder
const srcFolder = `./src`;

export const path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        files: `${buildFolder}/files/`,
        html: `${buildFolder}/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
    },
    src: {
        js: `${srcFolder}/js/app.js`,
        scss: `${srcFolder}/scss/style.scss`,
        files: `${srcFolder}/files/**/*.*`,
        html: `${srcFolder}/*.pug`, //Меняем расширение в зависимости от использования pug/html
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,jfif}`,
        svg: `${srcFolder}/img/**/*.svg`,
        svgicons: `${srcFolder}/svgicons/*.svg`,
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        files: `${srcFolder}/files/**/*.*`,
        html: `${srcFolder}/**/*.pug`, //Меняем расширение в зависимости от использования pug/html
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp,jfif}`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``, //Папка для удаленного фтп сервера
};
