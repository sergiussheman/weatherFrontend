export class QueryLog {
    user: string;
    queryTime: Date;
    location: string;
    ip: string;
    response: string;
    duration: string;
    queryStatus: QueryStatus;
}

enum QueryStatus {
    SUCCESSFUL,
    ERROR,
    NO_RESPONSE
}