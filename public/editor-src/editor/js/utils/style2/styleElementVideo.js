import { defaultValueValue } from "visual/utils/onChange";
import { imageUrl } from "visual/utils/image";
import { videoData as getVideoData } from "visual/utils/video";

export function styleElementVideoPaddingRatio({ v, device, state }) {
  const ratio = defaultValueValue({ v, key: "ratio", device, state });
  const paddingRatio = {
    "1:1": "100%",
    "2:1": "50%",
    "2:3": "150%",
    "3:4": "125%",
    "4:3": "75%",
    "9:16": "177.8%",
    "16:9": "56.25%"
  };

  return ratio === undefined ? ratio : paddingRatio[ratio];
}

export function styleElementVideoHeight({ v, device, props, state }) {
  const {
    meta: { desktopW, tabletW, mobileW }
  } = props;

  const ratio = defaultValueValue({ v, key: "ratio", device, state });
  const video = defaultValueValue({ v, key: "video", device, state });
  const size = defaultValueValue({ v, key: "size", device, state });

  if (ratio === undefined && video === undefined && size === undefined) {
    return undefined;
  } else {
    const src = getVideoData(video);

    const deviceW =
      device === "desktop" ? desktopW : device === "tablet" ? tabletW : mobileW;

    const height =
      ratio === "16:9"
        ? Math.round((((deviceW / 16) * 9) / 100) * size)
        : Math.round((((deviceW / 4) * 3) / 100) * size);

    return !src ? `${height}px` : "auto";
  }
}

export function styleElementVideoIconFontSize({ v, device, state }) {
  const iconSize = defaultValueValue({ v, key: "iconSize", device, state });
  const iconFontSize = Math.round(iconSize * 0.35);

  return iconSize === undefined ? iconSize : iconFontSize;
}

export function styleElementVideoBgColorRatio({ v, device, state }) {
  const ratio = defaultValueValue({ v, key: "ratio", device, state });
  const colorBgVideoRatio = ratio === "4:3" ? "#000" : "transparent";

  return ratio === undefined ? ratio : colorBgVideoRatio;
}

export function styleElementVideoPointerEvents({ v, device, state }) {
  return IS_EDITOR ? `pointer-events: none` : "";
}

export function styleElementVideoCoverSrc({ v, device, state }) {
  const coverImageSrc = defaultValueValue({
    v,
    key: "coverImageSrc",
    device,
    state
  });

  return coverImageSrc === undefined
    ? coverImageSrc
    : coverImageSrc === ""
    ? "none"
    : `url(${imageUrl(coverImageSrc)})`;
}

export function styleElementVideoCoverPositionX({ v, device, state }) {
  const coverPositionX = defaultValueValue({
    v,
    key: "coverPositionX",
    device,
    state
  });

  return coverPositionX;
}

export function styleElementVideoCoverPositionY({ v, device, state }) {
  const coverPositionY = defaultValueValue({
    v,
    key: "coverPositionY",
    device,
    state
  });

  return coverPositionY;
}

export function styleElementVideoCoverZoom({ v, device, state }) {
  const coverZoom = defaultValueValue({ v, key: "coverZoom", device, state });

  return coverZoom;
}

export function styleElementVideoIconSizeWidth({ v, device, state }) {
  const iconSizeWidth = defaultValueValue({
    v,
    key: "iconSizeWidth",
    device,
    state
  });

  return iconSizeWidth;
}

export function styleElementVideoIconSizeHeight({ v, device, state }) {
  const iconSizeHeight = defaultValueValue({
    v,
    key: "iconSizeHeight",
    device,
    state
  });

  return iconSizeHeight;
}
