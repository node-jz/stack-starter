type DropdownParams = {
  visible: boolean;
};

export function inout(node: HTMLElement, params: DropdownParams) {
  function open() {
    node.classList.add('transition', 'ease-out', 'duration-200', 'opacity-100', 'scale-100');
    node.classList.remove('opacity-0', 'scale-95');
  }

  function close() {
    node.classList.add('transition', 'ease-in', 'duration-75', 'opacity-0', 'scale-95');
    node.classList.remove('opacity-100', 'scale-100');
  }

  if (params.visible) open();
  else close();

  return {
    update(newParams: DropdownParams) {
      if (newParams.visible) open();
      else close();
    },
  };
}
