declare namespace Express {
    export interface Request {
       userId: string | undefined
    }
 }

declare interface Object {
   [key: string]: any;
   clone(): object;
   deleteProperty(prop: string): object;
}