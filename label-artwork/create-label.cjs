const fs = require("fs");
const path = require("path");
const opentype = require("opentype.js");
const PDFDocument = require("pdfkit");
const SVGtoPDF = require("svg-to-pdfkit");
const sharp = require("sharp");
const out = path.join(__dirname, "deliverables");
fs.mkdirSync(out, { recursive: true });
const bold = opentype.parse(
  fs.readFileSync("C:/Windows/Fonts/arialbd.ttf").buffer,
);
const black = opentype.parse(
  fs.readFileSync("C:/Windows/Fonts/ariblk.ttf").buffer,
);
const colours = {
  navy: "#05265D",
  pink: "#F65BAA",
  cyan: "#00C5D2",
  red: "#FF1028",
  white: "#FFFFFF",
};
function lettering(value, x, y, width, height, font, editable = false) {
  const p = font.getPath(value, 0, 0, 100);
  const b = p.getBoundingBox();
  if (editable)
    return `<text x="${x}" y="${y + height}" textLength="${width}" lengthAdjust="spacingAndGlyphs" font-family="${font === black ? "Arial Black" : "Arial"}" font-weight="${font === black ? "900" : "700"}" font-size="${height / 0.72}">${value}</text>`;
  return `<path aria-label="${value}" transform="translate(${x} ${y}) scale(${width / (b.x2 - b.x1)} ${height / (b.y2 - b.y1)}) translate(${-b.x1} ${-b.y1})" d="${p.toPathData(3)}"/>`;
}
const heart = (x, y, s) =>
  `<path transform="translate(${x} ${y}) scale(${s})" fill="${colours.red}" d="M0 28 C-7 20 -28 7 -28 -8 C-28 -29 -7 -34 0 -18 C7 -34 28 -29 28 -8 C28 7 7 20 0 28Z"/>`;
function svg(editable = false) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="210mm" height="140mm" viewBox="0 0 2100 1400" role="img" aria-labelledby="title description">
<title id="title">VYTR — Big Ben concept label reconstruction</title><desc id="description">Provisional 210 by 140 millimetre wrap label. Reconstructed front and interpretive side artwork. RGB design proof, not production approved. No verified back-panel copy.</desc>
<defs><clipPath id="trim"><rect width="2100" height="1400"/></clipPath></defs>
<g clip-path="url(#trim)">
<g id="background" inkscape:groupmode="layer" inkscape:label="01 Navy base"><rect width="2100" height="1400" fill="${colours.navy}"/></g>
<g id="upper-ribbons" inkscape:groupmode="layer" inkscape:label="02 Red pink and turquoise ribbons">
<path fill="${colours.red}" d="M0 0H2100V310 C1790 110 1570 45 1270 65 C950 -5 660 35 405 170 C235 255 100 280 0 260Z"/>
<path fill="${colours.pink}" d="M0 260 C220 325 445 110 720 85 C1090 -15 1510 40 1805 205 C1930 270 2040 315 2100 310 V440 C1840 400 1620 220 1390 210 C1040 100 780 190 555 310 C310 450 130 460 0 395Z"/>
<path fill="${colours.cyan}" d="M0 395 C265 480 445 320 680 240 C965 110 1255 190 1460 245 C1720 310 1875 440 2100 440 V570 C1875 570 1710 455 1450 400 C1130 300 940 280 690 385 C385 515 235 605 0 525Z"/>
</g>
<g id="pink-organic-shapes" inkscape:groupmode="layer" inkscape:label="03 Pink flowing shapes" fill="${colours.pink}">
<path d="M1130 1400 C1120 1280 1040 1250 1020 1160 C994 1065 1170 1060 1190 980 C1210 900 1035 890 930 900 C820 914 805 855 860 827 C918 793 1110 820 1150 760 C1182 710 1050 700 982 670 C875 620 895 559 956 566 C1020 574 1125 659 1192 640 C1253 624 1150 493 1184 440 C1224 377 1295 430 1330 510 C1380 620 1380 800 1345 930 C1312 1080 1360 1200 1490 1400Z"/>
<path d="M0 860 C65 810 160 838 175 920 C185 1015 90 1040 160 1130 C245 1240 380 1080 450 1170 C530 1265 405 1365 420 1400H0Z"/>
<path d="M2100 790 C1970 730 1870 815 1925 925 C1975 1015 1800 1045 1750 1140 C1710 1230 1755 1310 1680 1400H2100Z"/>
<path d="M520 1400 C530 1310 650 1265 688 1315 C720 1360 685 1385 690 1400Z"/>
</g>
<g id="navy-linework" inkscape:groupmode="layer" inkscape:label="04 Navy loop linework" fill="none" stroke="${colours.navy}" stroke-width="6" stroke-linecap="round">
<path d="M1058 690 C1150 670 1310 810 1327 850 C1355 918 1188 798 1140 746 C1075 677 1168 721 1263 855 C1350 982 1320 1045 1260 1015 C1150 963 1038 859 1050 856 C1077 828 1245 959 1240 1004 C1237 1030 1160 1008 1094 970"/>
<path d="M1840 1070 C1745 1020 1680 1200 1760 1210 C1830 1215 1930 1085 1875 1100 C1830 1110 1810 1240 1880 1280"/>
</g>
<g id="front-brand-strip" inkscape:groupmode="layer" inkscape:label="05 White front brand strip"><rect x="972" y="0" width="156" height="1065" fill="white"/>
<g transform="translate(972 1065) rotate(-90)" fill="#000000">
${lettering("VYTR", 20, 20, 408, 116, black, editable)}
${heart(475, 78, 0.86)}
${lettering("BRITISH NATURAL", 575, 30, 420, 25, bold, editable)}
${lettering("SPRING WATER", 575, 65, 420, 25, bold, editable)}
${lettering("LONDON", 704, 103, 165, 18, bold, editable)}
</g></g>
<g id="lower-heart" inkscape:groupmode="layer" inkscape:label="06 Lower red heart">${heart(885, 1240, 1.2)}</g>
</g></svg>`;
}
async function main() {
  const artwork = svg(false);
  fs.writeFileSync(path.join(out, "VYTR-label-master-outlined.svg"), artwork);
  fs.writeFileSync(
    path.join(out, "VYTR-label-master-editable-text.svg"),
    svg(true),
  );
  await sharp(Buffer.from(artwork))
    .resize(2480, 1654)
    .withMetadata({ density: 300 })
    .png()
    .toFile(path.join(out, "VYTR-label-preview-300ppi.png"));
  const front = artwork.replace(
    'width="210mm" height="140mm" viewBox="0 0 2100 1400"',
    'width="70mm" height="140mm" viewBox="700 0 700 1400"',
  );
  await sharp(Buffer.from(front))
    .resize(827, 1654)
    .withMetadata({ density: 300 })
    .png()
    .toFile(path.join(out, "VYTR-front-detail-preview.png"));
  const mm = 72 / 25.4;
  await new Promise((resolve) => {
    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margin: 0,
      info: {
        Title: "VYTR label — provisional artwork proof",
        Subject:
          "RGB vector proof. Provisional dimensions only. Not approved for production.",
      },
    });
    const stream = fs.createWriteStream(
      path.join(out, "VYTR-label-approval-proof.pdf"),
    );
    doc.pipe(stream);
    doc
      .fillColor(colours.navy)
      .font("Helvetica-Bold")
      .fontSize(18)
      .text("VYTR / LABEL ARTWORK PROOF", 20 * mm, 13 * mm);
    doc
      .font("Helvetica")
      .fontSize(9)
      .text(
        "BIG BEN CONCEPT RECONSTRUCTION  •  NOT APPROVED FOR PRODUCTION",
        20 * mm,
        23 * mm,
      );
    SVGtoPDF(doc, artwork, 43.5 * mm, 35 * mm, {
      width: 210 * mm,
      height: 140 * mm,
      assumePt: true,
    });
    doc
      .save()
      .lineWidth(0.4)
      .strokeColor("#89939F")
      .rect(43.5 * mm, 35 * mm, 210 * mm, 140 * mm)
      .stroke()
      .restore();
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor("#46536A")
      .text(
        "PROVISIONAL TRIM: 210 × 140 mm  |  RGB design proof  |  No production bleed or seam allowance applied",
        20 * mm,
        182 * mm,
      );
    doc.text(
      "Front rebuilt from visible reference. Hidden side/rear artwork is interpretive. Printer template and final packaging copy pending.",
      20 * mm,
      188 * mm,
    );
    doc.end();
    stream.on("finish", resolve);
  });
  fs.writeFileSync(
    path.join(out, "VYTR-colour-palette.json"),
    JSON.stringify(
      {
        status:
          "RGB design intent; printer-managed CMYK or spot colour matching required",
        colours,
      },
      null,
      2,
    ),
  );
  console.log(
    "Created editable and outlined SVG masters, 300 ppi PNG, approval PDF and colour palette.",
  );
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
