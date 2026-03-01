import fs from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";

const DEFAULT_TARGET_URL = "https://github.com/AlexAgo83/scan-2-pass";
const DEFAULT_OUTPUT_PATH = "public/qr/scan-2-pass-temp.png";

function readArg(flagName) {
  const flagIndex = process.argv.indexOf(flagName);
  if (flagIndex === -1 || flagIndex + 1 >= process.argv.length) {
    return "";
  }
  return process.argv[flagIndex + 1];
}

function normalizeUrl(value) {
  if (!value) {
    return "";
  }

  try {
    const parsedUrl = new URL(value);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return "";
    }
    return parsedUrl.toString();
  } catch {
    return "";
  }
}

async function main() {
  const fromCli = readArg("--url");
  const fromEnv = process.env.QR_TARGET_URL || process.env.VITE_PROJECT_URL;
  const targetUrl =
    normalizeUrl(fromCli) || normalizeUrl(fromEnv) || DEFAULT_TARGET_URL;
  const outputPath =
    readArg("--output") ||
    process.env.QR_OUTPUT ||
    process.env.QR_OUTPUT_PATH ||
    DEFAULT_OUTPUT_PATH;

  const absoluteOutputPath = path.resolve(process.cwd(), outputPath);
  await fs.mkdir(path.dirname(absoluteOutputPath), { recursive: true });

  await QRCode.toFile(absoluteOutputPath, targetUrl, {
    type: "png",
    width: 1200,
    margin: 2,
    color: {
      dark: "#111827",
      light: "#FFFFFF",
    },
  });

  console.log(`QR generated at ${absoluteOutputPath}`);
  console.log(`Target URL: ${targetUrl}`);
}

main().catch((error) => {
  console.error("QR generation failed.");
  console.error(error);
  process.exit(1);
});

