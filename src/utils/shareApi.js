export const shareTitle = async (title, platform = 'TitleBolt') => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${platform} Title`,
        text: title,
        url: window.location.href
      });
    } catch (error) {
      if (error.name !== 'AbortError') {
        fallbackShare(title);
      }
    }
  } else {
    fallbackShare(title);
  }
};

const fallbackShare = (title) => {
  navigator.clipboard.writeText(title).then(() => {
    alert('Title copied to clipboard!');
  }).catch(() => {
    const textArea = document.createElement('textarea');
    textArea.value = title;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Title copied to clipboard!');
  });
};