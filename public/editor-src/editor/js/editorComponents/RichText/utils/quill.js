import Quill from "quill";
import Link from "./formats/Link";
import Population from "./formats/Population";
import Pre from "./formats/Pre";
import DCBlock from "./formats/DCBlock";

if (IS_EDITOR) {
  let Parchment = Quill.import("parchment");
  Quill.debug("error");

  const registerParchment = (
    id,
    type,
    attributorType = "class",
    scopeType = "block"
  ) => {
    const scope = {
      scope:
        scopeType === "inline" ? Parchment.Scope.INLINE : Parchment.Scope.BLOCK
    };

    let parchment;
    switch (attributorType) {
      case "class":
        parchment = new Parchment.Attributor.Class(id, type, scope);
        break;
      case "style":
        parchment = new Parchment.Attributor.Style(id, type, scope);
        break;
      default:
        parchment = new Parchment.Attributor.Attribute(id, type, scope);
    }

    Quill.register(parchment);
  };

  registerParchment("desktopHeight", "brz-lh-lg");
  registerParchment("intermediateTabletHeight", "brz-lh-sm-im");
  registerParchment("intermediateMobileHeight", "brz-lh-xs-im");
  registerParchment("tabletHeight", "brz-lh-sm");
  registerParchment("mobileHeight", "brz-lh-xs");
  registerParchment("desktopSize", "brz-fs-lg");
  registerParchment("intermediateTabletSize", "brz-fs-sm-im");
  registerParchment("intermediateMobileSize", "brz-fs-xs-im");
  registerParchment("tabletSize", "brz-fs-sm");
  registerParchment("mobileSize", "brz-fs-xs");
  registerParchment("desktopHorizontalAlign", "brz-text-lg");
  registerParchment("tabletHorizontalAlign", "brz-text-sm");
  registerParchment("mobileHorizontalAlign", "brz-text-xs");
  registerParchment("desktopLetterSpacing", "brz-ls-lg");
  registerParchment("intermediateTabletLetterSpacing", "brz-ls-sm-im");
  registerParchment("intermediateMobileLetterSpacing", "brz-ls-xs-im");
  registerParchment("tabletLetterSpacing", "brz-ls-sm");
  registerParchment("mobileLetterSpacing", "brz-ls-xs");
  registerParchment("font", "brz-ff");
  registerParchment("fontType", "brz-ft");
  registerParchment("desktopWeight", "brz-fw-lg");
  registerParchment("intermediateTabletWeight", "brz-fw-sm-im");
  registerParchment("intermediateMobileWeight", "brz-fw-xs-im");
  registerParchment("tabletWeight", "brz-fw-sm");
  registerParchment("mobileWeight", "brz-fw-xs");
  registerParchment("desktopMarginTop", "brz-mt-lg");
  registerParchment("desktopMarginBottom", "brz-mb-lg");
  registerParchment("tabletMarginTop", "brz-mt-sm");
  registerParchment("mobileMarginTop", "brz-mt-xs");
  registerParchment("tabletMarginBottom", "brz-mb-sm");
  registerParchment("mobileMarginBottom", "brz-mb-xs");
  registerParchment("fontStyle", "brz-tp");
  registerParchment("colorPalette", "brz-cp", "class", "inline");
  registerParchment("prepopulation", "brz-pre-population", "class", "inline");

  registerParchment("opacity", "opacity", "style", "inline");
  registerParchment("populationColor", "data-color", "attribute");

  Quill.register(Population);
  Quill.register(Link);
  Quill.register(Pre, true);
  Quill.register(DCBlock, true);
}

export const Delta = Quill.import("delta");
export const Keyboard = Quill.import("modules/keyboard");
export default Quill;
