const fs = require("fs");
const path = require("path");
const { transform } = require("@svgr/core");

const ICONS_DIR = path.resolve(__dirname, "../src/assets/icons");
const OUTPUT_DIR = path.resolve(__dirname, "../src/components/icons");

const toPascalCase = (fileName) =>
  fileName
    .replace(".svg", "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

async function generate() {
  const files = fs.readdirSync(ICONS_DIR);

  for (const file of files) {
    if (!file.endsWith(".svg")) continue;

    const svg = fs.readFileSync(path.join(ICONS_DIR, file), "utf-8");

    const componentName = toPascalCase(file) + "Icon";

    const componentCode = await transform(
      svg,
      { typescript: true, icon: true },
      { componentName },
    );

    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${componentName}.tsx`),
      componentCode,
    );
  }

  console.log("✅ SVG → 컴포넌트 생성 완료");
}

generate();
