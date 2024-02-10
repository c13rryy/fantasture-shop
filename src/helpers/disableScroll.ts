export function disableScroll(disable: boolean) {
  const html = document.getElementsByTagName("html")[0];
  const header = document.querySelector("header") as HTMLElement;
  const footer = document.querySelector("footer") as HTMLElement;
  const main = document.querySelector("main") as HTMLElement;
  const scrollbarWidth = window.innerWidth - document.body.clientWidth;

  if (header && scrollbarWidth !== 0) {
    header.classList.add("scroll-class");
  }

  if (footer && scrollbarWidth !== 0) {
    footer.classList.add("scroll-class");
  }

  if (main && scrollbarWidth !== 0) {
    main.classList.add("scroll-class");
  }

  html.classList[disable ? "add" : "remove"]("scroll-fixed");

  if (!disable) {
    header.classList.remove("scroll-class");
    footer.classList.remove("scroll-class");
    main.classList.remove("scroll-class");
  }
}
