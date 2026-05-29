import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { voicesRouter } from './voice';
import { generationsRouter } from './generation';
 
export const appRouter = createTRPCRouter({
  voices: voicesRouter ,
  generations: generationsRouter
});
 
// export type definition of API
export type AppRouter = typeof appRouter;