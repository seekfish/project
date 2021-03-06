var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	sass = require("gulp-sass"),
	connect = require("gulp-connect"),
	htmlmin = require("gulp-htmlmin"),
	babel = require("gulp-babel");

//启动服务器
gulp.task("server",function(){
	connect.server({
		root:"dist",
		livereload:true
	});
});
//压缩js和兼容
gulp.task("js",function(){
	gulp.src("js/**/*.js")
		.pipe(babel({
            presets: ['env']
        }))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
});
//编译sass和压缩
gulp.task("sass",function(){
	gulp.src("sass/**/*.scss")
		.pipe(sass({outputStyle:"compressed"}))
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
})
//压缩html
gulp.task("html",function(){
	gulp.src(["**/*.html","!node_modules/**/*.html"])
		.pipe(htmlmin({collapseWhitespace: true, minifyCSS:true, minifyJS:true}))
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
})
// 将图片、库、模拟的假数据复制到 dist 下
gulp.task("images", function(){
	gulp.src("images/**/*.*")
		.pipe(gulp.dest("dist/images"));
});
gulp.task("lib", function(){
	gulp.src("lib/**/*.*")
		.pipe(gulp.dest("dist/lib"));
});
gulp.task("mock", function(){
	gulp.src("mock/**/*.*")
		.pipe(gulp.dest("dist/mock"));
});
gulp.task("copyfile", ["images", "lib", "mock"]);

//添加监视
gulp.task("watch",function(){
	gulp.watch("sass/**/*.scss",["sass"]);
	gulp.watch("js/**/*.js", ["js"]);
	// gulp.watch(["**/*.html","!node_modules/**/*.html"], ["html"]);
})
//默认启动
gulp.task("default", ["html", "js", "sass", "copyfile", "server", "watch"]);