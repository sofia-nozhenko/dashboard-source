import fileinclude from "gulp-file-include";
import webHtmlNoSvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number"; //решает проблему с кешированием файлов
import pug from "gulp-pug";

export const html = () => {
    return (
        app.gulp
            .src(app.path.src.html)
            .pipe(
                app.plugins.plumber(
                    app.plugins.notify.onError({
                        title: "HTML",
                        message: "Error:<%= error.message %>",
                    })
                )
            )
            // .pipe(fileinclude())
            .pipe(
                pug({
                    // Сжатие HTML файла
                    pretty: true,
                    // Показывать в терминале какой файл обработан
                    verbose: true,
                })
            )
            .pipe(app.plugins.replace(/@img\//g, "img/"))
            .pipe(app.plugins.if(app.isBuild, webHtmlNoSvg()))
            .pipe(
                versionNumber({
                    value: "%DT%",
                    append: {
                        key: "_v",
                        cover: 0,
                        to: ["css", "js"],
                    },
                    output: {
                        file: "gulp/version.json",
                    },
                })
            ) // показывает версию файлов css js, включая дату и время
            .pipe(app.gulp.dest(app.path.build.html))
            .pipe(app.plugins.browserSync.stream())
    );
};
