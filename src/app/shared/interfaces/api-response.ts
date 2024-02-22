export interface ApiResponse {
    metadata: ResponseMetaData,
    data: any
}

export interface ResponseMetaData {
    serviceName: string,
    requestId: string,
    responseId: string,
    responseTime: number
}