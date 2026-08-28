// ==UserScript==
// @name         小红书 · 飞书云文档外观
// @namespace    https://github.com/yangyq081/xiaohongshu-lark-docs
// @version      0.11.5
// @description  仅改变小红书网页版外观，保留原始内容、链接、按钮和交互。
// @author       yangyq081
// @license      MIT
// @match        https://www.xiaohongshu.com/*
// @match        https://xiaohongshu.com/*
// @icon         https://www.xiaohongshu.com/favicon.ico
// @homepageURL  https://github.com/yangyq081/xiaohongshu-lark-docs
// @supportURL   https://github.com/yangyq081/xiaohongshu-lark-docs/issues
// @updateURL    https://raw.githubusercontent.com/yangyq081/xiaohongshu-lark-docs/main/xiaohongshu-lark-docs.user.js
// @downloadURL  https://raw.githubusercontent.com/yangyq081/xiaohongshu-lark-docs/main/xiaohongshu-lark-docs.user.js
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @run-at       document-start
// @noframes
// ==/UserScript==

(function () {
  "use strict";

  const ROOT_CLASS = "xhs-lark-skin";
  const LIST_CLASS = "xhs-lark-list";
  const MINIMAL_CLASS = "xhs-lark-minimal-list";
  const CHANNELS_OPEN_CLASS = "xhs-lark-channels-open";
  const DETAIL_MEDIA_OPEN_CLASS = "xhs-lark-detail-media-open";
  const DETAIL_AUTHOR_COMMENT_CLASS = "xhs-lark-author-comment";
  const DETAIL_AUTHOR_BADGE_CLASS = "xhs-lark-author-badge-needed";
  const CONTENT_KEY = "xhs-lark-list-mode";
  const STYLE_ID = "xhs-lark-docs-style";
  const FAVICON_ID = "xhs-lark-favicon";
  const CHANNEL_TOGGLE_ID = "xhs-lark-channel-toggle";
  const DETAIL_MEDIA_TOGGLE_ID = "xhs-lark-detail-media-toggle";
  const LARK_LOGO_SVG = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="LarkLogoColorful" aria-hidden="true">
    <path d="m12.924 12.803.056-.054c.038-.034.076-.072.11-.11l.077-.076.23-.227 1.334-1.319.335-.331c.063-.063.13-.123.195-.183a7.777 7.777 0 0 1 1.823-1.24 7.607 7.607 0 0 1 1.014-.4 13.177 13.177 0 0 0-2.5-5.013 1.203 1.203 0 0 0-.94-.448h-9.65c-.173 0-.246.224-.107.325a28.23 28.23 0 0 1 8 9.098c.007-.006.016-.013.023-.022Z" fill="#00D6B9"></path>
    <path d="M9.097 21.299a13.258 13.258 0 0 0 11.82-7.247 5.576 5.576 0 0 1-.731 1.076 5.315 5.315 0 0 1-.745.7 5.117 5.117 0 0 1-.615.404 4.626 4.626 0 0 1-.726.331 5.312 5.312 0 0 1-1.883.312 5.892 5.892 0 0 1-.524-.031 6.509 6.509 0 0 1-.729-.126c-.06-.016-.12-.029-.18-.044-.166-.044-.33-.092-.494-.14-.082-.024-.164-.046-.246-.072-.123-.038-.247-.072-.366-.11l-.3-.095-.284-.094-.192-.067c-.08-.025-.155-.053-.234-.082a3.49 3.49 0 0 1-.167-.06c-.11-.04-.221-.079-.328-.12-.063-.025-.126-.047-.19-.072l-.252-.098c-.088-.035-.18-.07-.268-.107l-.174-.07c-.072-.028-.141-.06-.214-.088l-.164-.07c-.057-.024-.114-.05-.17-.075l-.149-.066-.135-.06-.14-.063a90.183 90.183 0 0 1-.141-.066 4.808 4.808 0 0 0-.18-.083c-.063-.028-.123-.06-.186-.088a5.697 5.697 0 0 1-.199-.098 27.762 27.762 0 0 1-8.067-5.969.18.18 0 0 0-.312.123l.006 9.21c0 .4.199.779.533 1a13.177 13.177 0 0 0 7.326 2.205Z" fill="#3370FF"></path>
    <path d="M23.732 9.295a7.55 7.55 0 0 0-3.35-.776 7.521 7.521 0 0 0-2.284.35c-.054.016-.107.035-.158.05a8.297 8.297 0 0 0-.855.35 7.14 7.14 0 0 0-.552.297 6.716 6.716 0 0 0-.533.347c-.123.089-.243.18-.363.275-.13.104-.252.211-.375.321-.067.06-.13.123-.196.184l-.334.328-1.338 1.321-.23.228-.076.075c-.038.038-.076.073-.11.11l-.057.054a1.914 1.914 0 0 1-.085.08c-.032.028-.063.06-.095.088a13.286 13.286 0 0 1-2.748 1.946c.06.028.12.057.18.082l.142.066c.044.022.091.041.139.063l.135.06.149.067.17.075.164.07c.073.031.142.06.215.088.056.025.116.047.173.07.088.034.177.072.268.107.085.031.168.066.253.098l.189.072c.11.041.218.082.328.12.057.019.11.041.167.06.08.028.155.053.234.082l.192.066.284.095.3.095c.123.037.243.075.366.11l.246.072c.164.048.331.095.495.14.06.015.12.03.18.043.114.029.227.05.34.07.13.022.26.04.389.057a5.815 5.815 0 0 0 .994.019 5.172 5.172 0 0 0 1.413-.3 5.405 5.405 0 0 0 .726-.334c.06-.035.122-.07.182-.108a7.96 7.96 0 0 0 .432-.297 5.362 5.362 0 0 0 .577-.517 5.285 5.285 0 0 0 .37-.429 5.797 5.797 0 0 0 .527-.827l.13-.258 1.166-2.325-.003.006a7.391 7.391 0 0 1 1.527-2.186Z" fill="#133C9A"></path>
  </svg>`;
  const LARK_LOGO_DATA_URL = `data:image/svg+xml,${encodeURIComponent(LARK_LOGO_SVG)}`;
  const MEDIA_ICON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"></path></svg>`;
  const MEDIA_ICON_DATA_URL = `data:image/svg+xml,${encodeURIComponent(MEDIA_ICON_SVG)}`;
  const USER_ICON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg>`;
  const USER_ICON_DATA_URL = `data:image/svg+xml,${encodeURIComponent(USER_ICON_SVG)}`;
  const AUTHOR_ICON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5Z"></path><path d="M14 2v6h6"></path><path d="M8 13h8"></path><path d="M8 17h5"></path></svg>`;
  const AUTHOR_ICON_DATA_URL = `data:image/svg+xml,${encodeURIComponent(AUTHOR_ICON_SVG)}`;
  const CURRENT_USER_ICON_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#E8F8F3"></circle><circle cx="12" cy="8" r="4" stroke="#00A870" stroke-width="1.8"></circle><path d="M4.5 20a7.5 7.5 0 0 1 15 0" stroke="#00A870" stroke-width="1.8" stroke-linecap="round"></path></svg>`;
  const CURRENT_USER_ICON_DATA_URL = `data:image/svg+xml,${encodeURIComponent(CURRENT_USER_ICON_SVG)}`;
  let activeDetailContainer = null;
  let activeDetailUrl = "";
  let tabTitleObserver = null;
  let tabTitleTarget = null;
  let lastNativeTabTitle = "";

  const storage = {
    get(key, fallback) {
      if (typeof GM_getValue === "function") {
        return GM_getValue(key, fallback);
      }

      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
      } catch (_error) {
        return fallback;
      }
    },
    set(key, value) {
      if (typeof GM_setValue === "function") {
        GM_setValue(key, value);
        return;
      }

      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (_error) {
        // The skin still works when storage is unavailable.
      }
    },
  };

  const CSS = String.raw`
    html.${ROOT_CLASS} {
      color-scheme: light;
      --xld-blue: #3370ff;
      --xld-blue-hover: #245bdb;
      --xld-blue-pressed: #1c4cba;
      --xld-blue-soft: #e8f0ff;
      --xld-canvas: #ffffff;
      --xld-page: #f5f6f7;
      --xld-fill: #f7f8fa;
      --xld-hover: #eff0f1;
      --xld-border: #dee0e3;
      --xld-border-soft: #e8eaed;
      --xld-text: #1f2329;
      --xld-text-secondary: #646a73;
      --xld-text-tertiary: #8f959e;
      --xld-danger: #f54a45;
      --xld-shadow-sm: 0 1px 2px rgb(31 35 41 / 6%);
      --xld-shadow-md: 0 8px 24px rgb(31 35 41 / 10%);
      --xld-sidebar-width: 240px;
      --xld-control-height: 40px;
      --xld-nav-gap: 8px;
    }

    html.${ROOT_CLASS},
    html.${ROOT_CLASS} body,
    html.${ROOT_CLASS} #app,
    html.${ROOT_CLASS} #global {
      background: var(--xld-page) !important;
      color: var(--xld-text) !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif !important;
      letter-spacing: 0 !important;
    }

    html.${ROOT_CLASS} :is(button, input, textarea, select) {
      font: inherit !important;
      letter-spacing: 0 !important;
    }

    html.${ROOT_CLASS} * {
      scrollbar-color: #bbbfc4 transparent;
    }

    html.${ROOT_CLASS} *::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    html.${ROOT_CLASS} *::-webkit-scrollbar-thumb {
      background: #bbbfc4;
      border: 2px solid transparent;
      border-radius: 4px;
      background-clip: padding-box;
    }

    html.${ROOT_CLASS} *::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Application surfaces */
    html.${ROOT_CLASS} :is(.main-container, .main-content, .feeds-page, .feeds-content) {
      background: var(--xld-canvas) !important;
    }

    html.${ROOT_CLASS} .header-container {
      background: var(--xld-canvas) !important;
      border-bottom: 1px solid var(--xld-border) !important;
      box-shadow: none !important;
    }

    html.${ROOT_CLASS} header.mask-paper {
      background: var(--xld-canvas) !important;
      color: var(--xld-text) !important;
      box-shadow: none !important;
    }

    html.${ROOT_CLASS} .header-logo {
      filter: saturate(0.92) contrast(1.04);
    }

    /* Search keeps the site's original input and submit behavior. */
    html.${ROOT_CLASS} .search-area :is(.input-box, .wendian-wrapper.search-input) {
      min-height: 0 !important;
      background: transparent !important;
      border: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }

    html.${ROOT_CLASS} header.mask-paper .input-box,
    html.${ROOT_CLASS} .search-area .textarea-container {
      min-height: var(--xld-control-height) !important;
      background: var(--xld-fill) !important;
      border: 1px solid var(--xld-border) !important;
      border-radius: 6px !important;
      box-shadow: none !important;
      transition: border-color 160ms ease, box-shadow 160ms ease,
        background-color 160ms ease;
    }

    html.${ROOT_CLASS} header.mask-paper .input-box:hover,
    html.${ROOT_CLASS} .search-area .textarea-container:hover {
      background: var(--xld-canvas) !important;
      border-color: #b7bbc2 !important;
    }

    html.${ROOT_CLASS} header.mask-paper .input-box:focus-within,
    html.${ROOT_CLASS} .search-area .textarea-container:focus-within {
      background: var(--xld-canvas) !important;
      border-color: var(--xld-blue) !important;
      box-shadow: 0 0 0 2px rgb(51 112 255 / 12%) !important;
    }

    html.${ROOT_CLASS} :is(.search-input, textarea, input) {
      color: var(--xld-text) !important;
    }

    html.${ROOT_CLASS} :is(.search-input, textarea, input)::placeholder {
      color: var(--xld-text-tertiary) !important;
    }

    /* Sidebar */
    html.${ROOT_CLASS} .side-bar {
      background: var(--xld-page) !important;
      border-right: 1px solid var(--xld-border) !important;
      box-shadow: none !important;
    }

    html.${ROOT_CLASS} .side-bar .channel-list {
      padding-inline: 12px !important;
    }

    html.${ROOT_CLASS} .side-bar .channel-list-content {
      display: flex;
      flex-direction: column;
      gap: var(--xld-nav-gap);
    }

    html.${ROOT_CLASS} .side-bar :is(.link-wrapper, .bottom-channel) {
      min-height: var(--xld-control-height) !important;
      color: var(--xld-text-secondary) !important;
      border-radius: 6px !important;
      transition: color 140ms ease, background-color 140ms ease;
    }

    html.${ROOT_CLASS} .side-bar :is(.link-wrapper, .bottom-channel):hover {
      color: var(--xld-text) !important;
      background: var(--xld-hover) !important;
    }

    html.${ROOT_CLASS} .side-bar :is(.active-channel .link-wrapper, .link-wrapper.active) {
      color: var(--xld-blue) !important;
      background: var(--xld-blue-soft) !important;
      font-weight: 600 !important;
    }

    html.${ROOT_CLASS} .side-bar :is(.active-channel .reds-icon, .link-wrapper.active .reds-icon) {
      color: var(--xld-blue) !important;
    }

    html.${ROOT_CLASS} .side-bar .badge-container {
      background: var(--xld-danger) !important;
      box-shadow: 0 0 0 2px var(--xld-page) !important;
    }

    /* Desktop document navigation, using the site's real logo, search and links. */
    @media (min-width: 960px) {
      html.${ROOT_CLASS} .main-content.with-side-bar {
        padding-left: var(--xld-sidebar-width) !important;
      }

      html.${ROOT_CLASS} .header-container::before {
        position: fixed;
        z-index: 1;
        inset: 0 auto auto 0;
        width: var(--xld-sidebar-width);
        height: 64px;
        content: "";
        background: var(--xld-page);
        border-right: 1px solid var(--xld-border);
      }

      html.${ROOT_CLASS} header.mask-paper {
        padding-left: calc(var(--xld-sidebar-width) + 16px) !important;
      }

      html.${ROOT_CLASS} #link-guide {
        position: fixed !important;
        z-index: 1202 !important;
        top: 12px !important;
        left: 16px !important;
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
        width: calc(var(--xld-sidebar-width) - 32px) !important;
        height: 40px !important;
        color: var(--xld-text) !important;
        text-decoration: none !important;
      }

      html.${ROOT_CLASS} #link-guide::before {
        width: 25px;
        height: 25px;
        flex: none;
        content: "";
        background: url("${LARK_LOGO_DATA_URL}") center / contain no-repeat;
      }

      html.${ROOT_CLASS} #link-guide::after {
        content: "飞书云文档";
        flex: none;
        color: var(--xld-text);
        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
        white-space: nowrap;
      }

      html.${ROOT_CLASS} #link-guide :is(.header-logo, .brand) {
        display: none !important;
      }

      html.${ROOT_CLASS} header.mask-paper .input-box {
        position: fixed !important;
        z-index: 1202 !important;
        top: 68px !important;
        left: 12px !important;
        width: calc(var(--xld-sidebar-width) - 24px) !important;
        min-width: 0 !important;
        height: 40px !important;
        padding-right: 42px !important;
      }

      html.${ROOT_CLASS} header.mask-paper .min-width-search-icon {
        position: fixed !important;
        z-index: 1203 !important;
        top: 72px !important;
        left: calc(var(--xld-sidebar-width) - 48px) !important;
        width: 32px !important;
        min-width: 32px !important;
        height: 32px !important;
      }

      html.${ROOT_CLASS} .side-bar {
        top: 0 !important;
        width: var(--xld-sidebar-width) !important;
        height: 100vh !important;
        padding-top: 124px !important;
        padding-inline: 0 !important;
      }

      html.${ROOT_CLASS} .side-bar .channel-list {
        width: 100% !important;
        height: calc(100vh - 196px) !important;
        padding-inline: 12px !important;
      }

      html.${ROOT_CLASS} .side-bar .link-wrapper {
        width: 100% !important;
        height: var(--xld-control-height) !important;
        padding-inline: 12px !important;
        font-size: 15px !important;
        line-height: 22px !important;
      }

      html.${ROOT_CLASS} .side-bar .link-wrapper
        :is(.reds-icon, .badge-container, .count, .reds-avatar) {
        display: none !important;
      }

      html.${ROOT_CLASS} .side-bar .channel-list-content > .popover-container {
        width: 100% !important;
        margin: 0 !important;
        color: inherit !important;
        background: transparent !important;
        border: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
      }

      html.${ROOT_CLASS} .side-bar .channel-list-content > .popover-container > .popover-trigger {
        width: 100% !important;
      }

      html.${ROOT_CLASS} .side-bar .channel-list-content > :nth-child(4) {
        margin-bottom: 10px !important;
        padding-bottom: 10px !important;
        border-bottom: 1px solid var(--xld-border) !important;
      }

      html.${ROOT_CLASS} .side-bar .reds-icon {
        color: var(--xld-text-secondary) !important;
      }

      html.${ROOT_CLASS} .side-bar
        :is(.active-channel .reds-icon, .link-wrapper.active .reds-icon) {
        color: var(--xld-blue) !important;
      }

      html.${ROOT_CLASS} .side-bar .login-btn {
        min-height: 40px !important;
        border-radius: 6px !important;
      }
    }

    html.${ROOT_CLASS} :is(.icp-info, .corp-info, .app-info) {
      color: var(--xld-text-tertiary) !important;
    }

    /* Channel tabs */
    #${CHANNEL_TOGGLE_ID} {
      display: none;
    }

    @media (min-width: 960px) {
      html.${ROOT_CLASS} .channel-container:has(> #channel-container) {
        position: relative !important;
        min-height: 72px !important;
        height: 72px !important;
      }

      html.${ROOT_CLASS} #${CHANNEL_TOGGLE_ID} {
        position: absolute;
        z-index: 3;
        top: 20px;
        left: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        padding: 0;
        color: var(--xld-text-secondary);
        background: var(--xld-canvas);
        border: 1px solid var(--xld-border);
        border-radius: 6px;
        box-shadow: var(--xld-shadow-sm);
        cursor: pointer;
        transition: color 140ms ease, background-color 140ms ease,
          border-color 140ms ease;
      }

      html.${ROOT_CLASS} #${CHANNEL_TOGGLE_ID}:hover {
        color: var(--xld-text);
        background: var(--xld-hover);
        border-color: #b7bbc2;
      }

      html.${ROOT_CLASS}.${CHANNELS_OPEN_CLASS} #${CHANNEL_TOGGLE_ID} {
        color: var(--xld-blue);
        background: var(--xld-blue-soft);
        border-color: rgb(51 112 255 / 28%);
      }

      html.${ROOT_CLASS} #${CHANNEL_TOGGLE_ID} .xhs-lark-list-icon {
        display: flex;
        flex: none;
        flex-direction: column;
        justify-content: center;
        gap: 2px;
        width: 20px;
        height: 15px;
      }

      html.${ROOT_CLASS} #${CHANNEL_TOGGLE_ID} .xhs-lark-list-icon-row {
        position: relative;
        display: block;
        width: 20px;
        height: 3px;
      }

      html.${ROOT_CLASS} #${CHANNEL_TOGGLE_ID} .xhs-lark-list-icon-row::before,
      html.${ROOT_CLASS} #${CHANNEL_TOGGLE_ID} .xhs-lark-list-icon-row::after {
        position: absolute;
        content: "";
        background: currentColor;
      }

      html.${ROOT_CLASS} #${CHANNEL_TOGGLE_ID} .xhs-lark-list-icon-row::before {
        top: 0;
        left: 0;
        width: 3px;
        height: 3px;
        border-radius: 50%;
      }

      html.${ROOT_CLASS} #${CHANNEL_TOGGLE_ID} .xhs-lark-list-icon-row::after {
        top: 1px;
        left: 7px;
        width: 13px;
        height: 2px;
        border-radius: 1px;
      }

      html.${ROOT_CLASS}:not(.${CHANNELS_OPEN_CLASS}) #channel-container {
        display: none !important;
      }

      html.${ROOT_CLASS}.${CHANNELS_OPEN_CLASS} #channel-container {
        display: flex !important;
        width: calc(100% - 48px) !important;
        margin-left: 48px !important;
        border-bottom: 0 !important;
      }
    }

    html.${ROOT_CLASS} :is(.channel-container, #channel-container) {
      background: var(--xld-canvas) !important;
      border-bottom: 1px solid var(--xld-border-soft) !important;
    }

    html.${ROOT_CLASS} #channel-container .content-container {
      gap: 4px;
    }

    html.${ROOT_CLASS} #channel-container .channel:not([aria-hidden="true"]) {
      position: relative;
      color: var(--xld-text-secondary) !important;
      border-radius: 6px !important;
      transition: color 140ms ease, background-color 140ms ease;
    }

    html.${ROOT_CLASS} #channel-container .channel:not([aria-hidden="true"]):hover {
      color: var(--xld-text) !important;
      background: var(--xld-hover) !important;
    }

    html.${ROOT_CLASS} #channel-container .channel.active:not([aria-hidden="true"]) {
      color: var(--xld-blue) !important;
      background: var(--xld-blue-soft) !important;
      font-weight: 600 !important;
    }

    /* Masonry cards: do not change width, height or positioning. */
    html.${ROOT_CLASS} .note-item .cover {
      overflow: hidden !important;
      border-radius: 6px 6px 0 0 !important;
      outline: 1px solid var(--xld-border-soft);
      outline-offset: -1px;
      background: var(--xld-fill) !important;
    }

    html.${ROOT_CLASS} .note-item .cover img {
      transition: filter 180ms ease, transform 180ms ease;
    }

    html.${ROOT_CLASS} .note-item:hover .cover img {
      filter: brightness(0.97);
      transform: scale(1.012);
    }

    html.${ROOT_CLASS} .note-item .footer {
      background: var(--xld-canvas) !important;
      border-radius: 0 0 6px 6px !important;
      box-shadow: inset 1px 0 var(--xld-border-soft),
        inset -1px 0 var(--xld-border-soft), inset 0 -1px var(--xld-border-soft);
    }

    html.${ROOT_CLASS} .note-item .title {
      color: var(--xld-text) !important;
      font-weight: 600 !important;
      line-height: 1.5 !important;
    }

    html.${ROOT_CLASS} .note-item :is(.author, .name, .count) {
      color: var(--xld-text-secondary) !important;
    }

    html.${ROOT_CLASS} .note-item .author:hover .name {
      color: var(--xld-blue) !important;
    }

    html.${ROOT_CLASS} .note-item :is(.like-wrapper, .like-icon) {
      transition: color 140ms ease, transform 140ms ease;
    }

    html.${ROOT_CLASS} .note-item .like-wrapper:hover {
      color: var(--xld-danger) !important;
    }

    /* Cloud document list. The site's original nodes and handlers stay intact. */
    html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds.feeds-container {
      display: flex !important;
      flex-direction: column !important;
      gap: 0 !important;
      height: auto !important;
      min-height: 0 !important;
      padding: 8px 0 40px !important;
      border-top: 1px solid var(--xld-border-soft);
    }

    html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds > .note-item {
      position: relative !important;
      inset: auto !important;
      width: 100% !important;
      height: 64px !important;
      margin: 0 !important;
      transform: none !important;
      border-bottom: 1px solid var(--xld-border-soft);
      background: var(--xld-canvas) !important;
      transition: background-color 140ms ease;
    }

    html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds > .note-item:hover {
      background: var(--xld-fill) !important;
    }

    html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds > .note-item > div {
      display: grid !important;
      grid-template-columns: 48px minmax(0, 1fr) !important;
      align-items: center !important;
      gap: 12px !important;
      width: 100% !important;
      height: 64px !important;
      padding: 8px 12px !important;
    }

    html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds .note-item .cover {
      display: block !important;
      width: 48px !important;
      min-width: 48px !important;
      height: 48px !important;
      border-radius: 4px !important;
      outline-color: var(--xld-border-soft);
    }

    html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds .note-item .cover img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
    }

    html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds .note-item .footer {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) minmax(220px, 34%) !important;
      align-items: center !important;
      gap: 20px !important;
      min-width: 0 !important;
      height: auto !important;
      padding: 0 !important;
      background: transparent !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }

    html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds .note-item .title {
      display: block !important;
      min-width: 0 !important;
      overflow: hidden !important;
      color: var(--xld-text) !important;
      font-size: 14px !important;
      font-weight: 400 !important;
      line-height: 22px !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }

    html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds .note-item .author-wrapper {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) 76px !important;
      align-items: center !important;
      gap: 12px !important;
      min-width: 0 !important;
      margin: 0 !important;
    }

    html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds .note-item .author {
      min-width: 0 !important;
      overflow: hidden !important;
    }

    html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds .note-item .author .name {
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }

    html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds .note-item .like-wrapper {
      justify-self: end !important;
      white-space: nowrap !important;
    }

    html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds .note-item :is(.play-icon, .live-badge) {
      transform: scale(0.78);
      transform-origin: center;
    }

    /* Optional text-only list. Nodes remain mounted so mode changes are reversible. */
    html.${ROOT_CLASS}.${LIST_CLASS}.${MINIMAL_CLASS}
      #exploreFeeds > .note-item > div {
      grid-template-columns: minmax(0, 1fr) !important;
    }

    html.${ROOT_CLASS}.${LIST_CLASS}.${MINIMAL_CLASS}
      #exploreFeeds .note-item .cover {
      display: none !important;
    }

    html.${ROOT_CLASS}.${LIST_CLASS}.${MINIMAL_CLASS}
      #exploreFeeds .note-item
      :is(.avatar-container, .author-avatar, .avatar-wrapper, .live-avatar-container) {
      display: none !important;
    }

    html.${ROOT_CLASS}.${LIST_CLASS}.${MINIMAL_CLASS}
      #exploreFeeds .note-item .author {
      gap: 0 !important;
    }

    /* Buttons */
    html.${ROOT_CLASS} .reds-button-new {
      border-radius: 6px !important;
      box-shadow: none !important;
      transition: color 140ms ease, background-color 140ms ease,
        border-color 140ms ease;
    }

    html.${ROOT_CLASS} .reds-button-new.primary:not(.pure-icon) {
      color: #ffffff !important;
      background: var(--xld-blue) !important;
      border-color: var(--xld-blue) !important;
    }

    html.${ROOT_CLASS} .reds-button-new.primary:not(.pure-icon):hover {
      background: var(--xld-blue-hover) !important;
      border-color: var(--xld-blue-hover) !important;
    }

    html.${ROOT_CLASS} .reds-button-new.primary:not(.pure-icon):active {
      background: var(--xld-blue-pressed) !important;
      border-color: var(--xld-blue-pressed) !important;
    }

    html.${ROOT_CLASS} .reds-button-new:not(.primary) {
      color: var(--xld-text) !important;
      background: var(--xld-canvas) !important;
      border-color: var(--xld-border) !important;
    }

    html.${ROOT_CLASS} .reds-button-new:not(.primary):hover {
      background: var(--xld-hover) !important;
    }

    html.${ROOT_CLASS} .reds-button-new.primary.pure-icon {
      color: var(--xld-text-secondary) !important;
      background: transparent !important;
      border-color: transparent !important;
    }

    html.${ROOT_CLASS} .reds-button-new.primary.pure-icon:hover {
      color: var(--xld-text) !important;
      background: var(--xld-hover) !important;
    }

    html.${ROOT_CLASS} :is(button, a, input, textarea):focus-visible {
      outline: 2px solid rgb(51 112 255 / 45%) !important;
      outline-offset: 2px !important;
    }

    /* Note detail overlay */
    #${DETAIL_MEDIA_TOGGLE_ID} {
      display: none;
    }

    html.${ROOT_CLASS} .note-detail-mask {
      background: rgb(31 35 41 / 32%) !important;
      backdrop-filter: blur(1px);
    }

    html.${ROOT_CLASS} #noteContainer.note-container {
      width: min(900px, calc(100vw - 128px)) !important;
      height: calc(100vh - 64px) !important;
      max-height: 860px !important;
      overflow: hidden !important;
      background: var(--xld-canvas) !important;
      border: 1px solid var(--xld-border) !important;
      border-radius: 6px !important;
      box-shadow: var(--xld-shadow-md) !important;
    }

    html.${ROOT_CLASS}:not(.${DETAIL_MEDIA_OPEN_CLASS})
      #noteContainer > :is(.media-container, #pagination-teleport-container) {
      display: none !important;
    }

    html.${ROOT_CLASS}:not(.${DETAIL_MEDIA_OPEN_CLASS})
      #noteContainer .interaction-container {
      flex: 1 1 auto !important;
      width: 100% !important;
      min-width: 0 !important;
      border-left: 0 !important;
    }

    html.${ROOT_CLASS}:not(.${DETAIL_MEDIA_OPEN_CLASS})
      #noteContainer :is(.author-wrapper, .note-content, .comments-el, .tips-el,
        .interaction-divider, .engage-bar-container) {
      width: min(760px, 100%) !important;
      margin-right: auto !important;
      margin-left: auto !important;
      box-sizing: border-box !important;
    }

    html.${ROOT_CLASS}.${DETAIL_MEDIA_OPEN_CLASS} #noteContainer.note-container {
      width: min(1180px, calc(100vw - 96px)) !important;
    }

    html.${ROOT_CLASS} #${DETAIL_MEDIA_TOGGLE_ID} {
      display: inline-flex;
      flex: none;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      margin-left: auto;
      padding: 0;
      color: var(--xld-text-secondary);
      background: transparent;
      border: 0;
      border-radius: 6px;
      cursor: pointer;
      transition: color 140ms ease, background-color 140ms ease;
    }

    html.${ROOT_CLASS} #${DETAIL_MEDIA_TOGGLE_ID}:hover {
      color: var(--xld-text);
      background: var(--xld-hover);
    }

    html.${ROOT_CLASS}.${DETAIL_MEDIA_OPEN_CLASS} #${DETAIL_MEDIA_TOGGLE_ID} {
      color: var(--xld-blue);
      background: var(--xld-blue-soft);
    }

    html.${ROOT_CLASS} #${DETAIL_MEDIA_TOGGLE_ID} .xhs-lark-media-icon {
      width: 18px;
      height: 18px;
      background: currentColor;
      mask: url("${MEDIA_ICON_DATA_URL}") center / contain no-repeat;
      -webkit-mask: url("${MEDIA_ICON_DATA_URL}") center / contain no-repeat;
    }

    html.${ROOT_CLASS} #noteContainer .author-container .author-wrapper {
      gap: 8px !important;
    }

    html.${ROOT_CLASS} #noteContainer .author-container .avatar-click,
    html.${ROOT_CLASS} #noteContainer .author-container .avatar-container {
      position: relative !important;
      flex: none !important;
      width: 28px !important;
      min-width: 28px !important;
      height: 28px !important;
      overflow: hidden !important;
      background: var(--xld-blue-soft) !important;
      border-radius: 6px !important;
    }

    html.${ROOT_CLASS} #noteContainer .author-container .avatar-container::after {
      position: absolute;
      inset: 6px;
      content: "";
      pointer-events: none;
      background: var(--xld-blue);
      mask: url("${AUTHOR_ICON_DATA_URL}") center / contain no-repeat;
      -webkit-mask: url("${AUTHOR_ICON_DATA_URL}") center / contain no-repeat;
    }

    html.${ROOT_CLASS} #noteContainer .author-container .avatar-container > a {
      display: block !important;
      width: 100% !important;
      height: 100% !important;
    }

    html.${ROOT_CLASS} #noteContainer .author-container .avatar-item {
      width: 100% !important;
      height: 100% !important;
      opacity: 0 !important;
    }

    html.${ROOT_CLASS} #noteContainer .author-container .info > .name::after,
    html.${ROOT_CLASS} #noteContainer .${DETAIL_AUTHOR_BADGE_CLASS}
      .right .author::after {
      display: inline-flex;
      align-items: center;
      height: 20px;
      margin-left: 6px;
      padding: 0 6px;
      color: var(--xld-blue);
      font-size: 12px;
      font-weight: 500;
      line-height: 20px;
      content: "作者";
      vertical-align: middle;
      background: var(--xld-blue-soft);
      border-radius: 4px;
    }

    html.${ROOT_CLASS} #noteContainer .comment-item .avatar {
      position: relative !important;
      flex: none !important;
      width: 24px !important;
      min-width: 24px !important;
      height: 24px !important;
      overflow: hidden !important;
      background: var(--xld-hover) !important;
      border-radius: 50% !important;
    }

    html.${ROOT_CLASS} #noteContainer .comment-item .avatar::after {
      position: absolute;
      inset: 5px;
      content: "";
      pointer-events: none;
      background: var(--xld-text-tertiary);
      mask: url("${USER_ICON_DATA_URL}") center / contain no-repeat;
      -webkit-mask: url("${USER_ICON_DATA_URL}") center / contain no-repeat;
    }

    html.${ROOT_CLASS} #noteContainer .comment-item .avatar > a {
      display: block !important;
      width: 100% !important;
      height: 100% !important;
    }

    html.${ROOT_CLASS} #noteContainer .comment-item .avatar-item {
      width: 100% !important;
      height: 100% !important;
      opacity: 0 !important;
    }

    html.${ROOT_CLASS} #noteContainer .${DETAIL_AUTHOR_COMMENT_CLASS} .avatar {
      background: var(--xld-blue-soft) !important;
      border-radius: 6px !important;
    }

    html.${ROOT_CLASS} #noteContainer .${DETAIL_AUTHOR_COMMENT_CLASS} .avatar::after {
      inset: 5px;
      background: var(--xld-blue);
      mask-image: url("${AUTHOR_ICON_DATA_URL}");
      -webkit-mask-image: url("${AUTHOR_ICON_DATA_URL}");
    }

    html.${ROOT_CLASS} #noteContainer .engage-bar
      .content-edit .inner-when-not-active .icon {
      width: 24px !important;
      min-width: 24px !important;
      height: 24px !important;
      content: url("${CURRENT_USER_ICON_DATA_URL}") !important;
      object-fit: contain !important;
      background: var(--xld-canvas) !important;
      border-radius: 50% !important;
    }

    html.${ROOT_CLASS} #noteContainer .author-container .note-detail-follow-btn {
      margin-left: 0 !important;
    }

    html.${ROOT_CLASS}:not(.${DETAIL_MEDIA_OPEN_CLASS}) #noteContainer #detail-title {
      font-size: 24px !important;
      font-weight: 600 !important;
      line-height: 32px !important;
    }

    html.${ROOT_CLASS} #noteContainer :is(.media-container, .note-scroller, .interaction-container) {
      background: var(--xld-canvas) !important;
      color: var(--xld-text) !important;
    }

    html.${ROOT_CLASS} #noteContainer .interaction-container {
      border-left: 1px solid var(--xld-border) !important;
    }

    html.${ROOT_CLASS} #noteContainer :is(.divider, .interaction-divider) {
      border-color: var(--xld-border-soft) !important;
      background: var(--xld-border-soft) !important;
    }

    html.${ROOT_CLASS} #noteContainer :is(.note-content, .note-text, .content) {
      color: var(--xld-text) !important;
    }

    html.${ROOT_CLASS} #noteContainer :is(.date, .location, .count) {
      color: var(--xld-text-tertiary) !important;
    }

    html.${ROOT_CLASS} #noteContainer :is(.username, .author, .name):hover {
      color: var(--xld-blue) !important;
    }

    html.${ROOT_CLASS} #noteContainer .comment-item {
      border-radius: 6px !important;
      transition: background-color 140ms ease;
    }

    html.${ROOT_CLASS} #noteContainer .comment-item:hover {
      background: var(--xld-fill) !important;
    }

    html.${ROOT_CLASS} #noteContainer :is(.engage-bar, .engage-bar-container, .input-container) {
      background: var(--xld-canvas) !important;
      border-color: var(--xld-border) !important;
      box-shadow: none !important;
    }

    html.${ROOT_CLASS} #noteContainer :is(.reply-container, .comment-input, .content-edit) {
      background: var(--xld-fill) !important;
      border-color: var(--xld-border) !important;
      border-radius: 6px !important;
    }

    html.${ROOT_CLASS} #noteContainer :is(.reply-container, .comment-input, .content-edit):focus-within {
      background: var(--xld-canvas) !important;
      border-color: var(--xld-blue) !important;
      box-shadow: 0 0 0 2px rgb(51 112 255 / 12%) !important;
    }

    /* Site dialogs, menus and notices */
    html.${ROOT_CLASS} :is(.reds-alert-wrapper, .login-container) {
      color: var(--xld-text) !important;
      background: var(--xld-canvas) !important;
      border: 1px solid var(--xld-border) !important;
      border-radius: 8px !important;
      box-shadow: var(--xld-shadow-md) !important;
    }

    html.${ROOT_CLASS} :is(.reds-mask, .reds-alert-mask) {
      background: rgb(31 35 41 / 42%) !important;
      backdrop-filter: blur(2px);
    }

    html.${ROOT_CLASS} :is(.dropdown-items, .menu-wrapper, .popover-container) {
      color: var(--xld-text) !important;
      background: var(--xld-canvas) !important;
      border: 1px solid var(--xld-border) !important;
      border-radius: 6px !important;
      box-shadow: var(--xld-shadow-md) !important;
    }

    html.${ROOT_CLASS} :is(.dropdown-items, .menu-wrapper, .popover-container)
      :is(.menu-item, li, button):hover {
      background: var(--xld-hover) !important;
    }

    html.${ROOT_CLASS} :is(.toast, .reds-toast) {
      color: var(--xld-text) !important;
      background: var(--xld-canvas) !important;
      border: 1px solid var(--xld-border) !important;
      border-radius: 6px !important;
      box-shadow: var(--xld-shadow-md) !important;
    }

    @media (max-width: 959px) {
      html.${ROOT_CLASS} .side-bar {
        border-right: 0 !important;
      }

      html.${ROOT_CLASS} #noteContainer.note-container {
        width: 100% !important;
        height: 100% !important;
        max-height: none !important;
        border-radius: 0 !important;
        border-inline: 0 !important;
      }

      html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds > .note-item,
      html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds > .note-item > div {
        height: 76px !important;
      }

      html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds > .note-item > div {
        grid-template-columns: 52px minmax(0, 1fr) !important;
        gap: 10px !important;
        padding: 10px 8px !important;
      }

      html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds .note-item .cover {
        width: 52px !important;
        min-width: 52px !important;
        height: 52px !important;
      }

      html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds .note-item .footer {
        grid-template-columns: minmax(0, 1fr) !important;
        gap: 4px !important;
      }

      html.${ROOT_CLASS}.${LIST_CLASS} #exploreFeeds .note-item .author-wrapper {
        grid-template-columns: minmax(0, 1fr) 68px !important;
        gap: 8px !important;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      html.${ROOT_CLASS} *,
      html.${ROOT_CLASS} *::before,
      html.${ROOT_CLASS} *::after {
        scroll-behavior: auto !important;
        transition-duration: 0.01ms !important;
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
      }
    }
  `;

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    if (typeof GM_addStyle === "function") {
      const style = GM_addStyle(CSS);
      if (style) {
        style.id = STYLE_ID;
      }
      return;
    }

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    (document.head || document.documentElement).appendChild(style);
  }

  function ensureFavicon() {
    const enabled = document.documentElement.classList.contains(ROOT_CLASS);
    let favicon = document.getElementById(FAVICON_ID);

    if (!enabled) {
      if (favicon?.parentNode) {
        favicon.parentNode.removeChild(favicon);
      }
      return;
    }

    if (!document.head) {
      return;
    }

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.id = FAVICON_ID;
      favicon.rel = "icon";
      favicon.type = "image/svg+xml";
      favicon.sizes = "any";
    }

    if (favicon.href !== LARK_LOGO_DATA_URL) {
      favicon.href = LARK_LOGO_DATA_URL;
    }
    if (document.head.lastElementChild !== favicon) {
      document.head.append(favicon);
    }
  }

  function ensureTabTitle() {
    const titleElement = document.querySelector("title");
    if (titleElement && titleElement !== tabTitleTarget) {
      tabTitleTarget = titleElement;
      if (!tabTitleObserver) {
        tabTitleObserver = new MutationObserver(ensureTabTitle);
      }
      tabTitleObserver.disconnect();
      tabTitleObserver.observe(titleElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    const current = document.title.trim();
    const isLarkTitle =
      current === "飞书云文档" || current.startsWith("飞书云文档 - ");
    if (current && !isLarkTitle) {
      lastNativeTabTitle = current;
    }

    const enabled = document.documentElement.classList.contains(ROOT_CLASS);
    if (!enabled) {
      if (isLarkTitle && lastNativeTabTitle) {
        document.title = lastNativeTabTitle;
      }
      return;
    }

    const detailTitle = document
      .getElementById("detail-title")
      ?.textContent?.trim()
      .replace(/\s+/g, " ");
    const desired = detailTitle
      ? `飞书云文档 - ${detailTitle}`
      : "飞书云文档";
    if (current !== desired) {
      document.title = desired;
    }
  }

  function ensureTabBranding() {
    ensureFavicon();
    ensureTabTitle();
  }

  function syncChannelToggle(button, expanded) {
    button.setAttribute("aria-expanded", String(expanded));
    const label = expanded ? "收起频道" : "展开频道";
    button.setAttribute("aria-label", label);
    button.title = label;
  }

  function ensureChannelToggle() {
    if (document.getElementById(CHANNEL_TOGGLE_ID)) {
      return;
    }

    const channelStrip = document.getElementById("channel-container");
    const host = channelStrip?.parentElement;
    if (!host?.classList.contains("channel-container")) {
      return;
    }

    const button = document.createElement("button");
    const icon = document.createElement("span");

    button.id = CHANNEL_TOGGLE_ID;
    button.type = "button";
    button.setAttribute("aria-controls", "channel-container");
    icon.className = "xhs-lark-list-icon";
    icon.setAttribute("aria-hidden", "true");
    for (let index = 0; index < 3; index += 1) {
      const row = document.createElement("span");
      row.className = "xhs-lark-list-icon-row";
      icon.append(row);
    }
    button.append(icon);

    document.documentElement.classList.remove(CHANNELS_OPEN_CLASS);
    syncChannelToggle(button, false);
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const expanded = document.documentElement.classList.toggle(
        CHANNELS_OPEN_CLASS,
      );
      syncChannelToggle(button, expanded);
    });

    host.prepend(button);
  }

  function syncDetailMediaToggle(button, expanded) {
    const label = expanded ? "隐藏媒体" : "显示媒体";
    button.setAttribute("aria-pressed", String(expanded));
    button.setAttribute("aria-label", label);
    button.title = label;
  }

  function pauseDetailMedia(container) {
    for (const video of container.querySelectorAll(".media-container video")) {
      video.muted = true;
      video.pause();
    }
  }

  function getProfilePath(link) {
    if (!link?.getAttribute("href")) {
      return "";
    }

    try {
      return new URL(link.getAttribute("href"), location.href).pathname;
    } catch (_error) {
      return "";
    }
  }

  function ensureDetailAuthorRoles(container) {
    const authorPath = getProfilePath(
      container.querySelector(".author-container .info a.name"),
    );
    if (!authorPath) {
      return;
    }

    for (const comment of container.querySelectorAll(".comment-item")) {
      const nameLink = comment.querySelector(".right .author a.name");
      const isAuthor = getProfilePath(nameLink) === authorPath;
      comment.classList.toggle(DETAIL_AUTHOR_COMMENT_CLASS, isAuthor);

      const authorRow = nameLink?.parentElement;
      const hasNativeBadge = authorRow
        ? [...authorRow.children].some(
            (child) => child !== nameLink && child.textContent.trim() === "作者",
          )
        : false;
      comment.classList.toggle(
        DETAIL_AUTHOR_BADGE_CLASS,
        isAuthor && !hasNativeBadge,
      );
    }
  }

  function ensureDetailMediaToggle() {
    const root = document.documentElement;
    if (!root.classList.contains(ROOT_CLASS)) {
      return;
    }

    const container = document.getElementById("noteContainer");
    if (!container) {
      activeDetailContainer = null;
      activeDetailUrl = "";
      root.classList.remove(DETAIL_MEDIA_OPEN_CLASS);
      return;
    }

    ensureDetailAuthorRoles(container);

    if (container !== activeDetailContainer || location.href !== activeDetailUrl) {
      activeDetailContainer = container;
      activeDetailUrl = location.href;
      root.classList.remove(DETAIL_MEDIA_OPEN_CLASS);
      pauseDetailMedia(container);
    }

    let button = document.getElementById(DETAIL_MEDIA_TOGGLE_ID);
    if (!button) {
      const host = container.querySelector(".author-container .author-wrapper");
      if (!host) {
        return;
      }

      button = document.createElement("button");
      const icon = document.createElement("span");
      button.id = DETAIL_MEDIA_TOGGLE_ID;
      button.type = "button";
      button.setAttribute("aria-controls", "noteContainer");
      icon.className = "xhs-lark-media-icon";
      icon.setAttribute("aria-hidden", "true");
      button.append(icon);
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const expanded = root.classList.toggle(DETAIL_MEDIA_OPEN_CLASS);
        if (!expanded) {
          pauseDetailMedia(container);
        }
        syncDetailMediaToggle(button, expanded);
      });

      const followButton = host.querySelector(".note-detail-follow-btn");
      host.insertBefore(button, followButton);
    }

    const expanded = root.classList.contains(DETAIL_MEDIA_OPEN_CLASS);
    if (!expanded) {
      pauseDetailMedia(container);
    }
    syncDetailMediaToggle(button, expanded);
  }

  function watchPageInterface() {
    ensureChannelToggle();
    ensureDetailMediaToggle();
    ensureTabBranding();
    if (typeof MutationObserver !== "function") {
      return;
    }

    let queued = false;
    const observer = new MutationObserver(() => {
      if (queued) {
        return;
      }

      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        ensureChannelToggle();
        ensureDetailMediaToggle();
        ensureTabBranding();
      });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  function applyState() {
    const content = storage.get(CONTENT_KEY, "minimal");
    const root = document.documentElement;

    root.classList.add(ROOT_CLASS, LIST_CLASS);
    root.classList.toggle(MINIMAL_CLASS, content === "minimal");
    ensureDetailMediaToggle();
    ensureTabBranding();
  }

  function toggleListContent() {
    const content = storage.get(CONTENT_KEY, "minimal");
    storage.set(CONTENT_KEY, content === "minimal" ? "visual" : "minimal");
    applyState();
  }

  injectStyles();
  applyState();
  watchPageInterface();

  if (typeof GM_registerMenuCommand === "function") {
    GM_registerMenuCommand(
      "列表模式：显示缩略图和头像 / 纯文字",
      toggleListContent,
    );
  }
})();
