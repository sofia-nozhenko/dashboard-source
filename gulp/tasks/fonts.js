import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
    // Searc fonts with extension .otf
    return (
        app.gulp
            .src(`${app.path.srcFolder}/fonts/*otf`, {})
            .pipe(
                app.plugins.plumber(
                    app.plugins.notify.onError({
                        title: "FONTS",
                        message: "Error: <%= error.message $>",
                    })
                )
            )
            // Convert to .ttf
            .pipe(
                fonter({
                    formats: ["ttf"],
                })
            )
            // Upload to folder
            .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
    );
};

export const ttfToWoff = () => {
    // search fonts with ext .ttf
    return (
        app.gulp
            .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
            .pipe(
                app.plugins.plumber(
                    app.plugins.notify.onError({
                        title: "FONTS",
                        message: "Error: <%= error.message $>",
                    })
                )
            )
            // Convert to .woff
            .pipe(
                fonter({
                    formats: ["woff"],
                })
            )
            // Upload to folder
            .pipe(app.gulp.dest(`${app.path.build.fonts}`))
            // search fonts with ext .ttf
            .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
            // convert to woff2
            .pipe(ttf2woff2())
            // upload to folder with results
            .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    );
};

export const fontsStyle = () => {
    //Файл стилей подключения шрифтов
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

    //Проверяем существуют ли файлы шрифтов
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        console.log(fontsFile);
        if (fontsFiles) {
            //проверяем существует ли файл стилецй для подключения шрифтов
            if (!fs.existsSync(fontsFile)) {
                //если его нет создаем его
                fs.writeFile(fontsFile, "", cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    //записываем подключения шрифтов в файл стилей
                    let fontFileName = fontsFiles[i].split(".")[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split("-")[0]
                            ? fontFileName.split("-")[0]
                            : fontFileName;
                        let fontWeight = fontFileName.split("-")[1]
                            ? fontFileName.split("-")[1]
                            : fontFileName;
                        if (fontWeight.toLowerCase() === "thin") {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === "extralight") {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === "light") {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === "medium") {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === "semibold") {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === "bold") {
                            fontWeight = 700;
                        } else if (
                            fontWeight.toLowerCase() === "extrabold" ||
                            fontWeight.toLowerCase() === "heavy"
                        ) {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === "black") {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        //? не поняла продолжение строчки
                        fs.appendFile(
                            fontsFile,
                            `@font-face{\n\tfont-family:${fontName};\n\tfont-display:swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format ("woff2");\n\tfont-weight:${fontWeight};\n\tfont-style:normal;\n}\r\n`,
                            cb
                        );
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                // если файл есть выводим сообщение
                console.log(
                    "Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!"
                );
            }
        }
    });
    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() {}
};
