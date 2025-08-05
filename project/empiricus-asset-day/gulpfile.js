// Importações
const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));

// Tarefa para compilar Sass
gulp.task("sass", function () {
  return gulp
    .src("src/scss/*.scss") // Caminho dos arquivos Sass
    .pipe(sass().on("error", sass.logError)) // Compila o Sass e exibe erros
    .pipe(gulp.dest("src/css")) // Destino do CSS compilado
    .pipe(browsersync.stream()); // Atualiza o navegador automaticamente
});

// Tarefa para iniciar o servidor e assistir mudanças
gulp.task("server", function () {
  browsersync.init({
    server: "src", // Define o diretório raiz para o servidor
  });

  gulp.watch("src/scss/*.scss", gulp.series("sass")); // Observa mudanças nos arquivos Sass e recompila
  gulp.watch(["src/*.html", "src/css/*.css"]).on("change", browsersync.reload); // Observa mudanças nos arquivos HTML e CSS e recarrega o navegador
});

// Tarefa padrão
gulp.task("default", gulp.series("sass", "server"));
