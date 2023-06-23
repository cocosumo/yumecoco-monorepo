export function removeCSSFile(filename: string): void {
  // Find all <link> elements in the document
  const links = document.getElementsByTagName('link');

  // Iterate through each <link> element
  for (let i = 0; i < links.length; i++) {
    const link = links[i] as HTMLLinkElement;

    // Check if the href attribute matches the filename
    if (link.href && link.href.includes(filename)) {
      // Remove the <link> element from the DOM
      link.parentNode?.removeChild(link);
      break; // Exit the loop since we found and removed the CSS file
    }
  }
}