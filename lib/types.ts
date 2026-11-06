export type Sentiment="positivo"|"negativo"|"neutral"|"mixto";
export type Mention={id:string;title:string;summary:string;url:string|null;source:string;platform:string;author:string;publishedAt:string;capturedAt:string;sentiment:Sentiment;confidence:number|null;topic:string;relevance:number;interactions:number|null;demo:boolean};
export type Source={id:string;name:string;status:"connected"|"degraded"|"unavailable"|"demo";lastSync:string|null;error?:string};
export type Snapshot={mentions:Mention[];sources:Source[];storage:string;error?:string};
