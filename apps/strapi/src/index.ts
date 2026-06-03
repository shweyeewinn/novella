import type { Core } from '@strapi/strapi';
import { runSeed } from './seed/bootstrap';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await runSeed(strapi);
    } catch (error) {
      strapi.log.error('CMS seed failed', error);
    }
  },
};
