export declare const successCode: (status: number, data: any, message: string) => {
    status: number;
    token: any;
    message: string;
    data?: undefined;
} | {
    status: number;
    data: any;
    message: string;
    token?: undefined;
};
export declare const failCode: (status: number, message: string) => {
    status: number;
    message: string;
};
