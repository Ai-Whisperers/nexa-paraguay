import { NextResponse } from "next/server";
export declare function GET(request: Request): Promise<NextResponse<{
    error: string;
}> | NextResponse<{
    content: any;
    siteId: string;
}>>;
export declare function PUT(request: Request): Promise<NextResponse<{
    error: string;
}> | NextResponse<{
    ok: boolean;
}>>;
//# sourceMappingURL=admin-api-route.d.ts.map