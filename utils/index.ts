export const handleError = (error: any) =>
    JSON.stringify(error.data || error.statusText || error.message || error);
