export interface IImagePromiseResponse {
    id: string;
    name: string;
    email : string;
    description: string;
    image: {
        url: string;
        publicId: string;
        type: string;
    };
    title: string;
}