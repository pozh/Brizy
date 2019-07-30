process.on("unhandledRejection", error => {
  console.log("unhandledRejection", error.message, error);
});

const fs = require("fs");
const path = require("path");
const util = require("util");
const readline = require("readline");
const exec = util.promisify(require("child_process").exec);

const chalk = require("chalk");
const del = require("del");

// gulp
const gulp = require("gulp");
const gulpPlugins = require("gulp-load-plugins")();
const runSequence = require("run-sequence");
const cleanCSS = require("gulp-clean-css");

// webpack
const webpack = require("webpack");
const webpackConfigEditor = require("./webpack.config.editor");
const webpackConfigExport = require("./webpack.config.export");
const webpackConfigPreview = require("./webpack.config.preview");
const webpackConfigPro = require("./webpack.config.pro");

// postcss
const sass = require("@csstools/postcss-sass");
const postcssSCSS = require("postcss-scss");
const autoprefixer = require("autoprefixer");

// build utils
const argvVars = require("./build-utils/argvVars");
const {
  wpTranslations,
  wpTranslationsDev
} = require("./build-utils/wpTranslations");

const { Readable, Transform } = require("stream");
const Vinyl = require("vinyl");

// flags
const {
  KIT_NAME,
  TARGET,
  IS_PRODUCTION,
  IS_EXPORT,
  IS_PRO,
  VERSION,
  VERSION_PRO,
  NO_WATCH,
  paths
} = argvVars(process.argv);
let ABORTED = false;

const postsCssProcessors = [
  sass({
    includePaths: ["node_modules"],
    errLogToConsole: true
  }),
  autoprefixer({
    browsers: ["last 2 versions"]
  })
];

gulp.task(
  "build",
  [...(IS_PRODUCTION && IS_EXPORT ? ["verifications"] : [])],
  () => {
    if (ABORTED) {
      return;
    }

    const tasks = [
      "clean",
      "editor",
      "kits",
      "templates",
      "build.defaults",
      "build.googleFonts",
      "build.integrations",
      ...(IS_EXPORT ? ["export"] : []),
      ...(IS_PRO ? ["pro"] : []),
      ...(TARGET === "WP" ? ["wp.translations"] : []),
      ...(IS_PRODUCTION && IS_EXPORT
        ? [
            ...(TARGET === "WP" ? ["wp.open-source"] : []),
            "build.versions",
            "build.stats",
            "build.zip"
          ]
        : []),
      ...(IS_PRODUCTION || NO_WATCH ? [] : ["watch"])
    ];

    runSequence(...tasks);
  }
);
gulp.task("verifications", async () => {
  // version check
  if (!VERSION) {
    console.error(
      chalk.red.bold("When building for production --version must be provided")
    );
    ABORTED = true;
    return;
  }

  if (IS_PRO && !VERSION_PRO) {
    console.error(
      chalk.red.bold(
        "When building for production with -p --version-pro must be provided"
      )
    );
    ABORTED = true;
    return;
  }

  // commit / tag check
  const currentBranchCmd = "git rev-parse --abbrev-ref HEAD";
  const { stdout: currentBranchName } = await exec(currentBranchCmd);
  if (
    currentBranchName.trim() !== "master" &&
    (await shouldContinue(
      "You are not on master and compiling for production"
    )) !== true
  ) {
    ABORTED = true;
    return;
  }

  const latestCommitCmd = `git log -n 1 --pretty=format:"%H"`;
  const latestTagCommitCmd = "git rev-list --tags --max-count=1";
  const [
    { stdout: latestCommit },
    { stdout: latestTagCommit }
  ] = await Promise.all([exec(latestCommitCmd), exec(latestTagCommitCmd)]);
  if (
    latestCommit.trim() !== latestTagCommit.trim() &&
    (await shouldContinue(
      "It seems that you have not tagged your latest commit"
    )) !== true
  ) {
    ABORTED = true;
    return;
  }

  function shouldContinue(message) {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question(chalk.red.bold(`${message}. Continue ? y/n: `), answer => {
        rl.close();
        resolve(answer === "y");
      });
    });
  }
});

gulp.task("clean", [
  "clean.local",
  "clean.free",
  ...(IS_PRO ? ["clean.pro"] : [])
]);
gulp.task("clean.local", () => {
  del.sync(paths.buildLocal + "/*", { force: true });
});
gulp.task("clean.free", () => {
  del.sync(paths.build + "/*", { force: true });
});
gulp.task("clean.pro", () => {
  del.sync(paths.buildPro + "/*", { force: true });
});

gulp.task("editor", [
  "editor.js.compile",
  "editor.css",
  "editor.fonts",
  "editor.icons",
  "editor.kit.icons",
  "editor.img",
  "editor.polyfill",
  "editor.twig"
]);
gulp.task("editor.js.compile", done => {
  const options = {
    TARGET,
    IS_PRODUCTION,
    IS_EXPORT,
    BUILD_PATH: paths.build,
    BUILD_DIR_PRO: paths.buildPro,
    NO_WATCH
  };
  const config = webpackConfigEditor(options);

  let doneCalled = false;
  webpack(config, (err, stats) => {
    if (stats.hasErrors()) {
      gulpPlugins.util.log("[webpack] error", stats.toString("errors-only"));
    } else {
      gulpPlugins.util.log("[webpack] success");
    }

    if (!doneCalled) {
      doneCalled = true;
      done();
    }
  });
});
gulp.task("editor.css", () => {
  const src = [
    paths.editor + "/lib/common/*/*.css",
    paths.editor + "/lib/editor/*/*.css",
    paths.editor + "/sass/main.editor.scss"
  ];
  const dest = paths.build + "/editor/css";

  gulp
    .src(src, { base: paths.editor })
    .pipe(gulpPlugins.if(!IS_PRODUCTION, gulpPlugins.sourcemaps.init()))
    .pipe(
      gulpPlugins
        .postcss(postsCssProcessors, {
          syntax: postcssSCSS
        })
        .on("error", err => {
          console.log("Sass Syntax Error", err);
        })
    )
    .pipe(
      cleanCSS({
        format: {
          breaks: {
            afterRuleEnds: true
          }
        }
      })
    )
    .pipe(gulpPlugins.concat("editor.css"))
    .pipe(gulpPlugins.if(!IS_PRODUCTION, gulpPlugins.sourcemaps.write()))
    .pipe(gulp.dest(dest));
});
gulp.task("editor.fonts", () => {
  const src = paths.editor + "/sass/editor/fonts/*";
  const dest = paths.build + "/editor/fonts";

  gulp.src(src).pipe(gulp.dest(dest));
});
gulp.task("editor.icons", () => {
  const src = paths.editor + "/sass/editor/icons/**/*.{eot,svg,ttf,woff,woff2}";
  const dest = paths.build + "/editor/icons";

  gulp.src(src).pipe(gulp.dest(dest));
});
gulp.task("editor.kit.icons", done => {
  const src = paths.editor + "/icons/**/*";
  const dest = paths.build + "/editor/icons";
  const { encrypt } = require(paths.editor +
    "/js/component/ThemeIcon/utils.js");

  const svgEncrypt = content => {
    const base64 = Buffer.from(content).toString("base64");

    return encrypt(base64);
  };

  gulp
    .src(src)
    .pipe(gulpPlugins.change(svgEncrypt))
    .pipe(gulp.dest(dest))
    .on("end", done);
});
gulp.task("editor.img", () => {
  const src = paths.editor + "/img/*";
  const dest = paths.build + "/editor/img";

  gulp.src(src).pipe(gulp.dest(dest));
});
gulp.task("editor.polyfill", () => {
  const src = paths.editor + "/polyfill/**/*.js";
  const dest = paths.build + "/editor/js";

  gulp
    .src(src)
    .pipe(gulpPlugins.if(IS_PRODUCTION, gulpPlugins.terser()))
    .pipe(gulpPlugins.concat("polyfill.js"))
    .pipe(gulp.dest(dest));
});
gulp.task("editor.twig", done => {
  const src = paths.editor + "/templates/editor.html.twig";
  const dest = paths.build + "/editor/views";

  gulp
    .src(src)
    // provide a way for template developers to inject
    // something in the header or footer of the template
    // minify the template file
    .pipe(
      gulpPlugins.if(
        IS_PRODUCTION,
        gulpPlugins.htmlmin({
          collapseWhitespace: true,
          minifyJS: true
        })
      )
    )
    .pipe(gulp.dest(dest))
    .on("end", () => {
      done();
    });
});

gulp.task("kits", [
  "kits.data",
  "kits.thumbs",
  "kits.styles",
  ...(IS_PRODUCTION && IS_EXPORT ? ["kits.media"] : [])
]);
gulp.task("kits.data", () => {
  const src = paths.kits + "/index.js";
  const dest = paths.build + "/kits";
  const kits = require(src);

  let rs = new Readable({
    objectMode: true
  });

  // meta
  rs.push(
    new Vinyl({
      path: "meta.json",
      contents: Buffer.from(
        JSON.stringify(kits, (k, v) => {
          return k === "resolve" ? undefined : v;
        })
      )
    })
  );

  // resolves
  for (let kit of kits.kits) {
    for (let block of kit.blocks) {
      const { id, resolve } = block;

      rs.push(
        new Vinyl({
          path: `resolves/${id}.json`,
          contents: Buffer.from(JSON.stringify(resolve))
        })
      );
    }
  }

  // null signifies stream end
  rs.push(null);

  rs.pipe(gulp.dest(dest));
});
gulp.task("kits.thumbs", done => {
  const src = paths.kits + "/*/blocks/*/Preview.jpg";
  const dest = paths.build + "/kits/thumbs";

  gulp
    .src(src)
    .pipe(
      gulpPlugins.rename(path_ => {
        const r = new RegExp(`.+\\${path.sep}blocks\\${path.sep}`);

        path_.basename = path_.dirname.replace(r, "");
        path_.dirname = "";
      })
    )
    .pipe(gulp.dest(dest))
    .on("end", () => {
      done();
    });
});
gulp.task("kits.styles", () => {
  const src = paths.kits + "/*/styles/index.js";
  const dest = paths.build + "/styles";

  var t = new Transform({
    objectMode: true,
    transform(file, encoding, callback) {
      this.acc = this.acc || [];
      this.acc.push(file);
      callback();
    },
    flush(cb) {
      let a = [];

      for (let file of this.acc) {
        const x = require(file.path);

        a = [...a, ...x];
      }

      const r = new Vinyl({
        path: "styles.json",
        contents: Buffer.from(JSON.stringify(a, null, 2))
      });

      this.push(r);
      cb();
    }
  });

  // null signifies stream end

  gulp
    .src(src)
    .pipe(t)
    .pipe(gulp.dest(dest));
});
gulp.task("kits.media", () => {
  const src = paths.kits + "/*/img/*";
  const dest = paths.build + "/media";

  return gulp
    .src(src)
    .pipe(
      gulpPlugins.rename(path_ => {
        // {KIT_NAME}/img/{IMG} -> {IMG}
        path_.dirname = "";
      })
    )
    .pipe(gulp.dest(dest));
});

gulp.task("export", ["export.css", "export.js", "export.twig"]);
gulp.task("export.css", done => {
  const src = [
    paths.editor + "/lib/common/*/*.css",
    paths.editor + "/lib/export/*/*.css",
    paths.editor + "/sass/main.export.scss"
  ];
  const dest = paths.build + "/editor/css";

  gulp
    .src(src, { base: paths.editor })
    .pipe(
      gulpPlugins
        .postcss(postsCssProcessors, {
          syntax: postcssSCSS,
          failOnError: false
        })
        .on("error", err => {
          console.log("Sass Syntax Error", err);
        })
    )
    .pipe(gulpPlugins.concat("preview.css"))
    .pipe(gulp.dest(dest))
    .on("end", () => {
      done();
    });
});

gulp.task("templates", ["templates.data", "templates.thumbs"]);
gulp.task("templates.data", () => {
  const src = paths.templates + "/index.js";
  const dest = paths.build + "/templates";
  const templates = require(src);

  let rs = new Readable({
    objectMode: true
  });

  // meta
  rs.push(
    new Vinyl({
      path: "meta.json",
      contents: Buffer.from(
        JSON.stringify(templates, (k, v) => {
          return k === "resolve" ? undefined : v;
        })
      )
    })
  );

  // resolves
  for (let template of templates.templates) {
    for (let page of template.pages) {
      const { id, resolve } = page;

      rs.push(
        new Vinyl({
          path: `resolves/${id}.json`,
          contents: Buffer.from(JSON.stringify(resolve))
        })
      );
    }
  }

  // null signifies stream end
  rs.push(null);

  rs.pipe(gulp.dest(dest));
});
gulp.task("templates.thumbs", done => {
  const src = paths.templates + "/*/**/Preview.jpg";
  const dest = paths.build + "/templates/thumbs";

  gulp
    .src(src)
    .pipe(
      gulpPlugins.rename(path_ => {
        path_.basename = path_.dirname.replace(
          `${path.sep}pages${path.sep}`,
          ""
        );
        path_.dirname = "";
      })
    )
    .pipe(gulp.dest(dest))
    .on("end", () => {
      done();
    });
});

gulp.task("export.js", done => {
  const options = {
    TARGET,
    IS_PRODUCTION,
    IS_EXPORT,
    BUILD_PATH: paths.build,
    BUILD_DIR_PRO: paths.buildPro,
    NO_WATCH
  };
  const config = [webpackConfigPreview(options), webpackConfigExport(options)];

  let doneCalled = false;
  webpack(config, (err, stats) => {
    if (stats.hasErrors()) {
      gulpPlugins.util.log("[webpack] error", stats.toString("errors-only"));
    } else {
      gulpPlugins.util.log("[webpack] success");
    }

    if (!doneCalled) {
      doneCalled = true;
      done();
    }
  });
});
gulp.task("export.twig", done => {
  const src =
    TARGET === "WP"
      ? paths.editor + "/templates/static.wp.html.twig"
      : paths.editor + "/templates/static.html.twig";
  const dest = paths.build + "/editor/views";

  gulp
    .src(src)
    // minify the template file
    .pipe(
      gulpPlugins.if(
        IS_PRODUCTION,
        gulpPlugins.htmlmin({
          collapseWhitespace: true,
          minifyJS: true
        })
      )
    )
    .pipe(gulpPlugins.rename("static.html.twig"))
    .pipe(gulp.dest(dest))
    .on("end", () => {
      done();
    });
});

gulp.task("pro", ["pro.js"]);
gulp.task("pro.js", done => {
  const options = {
    TARGET,
    IS_PRODUCTION,
    IS_EXPORT,
    BUILD_PATH: paths.build,
    BUILD_PATH_PRO: paths.buildPro,
    NO_WATCH
  };
  const config = webpackConfigPro(options);

  let doneCalled = false;
  webpack(config, (err, stats) => {
    if (stats.hasErrors()) {
      gulpPlugins.util.log(
        "[webpack pro] error",
        stats.toString("errors-only")
      );
    } else {
      gulpPlugins.util.log("[webpack pro] success");
    }
    if (!doneCalled) {
      doneCalled = true;
      done();
    }
  });
});

gulp.task("wp.translations", async () => {
  const sourceCodePath = paths.editor + "/js";
  const phpSourceCode =
    IS_PRODUCTION && IS_EXPORT
      ? await wpTranslations(sourceCodePath)
      : await wpTranslationsDev();

  fs.writeFileSync(paths.build + "/texts.php", phpSourceCode, "utf8");
});
gulp.task("wp.open-source", done => {
  const src = [
    "./**/*",
    "!node_modules/",
    "!node_modules/**",
    "!backend/",
    "!backend/**/*",
    "!build/",
    "!build/**/*",
    "!templates/*/assets/{icons,img}/",
    "!templates/*/assets/{icons,img}/**",
    "!**/pro/",
    "!**/pro/**/*",
    "!**/*.pro.*"
  ];
  const dest = paths.buildLocal + "/editor-src";

  gulp
    .src(src, { dot: true })
    .pipe(
      gulpPlugins.rename(path => {
        if (path.basename === "README.GITHUB") {
          path.basename = "README";
        }
      })
    )
    .pipe(gulp.dest(dest))
    .on("end", done);
});

gulp.task("build.googleFonts", () => {
  const src = paths.editor + "/js/config/googleFonts.json";
  const dest = paths.build;

  return gulp.src(src).pipe(gulp.dest(dest));
});
gulp.task("build.integrations", () => {
  const src = paths.editor + "/js/config/integrations.json";
  const dest = paths.build;

  return gulp.src(src).pipe(gulp.dest(dest));
});
gulp.task("build.defaults", () => {
  const src = "./backend/config/defaults.json";
  const dest = paths.build;

  return gulp.src(src).pipe(gulp.dest(dest));
});
gulp.task("build.versions", () => {
  const versionsJSON = JSON.stringify(
    {
      slug: KIT_NAME,
      version: VERSION
    },
    null,
    2
  );
  fs.writeFileSync(paths.build + "/versions.json", versionsJSON, "utf8");

  if (IS_PRO) {
    const versionsJSON = JSON.stringify(
      {
        version: VERSION_PRO
      },
      null,
      2
    );
    fs.writeFileSync(paths.buildPro + "/versions.json", versionsJSON, "utf8");
  }
});
gulp.task("build.stats", () => {
  const files = [
    // editor
    ["editor.js", paths.build + "/editor/js/editor.js"],
    ["editor.vendor.js", paths.build + "/editor/js/editor.vendor.js"],
    ["editor.css", paths.build + "/editor/css/editor.css"],

    // export
    ["preview.js", paths.build + "/editor/js/preview.js"],
    ["preview.css", paths.build + "/editor/css/preview.css"],

    // polyfill
    ["polyfill.js", paths.build + "/editor/js/polyfill.js"],

    // static
    ["export.js", paths.build + "/editor/js/export.js"]
  ];
  fs.writeFileSync(
    paths.build + "/stats.json",
    getFileSizesJSON(files),
    "utf8"
  );

  if (IS_PRO) {
    const files = [
      // editor
      ["editor.pro.js", paths.buildPro + "/js/editor.pro.js"]
    ];
    fs.writeFileSync(
      paths.buildPro + "/stats.json",
      getFileSizesJSON(files),
      "utf8"
    );
  }

  function getFileSizesJSON(files) {
    const fileSizes = files.reduce((acc, [name, path]) => {
      const stats = fs.statSync(path);
      acc[name] = stats["size"] / 1000000.0;
      return acc;
    }, {});

    return JSON.stringify(fileSizes, null, 2);
  }
});

gulp.task("build.zip", done => {
  const suffix = TARGET === "WP" ? "wp" : "cloud";

  const src = [
    paths.build + "/**/*",
    `!${paths.build}/pro/`,
    `!${paths.build}/pro/**/*`
  ];
  makeZip(src, `editor-build__${VERSION}__${suffix}.zip`);

  if (IS_PRO) {
    const src = [paths.buildPro + "/**/*"];
    makeZip(src, `editor-build-pro__${VERSION_PRO}__${suffix}.zip`);
  }

  function makeZip(src, zipName) {
    const dest = paths.buildLocal + "/zip";

    if (!makeZip.doneTimesToCall) {
      makeZip.doneTimesToCall = IS_PRO ? 2 : 1;
    }

    gulp
      .src(src)
      .pipe(gulpPlugins.zip(zipName))
      .pipe(gulp.dest(dest))
      .on("end", () => {
        makeZip.doneTimesToCall--;

        if (makeZip.doneTimesToCall === 0) {
          done();
        }
      });
  }
});

gulp.task("watch", () => {
  // editor css
  const coreCSSPath = paths.editor + "/**/*.scss";
  gulp
    .watch(coreCSSPath, ["editor.css", ...(IS_EXPORT ? ["export.css"] : [])])
    .on("change", handleChange);

  function handleChange(event) {
    console.log(event.type, event.path);
  }
});
