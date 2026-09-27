interface ConditionInterface<ExpectedOutputType> {
  readonly label: string;
  readonly log: (...args: any[]) => void;
  readonly eo: ExpectedOutputType;
  readonly statement: () => unknown;
  readonly lT: boolean;
};

export class Condition<ExpectedOutputType> implements ConditionInterface<ExpectedOutputType> {
  readonly label: string;
  readonly log: (...args: any[]) => void;
  readonly eo: ExpectedOutputType;
  readonly statement: () => unknown;
  readonly lT: boolean;

  constructor(
    cb: () => unknown, 
    expectedOutput: ExpectedOutputType, 
    label: string, 
    logger: (...args: any[]) => void = console.warn,
    logTimestamp: boolean = true
  ) {
    this.statement = cb;
    this.eo = expectedOutput;
    this.label = label;
    this.log = logger;
    this.lT = logTimestamp;
  };

  fails(): boolean {
    return this.statement() !== this.eo;
  };

  passes(): boolean {
    const out = this.statement();
    if (out !== this.eo) {
      this.log(
        `[@vedanshshetti/beautify-js${this.lT ? ` at ${new Date().toISOString().split(".")[0]!.replace("T", " ")}` : ""}]: Condition "${this.label}" failed. Given Callback returned ${JSON.stringify(out)}, expected output was ${JSON.stringify(this.eo)}`
      );
      return false;
    };
    return true;
  };
};

export const not = <T>(value: T): boolean => !value;

export const convertArray = <ItemType>(array: ItemType[]) => ({
  toJsonString: ()=> JSON.stringify(array),
  toSet: () => new Set<ItemType>(array),
  toUniqueArray: () => new Array<ItemType>(...new Set<ItemType>(array))
});

/**
 * @private
 */
function tryCB(cb: (...args: any[])=>any){
  try {
    cb()
    return true;
  } catch (e) {
    return false;
  }
}

export const isString = (str: string) => ({
  validJSON: (): boolean => tryCB(() => JSON.parse(str)),
  empty: (): boolean => str.length === 0,
  ofLength: (expectedLength: number): boolean => str.length === expectedLength,
  numeric: (): boolean => /^[0-9]+$/.test(str.trim()),
  uppercase: (): boolean => {
    const trimmed = str.trim();
    return trimmed.toUpperCase() === trimmed && trimmed.length > 0;
  },
  lowercase: (): boolean => {
    const trimmed = str.trim();
    return trimmed.toLowerCase() === trimmed && trimmed.length > 0;
  },
  matches: (regex: RegExp) => regex.test(str)
});