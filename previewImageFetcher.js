export async function fetchPreviewImage(link) {
    try {
        const response = await fetch(link, { mode: 'no-cors' });
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const ogImage = doc.querySelector('meta[property="og:image"]');
        return ogImage ? ogImage.content : null;
    } catch (error) {
        console.error('Error fetching preview image:', error);
        return null;
    }
}
