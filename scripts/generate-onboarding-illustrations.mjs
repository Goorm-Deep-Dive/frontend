import fs from "fs";
import path from "path";
import { transform } from "@svgr/core";
import { fileURLToPath } from "url";

/**
 * Figma 등에서 보낸 SVG를 `public/onboarding/*.svg`에 두고 실행합니다.
 * 생성된 TSX는 `src/app/onboarding/_components/illustrations/`에 기록됩니다.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.resolve(__dirname, "../public/onboarding");
const OUTPUT_DIR = path.resolve(
  __dirname,
  "../src/app/onboarding/_components/illustrations",
);

const toKebabCase = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

const fileNameToComponentName = (file) => {
  const base = file.replace(/\.svg$/i, "");
  if (base === "start") return "OnboardingStartIllustration";
  const stepMatch = /^step(\d+)$/.exec(base);
  if (stepMatch) return `OnboardingStep${stepMatch[1]}Illustration`;
  throw new Error(`Unsupported onboarding SVG name: ${file}`);
};

const createIllustrationCode = async (svg, componentName) =>
  transform(
    svg,
    {
      typescript: true,
      /** 전체 화면 일러스트: viewBox·width/height 유지 (아이콘 프리셋 비사용) */
      icon: false,
      expandProps: "end",
      plugins: ["@svgr/plugin-jsx"],
    },
    { componentName },
  );

const ensureOutputDir = () => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
};

const generate = async () => {
  ensureOutputDir();
  const files = fs.readdirSync(INPUT_DIR).filter((f) => f.endsWith(".svg"));

  for (const file of files) {
    const svg = fs.readFileSync(path.join(INPUT_DIR, file), "utf-8");
    const componentName = fileNameToComponentName(file);
    const code = await createIllustrationCode(svg, componentName);
    const outName = `${toKebabCase(componentName)}.tsx`;
    fs.writeFileSync(path.join(OUTPUT_DIR, outName), code);
    console.log(`✓ ${file} → ${outName}`);
  }

  const exports = files
    .map((file) => {
      const componentName = fileNameToComponentName(file);
      return `export { default as ${componentName} } from "./${toKebabCase(componentName)}";`;
    })
    .join("\n");

  fs.writeFileSync(path.join(OUTPUT_DIR, "index.ts"), `${exports}\n`);
  console.log("✅ onboarding illustrations 생성 완료");
};

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
