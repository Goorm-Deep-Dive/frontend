import fs from "fs";
import path from "path";
import { transform } from "@svgr/core";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.resolve(__dirname, "../public/icons");
const OUTPUT_DIR = path.resolve(__dirname, "../src/components/icons");

// SVG 파일명을 React 컴포넌트명(PascalCase)으로 변환
const toPascalCase = (fileName) =>
  fileName
    .replace(".svg", "")
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

// 컴포넌트명을 파일 규칙(kebab-case)으로 변환
const toKebabCase = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

// 아이콘 컴포넌트 코드를 프로젝트 포맷에 맞춰 생성
const createIconComponentCode = async (svg, componentName) => {
  return transform(
    svg,
    {
      typescript: true,
      icon: true,
      expandProps: "end",
      plugins: ["@svgr/plugin-jsx"],
    },
    { componentName },
  );
};

// 출력 디렉터리가 없으면 생성
const ensureOutputDir = () => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
};

// SVG를 components/icons의 TSX 컴포넌트로 생성
const generate = async () => {
  ensureOutputDir();
  const files = fs.readdirSync(ICONS_DIR);

  for (const file of files) {
    if (!file.endsWith(".svg")) continue;

    const svg = fs.readFileSync(path.join(ICONS_DIR, file), "utf-8");
    const componentName = toPascalCase(file) + "Icon";
    const componentCode = await createIconComponentCode(svg, componentName);
    const fileName = `${toKebabCase(componentName)}.tsx`;

    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), componentCode);
  }

  console.log("✅ SVG → 컴포넌트 생성 완료");
};

generate();
