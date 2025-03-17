import MathUtil from "../../MathUtil";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

/**
 * A BasicAssemblyLine for the `<progress>` element.
 */
export default class ProgressAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLProgressElement, P> {

    public override copy(): ProgressAssemblyLine<P> {
        return new ProgressAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLProgressElement, P>[] = []) {
        super(() => document.createElement("progress"), defaultParameters, steps);
    }

    /**
     * Adds a step that sets the maximum value.
     * @param max value provider
     */
    public max(max: AssemblyLine.DynamicValue.Either<number, HTMLProgressElement, P>) {
        return this.addStep((e, params) => e.max = Math.max(0, AssemblyLine.DynamicValue.resolve(max, e, params)));
    }

    /**
     * Adds a step that sets the current value.
     * @param value value provider
     */
    public value(value: AssemblyLine.DynamicValue.Either<number, HTMLProgressElement, P>) {
        return this.addStep((e, params) => e.value = MathUtil.clamp(AssemblyLine.DynamicValue.resolve(value, e, params), 0, e.max));
    }

}