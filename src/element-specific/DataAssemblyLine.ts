import { Primitive } from "../util-types";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";


/**
 * A BasicAssemblyLine for the `<data>` element.
 */
export default class DataAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLDataElement, P> {

    public override copy(): DataAssemblyLine<P> {
        return new DataAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLDataElement, P>[] = []) {
        super(() => document.createElement("data"), defaultParameters, steps);
    }

    /**
     * Adds a step that sets the data's value.
     * @param value value provider
     */
    public value(value: AssemblyLine.DynamicValue.Either<Primitive, HTMLDataElement, P>) {
        return this.addStep((e, params) => e.value = String(AssemblyLine.DynamicValue.resolve(value, e, params)));
    }

}