export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let encoded = reader.result?.toString().replace(/^data:(.*,)?/, '');
            if (encoded) {
                if ((encoded.length % 4) > 0) {
                    encoded += '='.repeat(4 - (encoded.length % 4));
                }
                resolve(encoded);
            } else {
                reject(new Error("Failed to encode file"));
            }
        };
        reader.onerror = error => reject(error);
    });
};