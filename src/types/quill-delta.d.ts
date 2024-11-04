declare module 'quill-delta' {
  interface Delta {
    ops?: Array<{
      insert?: any;
      delete?: number;
      retain?: number;
      attributes?: {
        [key: string]: any;
      };
    }>;
  }

  export default class Delta {
    constructor(ops?: Delta['ops']);
    ops?: Delta['ops'];
  }
} 