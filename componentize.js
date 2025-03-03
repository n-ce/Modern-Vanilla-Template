export function createComponent(content) {
  let tag, attributes, children;

  if (Array.isArray(content) && typeof content[0] === 'string' && content.length === 3)
    [tag, attributes = {}, children = []] = content;
  else
    children = content;

  const element = tag ?
    document.createElement(tag) :
    document.createDocumentFragment();

  if (attributes) {
    for (const key in attributes) {
      if (attributes[key])
        element.setAttribute(key, attributes[key]);
      else
        element.toggleAttribute(key);
    }
  }

  children?.forEach(child => {
    element.appendChild(
      Array.isArray(child) ?
      createComponent(child) :
      document.createTextNode(child)
    );
  });

  return element;
}
