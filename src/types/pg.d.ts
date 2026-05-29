declare module 'pg' {
  export class Pool {
    constructor(config?: any)
    connect(): Promise<PoolClient>
    end(): Promise<void>
  }
  export class PoolClient {
    query(sql: string, values?: any[]): Promise<{ rows: any[] }>
    release(): void
  }
}
