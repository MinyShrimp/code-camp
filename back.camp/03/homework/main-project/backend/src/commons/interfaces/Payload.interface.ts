interface __Payload {
    name: string;
    email: string;
    isAdmin?: boolean;
}

export interface IPayload extends __Payload {
    id: string;
}

export interface IPayloadSub extends __Payload {
    sub: string;
}
