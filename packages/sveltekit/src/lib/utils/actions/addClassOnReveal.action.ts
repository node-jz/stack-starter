export function addClassOnReveal(node: HTMLElement, config: { addToChildren: boolean; newClasses: string[]; initialClasses: string[] }) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (config.initialClasses) entry.target.classList.add(...config.initialClasses);
      if (entry.isIntersecting) {
        entry.target.classList.add(...config.newClasses);
        if (config.initialClasses) entry.target.classList.remove(...config.initialClasses);
        observer.unobserve(entry.target);
      }
    });
  });

  function observeChildren() {
    const children = Array.from(node.children);
    children.forEach((child) => {
      observer.observe(child);
    });
  }

  function observeSelf() {
    observer.observe(node);
  }

  if (config.addToChildren) {
    observeChildren();
  } else {
    observeSelf();
  }
  return {
    destroy() {
      observer.disconnect();
    },
  };
}
