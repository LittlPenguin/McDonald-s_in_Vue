export const getImagePath = (imgUrl: string) => {
  // 如果路径以 /assets 开头，说明是内部资源，需要特殊处理
  if (imgUrl.startsWith("/assets")) {
    let processedPath = imgUrl;
    // 如果路径中包含%，需要进行处理
    if (processedPath.includes("%")) {
      try {
        // 先尝试解码URL，然后再编码，以确保正确处理
        processedPath = decodeURIComponent(processedPath);
      } catch (e) {
        // 如果解码失败，说明路径可能已经是正确的，继续使用原路径
        console.warn("Could not decode path:", processedPath, e);
      }
    }
    // 替换可能的问题字符
    processedPath = processedPath.replace(/%/g, "%25"); // 将%替换为%25 (URL编码的%)
    const relativePath = `..${processedPath}`;
    try {
      // 使用vite的import机制来正确加载资源
      return new URL(relativePath, import.meta.url).href;
    } catch (e) {
      console.error("Error loading image:", processedPath, e);
      return processedPath; // 如果出错，返回处理后的路径
    }
  }
  // 如果不是以/assets开头，直接返回原路径
  return imgUrl;
};
