import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

/**
 * A BasicAssemblyLine for the `<meter>` element.
 */
export default class MeterAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLMeterElement, P> {

    public override copy(): MeterAssemblyLine<P> {
        return new MeterAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLMeterElement, P>[] = []) {
        super(() => document.createElement("meter"), defaultParameters, steps);
    }

    /**
     * Adds a step that determines that is considered a high value.
     * @param high value provider
     */
    public high(high: AssemblyLine.DynamicValue.Either<number, HTMLMeterElement, P>) {
        return this.addStep((e, params) => e.high = AssemblyLine.DynamicValue.resolve(high, e, params));
    }

    /**
     * Adds a step that determines that is considered a low value.
     * @param low value provider
     */
    public low(low: AssemblyLine.DynamicValue.Either<number, HTMLMeterElement, P>) {
        return this.addStep((e, params) => e.low = AssemblyLine.DynamicValue.resolve(low, e, params));
    }

    /**
     * Adds a step that determines the minimum value.
     * @param min value provider
     */
    public min(min: AssemblyLine.DynamicValue.Either<number, HTMLMeterElement, P>) {
        return this.addStep((e, params) => e.min = AssemblyLine.DynamicValue.resolve(min, e, params));
    }

    /**
     * Adds a step that determines the maximum value.
     * @param max value provider
     */
    public max(max: AssemblyLine.DynamicValue.Either<number, HTMLMeterElement, P>) {
        return this.addStep((e, params) => e.max = AssemblyLine.DynamicValue.resolve(max, e, params));
    }

    /**
     * Adds a step that determines that is considered the optimal value.
     * @param optimum value provider
     */
    public optimum(optimum: AssemblyLine.DynamicValue.Either<number, HTMLMeterElement, P>) {
        return this.addStep((e, params) => e.optimum = AssemblyLine.DynamicValue.resolve(optimum, e, params));
    }

    /**
     * Adds a step that sets the current value.
     * @param value value provider
     */
    public value(value: AssemblyLine.DynamicValue.Either<number, HTMLMeterElement, P>) {
        return this.addStep((e, params) => e.value = AssemblyLine.DynamicValue.resolve(value, e, params));
    }

}